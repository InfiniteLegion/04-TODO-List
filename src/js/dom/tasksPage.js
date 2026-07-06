import { deleteTask, getProject, moveTaskInProgress, moveTaskToCompleted, saveNewTask } from "../logic/localStorage.js";
import { renderAddButton, createIcon } from "./other.js";
import { format } from "date-fns";
import { mdiDelete, mdiProgressCheck, mdiCheckCircle, mdiCloseThick } from "@mdi/js";
import { Task } from "../class/task.js";

const content = document.getElementById('content');
let projectUUID;

export function tasksPageRender(projectUuid) {
    projectUUID = projectUuid;
    content.innerHTML = '';

    renderColumns();
    renderHeaders();
    renderTasks();
}

function renderColumns() {
    const tasksWrapper = document.createElement('div');
    const tasksNewCol = document.createElement('div');
    const tasksInProgressCol = document.createElement('div');
    const tasksCompletedCol = document.createElement('div');

    tasksWrapper.classList.add('tasks-wrapper');
    
    tasksNewCol.classList.add('tasks-col');
    tasksNewCol.id = 'tasks-new-col';

    tasksInProgressCol.classList.add('tasks-col');
    tasksInProgressCol.id = 'tasks-inProgress-col';

    tasksCompletedCol.classList.add('tasks-col');
    tasksCompletedCol.id = 'tasks-completed-col';

    tasksWrapper.append(tasksNewCol, tasksInProgressCol, tasksCompletedCol);
    content.append(tasksWrapper);
}

function renderHeaders() {
    const tasksNewHeader = document.createElement('h1');
    const tasksInProgressHeader = document.createElement('h1');
    const tasksCompletedHeader = document.createElement('h1');

    tasksNewHeader.textContent = 'NEW';
    tasksInProgressHeader.textContent = 'IN PROGRESS';
    tasksCompletedHeader.textContent = 'COMPLETED';

    tasksNewHeader.classList.add('tasks-header');
    tasksInProgressHeader.classList.add('tasks-header');
    tasksCompletedHeader.classList.add('tasks-header');

    document.getElementById('tasks-new-col').append(tasksNewHeader);
    document.getElementById('tasks-inProgress-col').append(tasksInProgressHeader);
    document.getElementById('tasks-completed-col').append(tasksCompletedHeader);
}

function renderTasks() {
    const project = getProject(projectUUID);
    const tasksNewBlock = document.createElement('div');
    const tasksInProgressBlock = document.createElement('div');
    const tasksCompletedBlock = document.createElement('div');

    tasksNewBlock.append(createTaskModal());
    
    tasksNewBlock.classList.add('tasks-container');
    tasksNewBlock.id = 'tasks-new-block';

    tasksInProgressBlock.classList.add('tasks-container');
    tasksInProgressBlock.id = 'tasks-inProgress-block';

    tasksCompletedBlock.classList.add('tasks-container');
    tasksCompletedBlock.id = 'tasks-completed-block';
    
    document.getElementById('tasks-new-col').append(renderAddButton('tasks-btn-add', 'task'));

    document.getElementById('tasks-new-col').append(tasksNewBlock);
    document.getElementById('tasks-inProgress-col').append(tasksInProgressBlock);
    document.getElementById('tasks-completed-col').append(tasksCompletedBlock);

    if (project.tasksNew.length > 0) {
        project.tasksNew.forEach(task => {
            renderTaskCard(task, 'tasks-new-block');
        });
    }

    if (project.tasksInProgress.length > 0) {
        project.tasksInProgress.forEach(task => {
            renderTaskCard(task, 'tasks-inProgress-block');
        });
    }

    if (project.tasksCompleted.length > 0) {
        project.tasksCompleted.forEach(task => {
            renderTaskCard(task, 'tasks-completed-block');
        });
    }
}

function renderTaskDueDate(card, date) {
    const formatedDate = format(date, 'dd.MM.yyyy');
    const cardDate = document.createElement('p');
    cardDate.innerHTML = `<b>Due date: </b>${formatedDate}`;
    card.append(cardDate);
}

function renderTaskCard(task, blockId) {
    const taskCard = document.createElement('div');
    taskCard.classList.add('task-card');
    
    taskCard.append(renderCardControlButtons(blockId, task.uuid));

    const cardTitle = document.createElement('p');
    cardTitle.classList.add('task-card-title');
    cardTitle.textContent = task.title;
    taskCard.append(cardTitle);
        
    if (task.dueDate !== null) renderTaskDueDate(taskCard, task.dueDate);

    const cardPriority = document.createElement('p');
    cardPriority.innerHTML = `<b>Priority: </b>${task.priority}`;
    taskCard.append(cardPriority);

    const cardDescription = document.createElement('p');
    cardDescription.classList.add('task-card-decription');
    cardDescription.textContent = task.description;
    taskCard.append(cardDescription);

    if (blockId === 'tasks-new-block') {
        document.getElementById(blockId).append(taskCard);
    } else if (blockId === 'tasks-inProgress-block') {
        document.getElementById(blockId).append(taskCard);
    } else if (blockId === 'tasks-completed-block') {
        document.getElementById(blockId).append(taskCard);
    }
}

