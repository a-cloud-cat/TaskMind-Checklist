import { defineStore } from 'pinia'

export interface Task {
    id: string | number
    title: string
    desc: string
    priority: 'high' | 'medium' | 'low'
    dueDate: string
    status: 'memo' | 'doing' | 'done'
    type: 'memo' | 'task'
}

export interface DeletedTask extends Task {
    deleteTime: string
}

export const useTaskStore = defineStore('task', {
    state: () => ({
        taskList: [] as Task[],
        deletedTasks: [] as DeletedTask[],
        currentSortType: '' as 'priority' | 'dueDate' | ''
    }),

    actions: {
        fetchTaskList() {
            const savedTasks = localStorage.getItem('taskList')
            const savedDeletedTasks = localStorage.getItem('deletedTasks')
            if (savedTasks) {
                this.taskList = JSON.parse(savedTasks) as Task[]
            }
            if (savedDeletedTasks) {
                this.deletedTasks = JSON.parse(savedDeletedTasks) as DeletedTask[]
            }
        },

        addTask(newTask: Task) {
            this.taskList.unshift(newTask)
            this.saveToLocalStorage()
        },

        editTask(updatedTask: Task) {
            const taskIndex = this.taskList.findIndex(t => t.id === updatedTask.id)
            if (taskIndex !== -1) {
                this.taskList[taskIndex] = updatedTask
                this.saveToLocalStorage()
            }
        },

        toggleTaskStatus(taskId: string | number, forceDone?: boolean) {
            const task = this.taskList.find(t => t.id === taskId)
            if (task) {
                if (forceDone) {
                    task.status = 'done'
                } else {
                    task.status = task.status === 'memo'
                        ? 'doing'
                        : task.status === 'doing'
                            ? 'done'
                            : 'memo'
                }
                this.saveToLocalStorage()
            }
        },

        deleteTask(taskId: string | number) {
            const taskIndex = this.taskList.findIndex(t => t.id === taskId)
            if (taskIndex === -1) return

            const targetTask = this.taskList[taskIndex]!
            const deletedTask: DeletedTask = {
                ...targetTask,
                deleteTime: new Date().toISOString()
            }

            this.taskList.splice(taskIndex, 1)
            this.deletedTasks.unshift(deletedTask)
            this.saveToLocalStorage()
        },

        restoreTask(taskId: string | number) {
            const taskIndex = this.deletedTasks.findIndex(t => t.id === taskId)
            if (taskIndex === -1) return

            const targetDeletedTask = this.deletedTasks[taskIndex]!
            const { deleteTime, ...normalTask } = targetDeletedTask

            this.deletedTasks.splice(taskIndex, 1)
            this.taskList.unshift(normalTask)
            this.saveToLocalStorage()
        },

        deleteTaskPermanently(taskId: string | number) {
            const taskIndex = this.deletedTasks.findIndex(t => t.id === taskId)
            if (taskIndex === -1) return

            this.deletedTasks.splice(taskIndex, 1)
            this.saveToLocalStorage()
        },

        emptyRecycleBin() {
            this.deletedTasks = []
            this.saveToLocalStorage()
        },

        sortTasks(type: 'priority' | 'dueDate') {
            this.currentSortType = type
            const newTaskList = [...this.taskList]

            if (type === 'priority') {
                const priorityWeightMap = { high: 3, medium: 2, low: 1 }
                newTaskList.sort((a, b) => priorityWeightMap[b.priority] - priorityWeightMap[a.priority])
            } else if (type === 'dueDate') {
                newTaskList.sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime())
            }

            this.taskList = newTaskList
            this.saveToLocalStorage()
        },

        resetSort() {
            this.currentSortType = ''
            this.fetchTaskList()
        },

        saveToLocalStorage() {
            localStorage.setItem('taskList', JSON.stringify(this.taskList))
            localStorage.setItem('deletedTasks', JSON.stringify(this.deletedTasks))
        }
    }
})