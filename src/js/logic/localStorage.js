import { Task } from "../class/task.js";
import { Project } from "../class/project.js";

export function defaultCheck() {
    if (localStorage.getItem('projects') === null) {
        const defaultNewTask = new Task({title: 'Default new task 1', description: 'Default new task - default description', dueDate: new Date()});
        const defaultInProgressTask = new Task({title: 'Default in progress task 1', description: 'Default in progress task - default description'});
        const defaultCompletedTask = new Task({title: 'Default completed task 1', description: 'Default completed task - default description', priority: 'high'});
        const defaultProject = new Project('Default project');

        defaultProject.addNew(defaultNewTask);
        defaultProject.tasksInProgress.push(defaultInProgressTask);
        defaultProject.tasksCompleted.push(defaultCompletedTask);

        const projects = [];
        projects.push(defaultProject);

        const projectsJSON = JSON.stringify(projects);
        localStorage.setItem('projects', projectsJSON);

        console.log('Default project saved!');
    }
}

export function getProjects() {
    if (localStorage.getItem('projects') !== null) {
        const projectsJSON = localStorage.getItem('projects');
        const projects = JSON.parse(projectsJSON);

        if (projects.length > 0) {
            return projects;
        } else {
            localStorage.removeItem('projects');
            defaultCheck();
        }
    }
}

export function getProject(uuid) {
    if (localStorage.getItem('projects') !== null) {
        const projectsJSON = localStorage.getItem('projects');
        const projects = JSON.parse(projectsJSON);
        const project = projects.find(p => p.uuid === uuid);

        return project;
    }
}

export function saveNewProject(project) {
    if (localStorage.getItem('projects') !== null) {
        const projectsJSON = localStorage.getItem('projects');
        const projects = JSON.parse(projectsJSON);

        projects.push(project);

        localStorage.setItem('projects', JSON.stringify(projects));
    }
}

export function deleteProject(uuid) {
    if (localStorage.getItem('projects') !== null) {
        const projectsJSON = localStorage.getItem('projects');
        const projects = JSON.parse(projectsJSON);
        const projectIndex = projects.findIndex(p => p.uuid === uuid);

        if (projectIndex !== -1) {
            projects.splice(projectIndex, 1);
       }

       localStorage.setItem('projects', JSON.stringify(projects));
    }
}

export function saveNewTask(projectUuid, task) {
    if (localStorage.getItem('projects') !== null) {
        const projectsJSON = localStorage.getItem('projects');
        const projects = JSON.parse(projectsJSON).map(p => Project.fromPlainObject(p));
        const projectIndex = projects.findIndex(p => p.uuid === projectUuid);

        if (projectIndex !== -1) {
            const project = projects[projectIndex];
            
            project.addNew(task);
            localStorage.setItem('projects', JSON.stringify(projects));
        }
    }
}

export function moveTaskInProgress(projectUuid, taskUuid) {
    if (localStorage.getItem('projects') !== null) {
        const projectsJSON = localStorage.getItem('projects');
        const projects = JSON.parse(projectsJSON).map(p => Project.fromPlainObject(p));
        const projectIndex = projects.findIndex(p => p.uuid === projectUuid);

        if (projectIndex !== -1) {
            const project = projects[projectIndex];
            
            project.makeInProgress(taskUuid);
            localStorage.setItem('projects', JSON.stringify(projects));
        }
    }
}

export function moveTaskToCompleted(projectUuid, taskUuid) {
    if (localStorage.getItem('projects') !== null) {
        const projectsJSON = localStorage.getItem('projects');
        const projects = JSON.parse(projectsJSON).map(p => Project.fromPlainObject(p));
        const projectIndex = projects.findIndex(p => p.uuid === projectUuid);

        if (projectIndex !== -1) {
            const project = projects[projectIndex];
            
            project.completeTask(taskUuid);
            localStorage.setItem('projects', JSON.stringify(projects));
        }
    }
}

export function deleteTask(projectUuid, taskUuid) {
    if (localStorage.getItem('projects') !== null) {
        const projectsJSON = localStorage.getItem('projects');
        const projects = JSON.parse(projectsJSON).map(p => Project.fromPlainObject(p));
        const projectIndex = projects.findIndex(p => p.uuid === projectUuid);

        if (projectIndex !== -1) {
            const project = projects[projectIndex];
        
            project.deleteTask(taskUuid);
            localStorage.setItem('projects', JSON.stringify(projects));
        }
    }
}