function renderCardControlButtons(blockId, taskUuid) {
    const iconInProgress = createIcon(mdiProgressCheck, { className: 'icon icon-ctrl-btn icon-inProgress', title: 'Change status "in progress"' });
    const iconComplete = createIcon(mdiCheckCircle, { className: 'icon icon-ctrl-btn icon-complete', title: 'Change status "completed"' });
    const iconDelete = createIcon(mdiDelete, { className: 'icon icon-ctrl-btn icon-delete', title: 'Delete' });
    const cardBtns = document.createElement('div');
    cardBtns.classList.add('task-card-ctrl-buttons-block');

    iconInProgress.addEventListener('click', () => {
        moveTaskInProgress(projectUUID, taskUuid);
        tasksPageRender(projectUUID);
    });
    iconComplete.addEventListener('click', () => {
        moveTaskToCompleted(projectUUID, taskUuid);
        tasksPageRender(projectUUID);
    });
    iconDelete.addEventListener('click', () => {
        deleteTask(projectUUID, taskUuid);
        tasksPageRender(projectUUID);
    });
    
    if (blockId === 'tasks-new-block') {
        cardBtns.append(iconInProgress, iconComplete, iconDelete);
    } else if (blockId === 'tasks-inProgress-block') {
        cardBtns.append(iconComplete, iconDelete);
    } else if (blockId === 'tasks-completed-block') {
        cardBtns.append(iconDelete);
    }

    return cardBtns;
}

function createTaskModal() {
    const modal = document.createElement('dialog');
    const closeModal = createIcon(mdiCloseThick, { className: 'icon icon-close', title: 'Close' });
    const taskTitleInput = document.createElement('input');
    const taskPriorotySelect = document.createElement('select');
    const taskDescriptionField = document.createElement('textarea');
    const taskDueDateWrapper = document.createElement('div');
    const taskDueDateCheck = document.createElement('input');
    const taskDueDateLabel = document.createElement('label');
    const taskDueDateCalendar = document.createElement('input');
    const taskBtnSave = document.createElement('button');
    const priorities = ['very low', 'low', 'medium', 'high', 'critical'];

    modal.id = 'task-modal';
    modal.classList.add('modal');

    closeModal.id = 'task-close';
    closeModal.addEventListener('click', () => {
        modal.close();
    });

    taskTitleInput.id = 'task-title-input';
    taskTitleInput.classList.add('modal-input-text');
    taskTitleInput.placeholder = 'Enter task title';

    taskPriorotySelect.id = 'task-priority';
    taskPriorotySelect.classList.add('modal-priority-select');
    priorities.forEach(priority => {
        const option = document.createElement('option');
        option.classList.add('modal-priority-option');
        option.value = priority;
        option.textContent = priority;
        taskPriorotySelect.append(option);
    });

    taskDescriptionField.id = 'task-description';
    taskDescriptionField.classList.add('modal-description');
    taskDescriptionField.placeholder = 'Enter task description';

    taskDueDateCheck.id = 'task-duedate-checkbox';
    taskDueDateCheck.type = 'checkbox';

    taskDueDateLabel.htmlFor = 'task-duedate-checkbox';
    taskDueDateLabel.classList.add('modal-checkbox-label');
    taskDueDateLabel.textContent = 'Task have due date';

    taskDueDateWrapper.classList.add('modal-checkbox-wrapper');
    taskDueDateWrapper.append(taskDueDateCheck, taskDueDateLabel);

    taskDueDateCalendar.id = 'task-duedate-calendar';
    taskDueDateCalendar.classList.add('modal-calendar', 'hidden');
    taskDueDateCalendar.type = 'date';

    taskDueDateCheck.addEventListener('change', (e) => {
        document.getElementById('task-duedate-calendar').classList.toggle('hidden');
    });

    taskBtnSave.classList.add('modal-btn-save');
    taskBtnSave.textContent = 'Save';
    taskBtnSave.addEventListener('click', () => {
        const task = createNewTask();

        modal.close();
        saveNewTask(projectUUID, task);
        tasksPageRender(projectUUID);
    });
    
    modal.append(closeModal, taskTitleInput, taskPriorotySelect, taskDescriptionField, taskDueDateWrapper, taskDueDateCalendar, taskBtnSave);

    return modal;
}

function createNewTask() {
    const title = document.getElementById('task-title-input').value.trim();
    const priority = document.getElementById('task-priority').value;
    const decription = document.getElementById('task-description').value.trim();
    const checkbox = document.getElementById('task-duedate-checkbox').checked;

    if (checkbox) {
        const dueDate = document.getElementById('task-duedate-calendar').value;
        const task = new Task({ title: title, description: decription, priority: priority, dueDate: dueDate });

        return task;
    } else {
        const task = new Task({ title: title, description: decription, priority: priority });

        return task;
    }
}