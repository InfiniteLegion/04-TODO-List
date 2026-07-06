import { deleteProject, getProjects, saveNewProject } from "../logic/localStorage.js";
import { tasksPageRender } from "./tasksPage.js";
import { renderAddButton } from './other.js';
import { mdiDelete, mdiCloseThick } from "@mdi/js";
import { createIcon } from "./other.js";
import { Project } from "../class/project.js";

const content = document.getElementById('content');

export function projectsPageRender() {
    content.innerHTML = '';

    renderProjects();
}

function renderProjects() {
    const projectsContainer = document.createElement('div');
    const btnBlock = document.createElement('div');

    projectsContainer.classList.add('projects-container');

    projectsContainer.append(createProjectModal());
    btnBlock.classList.add('projects-block', 'projects-add-block');
    btnBlock.append(renderAddButton('projects-btn-add', 'project'));
    projectsContainer.append(btnBlock);
    
    const projects = getProjects();

    console.log(projects);

    projects.forEach(project => {
        const projectBlock = document.createElement('div');
        const projectTitle = document.createElement('p');
        const projectCtrlButtons = document.createElement('div');

        projectTitle.classList.add('project-title');
        projectTitle.textContent = project.title;
        projectTitle.addEventListener('click', e => {
            tasksPageRender(project.uuid);
        });

        projectCtrlButtons.classList.add('project-ctrl-buttons');
        projectCtrlButtons.append(createDeleteProjectBtn(project.uuid));

        projectBlock.classList.add('projects-block');
        projectBlock.append(projectCtrlButtons,projectTitle);

        projectsContainer.append(projectBlock);

    });

    content.append(projectsContainer);
}

function createProjectModal() {
    const modal = document.createElement('dialog');
    const closeModal = createIcon(mdiCloseThick, { className: 'icon icon-close', title: 'Close' });
    const projectTitleInput = document.createElement('input');
    const projectBtnSave = document.createElement('button');

    modal.id = 'project-modal';
    closeModal.id = 'project-close';
    projectTitleInput.id = 'project-title-input';

    closeModal.addEventListener('click', () => {
        modal.close();
    });

    modal.classList.add('modal');
    projectTitleInput.classList.add('modal-input-text');
    projectBtnSave.classList.add('modal-btn-save');

    projectTitleInput.placeholder = 'Enter project title';
    
    projectBtnSave.textContent = 'Save';
    projectBtnSave.addEventListener('click', () => {
        const projectTitle = document.getElementById('project-title-input').value.trim();
        const project = new Project(projectTitle);

        saveNewProject(project);
        projectsPageRender();
    });

    modal.append(closeModal, projectTitleInput, projectBtnSave);

    return modal;
}

function createDeleteProjectBtn(projectUuid) {
    const btn = createIcon(mdiDelete, { className: 'icon-delete icon-ctrl-btn', title: 'Delete' });

    btn.addEventListener('click', () => {
        deleteProject(projectUuid);
        projectsPageRender();
    });
    
    return btn;
}