import { defineStore } from 'pinia'
// 假设原有接口定义，若不存在可自行添加
interface Task {
    id: string | number
    title: string
    status: 'todo' | 'doing' | 'done'
    [key: string]: any // 兼容其他字段
}

// 扩展任务接口，添加删除时间字段
interface DeletedTask extends Task {
    deleteTime: string | number | Date
}

export const useTaskStore = defineStore('task', {
    state: () => ({
        taskList: [] as Task[],
        // 新增：回收站任务列表
        deletedTasks: [] as DeletedTask[]
    }),
    actions: {
        // 原有方法：获取任务列表（不变）
        fetchTaskList() {
            // 原有逻辑，如接口请求等
            // 示例：this.taskList = 接口返回数据
        },

        // 原有方法：添加任务（不变）
        addTask(newTask: Task) {
            // 原有逻辑，如接口请求+本地状态更新
            this.taskList.unshift(newTask)
        },

        // 原有方法：删除任务（修改逻辑，将删除的任务移到回收站）
        deleteTask(taskId: string | number) {
            // 1. 查找要删除的任务
            const taskIndex = this.taskList.findIndex(task => task.id === taskId)
            if (taskIndex === -1) return

            // 2. 移除任务并添加到回收站（添加删除时间）
            const deletedTask = {
                ...this.taskList[taskIndex],
                deleteTime: new Date()
            } as DeletedTask
            this.taskList.splice(taskIndex, 1)
            this.deletedTasks.unshift(deletedTask)

            // 3. 原有接口请求逻辑（不变）
            try {
                // deleteTaskApi(taskId) // 原有接口调用
            } catch (error) {
                // 接口失败回滚（修改回滚逻辑，同时恢复回收站）
                this.taskList.splice(taskIndex, 0, deletedTask)
                this.deletedTasks.shift()
                console.error('删除任务失败：', error)
            }
        },

        // 新增：恢复任务（从回收站移回任务列表）
        restoreTask(taskId: string | number) {
            const taskIndex = this.deletedTasks.findIndex(task => task.id === taskId)
            if (taskIndex === -1) return

            // 移除回收站任务并添加到任务列表
            const restoredTask = this.deletedTasks[taskIndex]
            // 删除deleteTime字段，恢复为普通任务
            const { deleteTime, ...task } = restoredTask
            this.deletedTasks.splice(taskIndex, 1)
            this.taskList.unshift(task as Task)

            // 可选：调用接口同步恢复状态（根据实际需求添加）
            // restoreTaskApi(taskId).catch(error => {
            //   // 接口失败回滚
            //   this.deletedTasks.splice(taskIndex, 0, restoredTask)
            //   this.taskList.shift()
            //   console.error('恢复任务失败：', error)
            // })
        },

        // 新增：彻底删除任务（从回收站移除）
        deleteTaskPermanently(taskId: string | number) {
            const taskIndex = this.deletedTasks.findIndex(task => task.id === taskId)
            if (taskIndex === -1) return

            this.deletedTasks.splice(taskIndex, 1)

            // 可选：调用接口同步彻底删除状态（根据实际需求添加）
            // deleteTaskPermanentlyApi(taskId).catch(error => {
            //   console.error('彻底删除任务失败：', error)
            // })
        },

        // 新增：清空回收站
        emptyRecycleBin() {
            this.deletedTasks = []

            // 可选：调用接口同步清空状态（根据实际需求添加）
            // emptyRecycleBinApi().catch(error => {
            //   console.error('清空回收站失败：', error)
            // })
        }
    }
})