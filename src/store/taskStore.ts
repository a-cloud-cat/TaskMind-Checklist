import { defineStore } from 'pinia'


interface Task {
    id: string
    title: string
    desc: string
    status: 'todo' | 'doing' | 'done'
    priority: 'high' | 'medium' | 'low'
    dueDate: string
}

// 模拟数据库接口
const getTaskListApi = async () => {
    await new Promise(resolve => setTimeout(resolve, 500))
    return { data: [] }
}
const addTaskApi = async (task: Task) => {
    await new Promise(resolve => setTimeout(resolve, 500))
    console.log('【模拟接口】新增任务到数据库：', task)
    return { code: 200, msg: '新增成功' }
}
const deleteTaskApi = async (taskId: string) => {
    await new Promise(resolve => setTimeout(resolve, 500))
    console.log('【模拟接口】删除数据库任务ID：', taskId)
    return { code: 200, msg: '删除成功' }
}
const updateTaskApi = async (taskId: string, updateData: Partial<Task>) => {
    await new Promise(resolve => setTimeout(resolve, 500))
    console.log('【模拟接口】更新数据库任务ID：', taskId, '更新内容：', updateData)
    return { code: 200, msg: '更新成功' }
}

// 创建 Pinia 任务仓库
export const useTaskStore = defineStore('task', {
    state: () => ({
        taskList: [] as Task[]
    }),
    actions: {
        async fetchTaskList() {
            try {
                const res = await getTaskListApi()
                this.taskList = res.data || []
                console.log('【Pinia】加载数据库任务成功：', this.taskList)
            } catch (err) {
                console.error('【Pinia】加载任务失败：', err)
            }
        },
        async addTask(task: Task) {
            this.taskList.push(task)
            console.log('【Pinia】前端新增任务：', task)
            try {
                await addTaskApi(task)
                console.log('【Pinia】数据库新增任务成功')
            } catch (err) {
                this.taskList = this.taskList.filter(t => t.id !== task.id)
                console.error('【Pinia】数据库新增任务失败，前端回滚：', err)
            }
        },
        async deleteTask(taskId: string) {
            const originList = [...this.taskList]
            this.taskList = this.taskList.filter(task => task.id !== taskId)
            console.log('【Pinia】前端删除任务ID：', taskId)
            try {
                await deleteTaskApi(taskId)
                console.log('【Pinia】数据库删除任务成功')
            } catch (err) {
                this.taskList = originList
                console.error('【Pinia】数据库删除任务失败，前端回滚：', err)
            }
        },
        async toggleTaskStatus(taskId: string) {
            const task = this.taskList.find(t => t.id === taskId)
            if (!task) return
            const originStatus = task.status
            if (task.status === 'todo') task.status = 'doing'
            else if (task.status === 'doing') task.status = 'done'
            else task.status = 'todo'
            console.log('【Pinia】前端切换任务ID：', taskId, '状态：', originStatus, '→', task.status)
            try {
                await updateTaskApi(taskId, { status: task.status })
                console.log('【Pinia】数据库更新任务状态成功')
            } catch (err) {
                task.status = originStatus
                console.error('【Pinia】数据库更新状态失败，前端回滚：', err)
            }
        },
        // 任务排序
        async sortTasks(type: 'priority' | 'dueDate') {
            if (type === 'priority') {
                this.taskList.sort((a, b) => {
                    const priorityMap = { high: 3, medium: 2, low: 1 }
                    return priorityMap[b.priority] - priorityMap[a.priority]
                })
            } else if (type === 'dueDate') {
                this.taskList.sort((a, b) => {
                    return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
                })
            }
            console.log('【Pinia】前端按', type, '排序任务：', this.taskList)
        }
    }
})