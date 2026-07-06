import '../style.css';
import { defaultCheck } from './logic/localStorage.js';
import { projectsPageRender } from './dom/projectsPage.js';
import { mdiHome } from '@mdi/js';
import { createIcon } from './dom/other.js';

defaultCheck();

projectsPageRender();

document.getElementById('btn-main').append(createIcon(mdiHome, { className: 'icon icon-home' }));
document.getElementById('btn-main').addEventListener('click', () => {
    projectsPageRender();
});