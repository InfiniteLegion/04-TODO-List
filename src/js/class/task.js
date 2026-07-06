export class Task {
    constructor({ title = 'Default', description = 'Default description', dueDate = null, priority = 'very low' } = {}) {
        this.uuid = crypto.randomUUID();
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
    }
}