export class Project {
    constructor(title = 'Default') {
        this.uuid = crypto.randomUUID();
        this.title = title;
        this.tasksNew = [];
        this.tasksInProgress = [];
        this.tasksCompleted = [];
    }

    static fromPlainObject(obj) {
        const project = new Project(obj.title);
        
        project.uuid = obj.uuid;
        project.tasksNew = obj.tasksNew ?? [];
        project.tasksInProgress = obj.tasksInProgress ?? [];
        project.tasksCompleted = obj.tasksCompleted ?? [];

        return project;
    }

    addNew(task) {
        this.tasksNew.push(task);
    }
    
    makeInProgress(uuid) {
        const task = this.tasksNew.find(t => t.uuid === uuid);
        this.tasksInProgress.push(task);
        
        const index = this.tasksNew.findIndex(t => t.uuid === uuid);
        if (index !== -1) {
            this.tasksNew.splice(index, 1);
        }
    }

    completeTask(uuid) {
        const listWithTask = [this.tasksNew, this.tasksInProgress].find(arr => arr.some(t => t.uuid === uuid));
        const task = listWithTask?.find(t => t.uuid === uuid);
        this.tasksCompleted.push(task);

        const index = listWithTask?.findIndex(t => t.uuid === uuid);
        if (index !== -1) {
            listWithTask?.splice(index, 1);
        }
    }

    deleteTask(uuid) {
        const listWithTask = [this.tasksNew, this.tasksInProgress, this.tasksCompleted].find(arr => arr.some(t => t.uuid === uuid));
        const index = listWithTask?.findIndex(t => t.uuid === uuid);
        if (index !== -1) {
            listWithTask?.splice(index, 1);
        }
    }
}