import { mdiPlusCircle } from "@mdi/js";

export function renderAddButton(id, btnType) {
    const button = document.createElement('button');

    button.classList.add('btn-add');
    button.id = id;
    button.append(createIcon(mdiPlusCircle, { className: 'icon icon-btn-add my-icon' }));

    if (btnType === 'project') {
        button.addEventListener('click', () => {
            document.getElementById('project-modal').showModal();
        });
    } else if (btnType === 'task') {
        button.addEventListener('click', () => {
            document.getElementById('task-modal').showModal();
        });
    }

    return button;
}

export function createIcon(path, { color = 'currentColor', className = '', title = '' } = {}) {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('viewBox', '0 0 24 24');
    
    if (className) {
        svg.setAttribute('class', className);
    }

    if (title) {
        const titleEl = document.createElementNS('http://www.w3.org/2000/svg', 'title');
        titleEl.textContent = title;
        svg.append(titleEl);
    }

    const pathEl = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    pathEl.setAttribute('fill', color);
    pathEl.setAttribute('d', path);

    svg.append(pathEl);
    return svg;
}