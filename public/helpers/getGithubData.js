async function getReadme(user, repoName, project_slot) {

    project_slot = String(project_slot);
    const response = await fetch(`https://raw.githubusercontent.com/${user}/${repoName}/main/README.md`);
    const result = await response.text();
    const projectElement = document.getElementById(`readme-text${project_slot}`)
    projectElement.innerHTML = result
}

async function getTechnologies(container, index){
    const readmeFile = document.getElementById(`readme-text${index}`)

    if (readmeFile.innerHTML.includes('## Techs')) {
        const element = readmeFile.innerHTML.split("## Techs")
        const techList = element[element.length - 1].split("\n•")

        techList.forEach((tech, i) => {
            if (tech !== "\n" && tech && tech.length < 15){
                let imageElement = document.createElement('img')
                imageElement.classList.add('tech-item-img')
                imageElement.setAttribute('alt', tech)
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
