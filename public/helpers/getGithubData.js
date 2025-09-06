import { marked } from "https://cdn.jsdelivr.net/npm/marked/lib/marked.esm.js";

async function getReadme(user, repoName, project_slot) {

    const orgs = 'Fulbito5Manager'

    project_slot = String(project_slot);
    const projectElement = document.getElementById(`readme-text${project_slot}`)

    if (repoName === "ranking_app") {
        const responseOrgRepo = await fetch(`https://raw.githubusercontent.com/${orgs}/${repoName}/main/README.md`).catch(() => null);
        const resultOrgRepo = await responseOrgRepo.text();
        const markedResult = await marked(resultOrgRepo)
        
        projectElement.innerHTML = markedResult;

    } else {
        const response = await fetch(`https://raw.githubusercontent.com/${user}/${repoName}/main/README.md`);
        const result = await response.text();
        const markedResult = await marked(result)
        
        projectElement.innerHTML = markedResult;

        // projectElement.innerHTML = result;
    }
}

async function getTechnologies(container, index){
    const readmeFile = document.getElementById(`readme-text${index}`)

    if (readmeFile.innerHTML.includes('Techs')) {

        // CONFIG WITHOUT MARKED LIBRARY WITH PRE README FILE
        // const element = readmeFile.innerHTML.split("## Techs")
        // const techList = element[element.length - 1].split("\n•")

        //CONFIG FOR MARKED LIBRARY
        const items = readmeFile.innerHTML.split("Techs")[1].split('•')
        const cleanItems = items.map(item => item.trim()); 
        const names = cleanItems.map(item => item.replace(/<\/?[^>]+(>|$)/g, ""));

            names.forEach((tech, i) => {
            if (tech !== "\n" && tech && tech.length < 15){
                let imageElement = document.createElement('img')
                imageElement.classList.add('tech-item-img')
                imageElement.setAttribute('title', tech.toLowerCase().trim())
                imageElement.setAttribute('alt', tech.toLowerCase().trim())
                imageElement.setAttribute('src', `style/icons/${tech.toLowerCase().trim()}.png`)
                
                container.appendChild(imageElement)
                // Trigger the transition 
                setTimeout(() => { imageElement.classList.add('visible');
                }, i * 200);
            }
        })
    }
}

export { getReadme, getTechnologies }

import { marked } from "https://cdn.jsdelivr.net/npm/marked/lib/marked.esm.js";

async function getReadme(user, repoName, project_slot) {

    const orgs = 'Fulbito5Manager'

    project_slot = String(project_slot);
    const projectElement = document.getElementById(`readme-text${project_slot}`)

    if (repoName === "ranking_app") {
        const responseOrgRepo = await fetch(`https://raw.githubusercontent.com/${orgs}/${repoName}/main/README.md`).catch(() => null);
        const resultOrgRepo = await responseOrgRepo.text();
        const markedResult = await marked(resultOrgRepo)
        
        projectElement.innerHTML = markedResult;

    } else {
        const response = await fetch(`https://raw.githubusercontent.com/${user}/${repoName}/main/README.md`);
        const result = await response.text();
        const markedResult = await marked(result)
        
        projectElement.innerHTML = markedResult;

        // projectElement.innerHTML = result;
    }
}

async function getTechnologies(container, index){
    const readmeFile = document.getElementById(`readme-text${index}`)

    if (readmeFile.innerHTML.includes('Techs')) {

        // CONFIG WITHOUT MARKED LIBRARY WITH PRE README FILE
        // const element = readmeFile.innerHTML.split("## Techs")
        // const techList = element[element.length - 1].split("\n•")

        //CONFIG FOR MARKED LIBRARY
        const items = readmeFile.innerHTML.split("Techs")[1].split('•')
        const cleanItems = items.map(item => item.trim()); 
        const names = cleanItems.map(item => item.replace(/<\/?[^>]+(>|$)/g, ""));

            names.forEach((tech, i) => {
            if (tech !== "\n" && tech && tech.length < 15){
                let imageElement = document.createElement('img')
                imageElement.classList.add('tech-item-img')
                imageElement.setAttribute('title', tech.toLowerCase().trim())
                imageElement.setAttribute('alt', tech.toLowerCase().trim())
                imageElement.setAttribute('src', `style/icons/${tech.toLowerCase().trim()}.png`)
                
                container.appendChild(imageElement)
                // Trigger the transition 
                setTimeout(() => { imageElement.classList.add('visible');
                }, i * 200); // make them visible with a delay of...0.2 seconds
            }
        })
    }
}

export { getReadme, getTechnologies }
