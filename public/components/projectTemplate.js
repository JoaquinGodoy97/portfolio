import { addSVGToAnchors } from "./svgIcon.js";
import { getReadme } from "../helpers/getGithubData.js"

const skillsContainer = document.querySelector('.skills-container');
const progressList = document.createElement('div');

function addProjectTemplate(username, repo, index) {
    // You can move this if changes the functionality
    progressList.classList.add('progress-list');
    //
    const projectListDiv = document.querySelector('.project-list');
    if (!projectListDiv) {
        console.error('ProjectListDiv not found')
        return;
    }

    // Outer elements
    const projectBox = document.createElement('div');
    projectBox.classList.add('box-shadow', 'p-3', 'mb-3', 'project-box', `${repo.repoName}-content-box`);
    projectBox.setAttribute('id', 'project-box')

    // Title n description elements
    const projectTitle = document.createElement('h4');
    projectTitle.classList.add('project-title');
    projectTitle.innerHTML = repo.repoName

    projectBox.appendChild(projectTitle)
    const projectDescription = document.createElement('p');
    projectDescription.classList.add('project-description');
    projectDescription.setAttribute('data-section', `${repo.repoName}-project`) // movie-app-flask-project
    projectDescription.setAttribute('data-value', "project-description")
    projectDescription.innerHTML = repo.description || "No description."
    projectBox.appendChild(projectDescription)

    // Item-list wrapper
    const projectItemList = document.createElement('ul')
    projectItemList.classList.add('icon-list', 'ps-0')
    projectBox.appendChild(projectItemList)

    // Link wrapper and link
    const projectLinkWrapper = document.createElement('li')
    projectLinkWrapper.classList.add('d-flex', 'align-items-start', 'mb-1', 'link-wrapper')
    projectItemList.appendChild(projectLinkWrapper)
    
    const anchorDiv = document.createElement('div')
    anchorDiv.classList.add('anchor-project-container')
    projectLinkWrapper.appendChild(anchorDiv)

    const projectAnchor = document.createElement('a')
    projectAnchor.setAttribute('href', repo.repoUrl || '#')
    projectAnchor.setAttribute('rel', 'noopener')
    projectAnchor.setAttribute('id', `project${index}_git_name`)
    projectAnchor.setAttribute('class', 'project-anchor')
    projectAnchor.setAttribute('target', '_blank')
    projectAnchor.innerHTML = repo.repoUrl ? 'to project...' : 'project missing...';
    anchorDiv.appendChild(projectAnchor)

    addSVGToAnchors()
    
    // Language item // not actually needed since there is a icons display
    // const projectLanguage = document.createElement('li')
    // projectLanguage.classList.add('text-muted', 'd-flex', 'align-items-start', 'mb-1', 'project-language')
    // projectLanguage.innerHTML = repo.languages || "No languages."
    // projectItemList.appendChild(projectLanguage)

    // Updated date
    const date = new Date(repo.whenUpdated)
    const projectLastUpdate = document.createElement('li')
    projectLastUpdate.setAttribute('data-section', `${repo.repoName}-project`)
    projectLastUpdate.setAttribute('data-value', "project-last-update")
    projectLastUpdate.innerHTML = `Last time updated: ${date.toDateString()}`
    projectItemList.appendChild(projectLastUpdate)

    // Readme text
    const readmeText = document.createElement('pre')
    const readmeBtnCollapse = document.createElement('button')
    readmeBtnCollapse.setAttribute('id', `toggle-readme-text${index}`)
    readmeBtnCollapse.classList.add(`toggle-readme`)
    readmeBtnCollapse.innerHTML = "..."

    readmeText.setAttribute('id', `readme-text${index}`)
    readmeText.classList.add(`readme-text`)

    projectItemList.appendChild(readmeText)
    projectItemList.appendChild(readmeBtnCollapse)

    projectListDiv.appendChild(projectBox)

    getReadme(username, repo.repoName, index)
}

function addProgressTemplate(language, progressPercentage) {
    const listItem = document.createElement('li');
    listItem.classList.add('mb-3');

    const languageHeader = document.createElement('h6');
    languageHeader.textContent = language;

    const progressDiv = document.createElement('div');
    progressDiv.classList.add('progress', 'mb-2');

    const progressBar = document.createElement('div');
    progressBar.classList.add('progress-bar');
    progressBar.setAttribute('role', 'progressbar');
    progressBar.setAttribute('aria-label', `Example with label`);
    progressBar.style.width = `${progressPercentage}%`;
    progressBar.setAttribute('aria-valuenow', progressPercentage);
    progressBar.setAttribute('aria-valuemin', '0');
    progressBar.setAttribute('aria-valuemax', '100');
    progressBar.textContent = `${progressPercentage}%`;

    progressDiv.appendChild(progressBar);
    listItem.appendChild(languageHeader);
    listItem.appendChild(progressDiv);

    progressList.appendChild(listItem);
    skillsContainer.appendChild(progressList);
}

export { addProgressTemplate, addProjectTemplate }