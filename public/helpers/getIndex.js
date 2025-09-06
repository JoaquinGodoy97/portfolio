
function getAnchorIndex(getRepoName, elementId) {
    let repoName = getRepoName[getRepoName.length - 1]
    const element = document.querySelector(`.${repoName}-content-box`)

    let techsContainer = element.querySelector('.techs-container');

    if (!techsContainer) {
        techsContainer = document.createElement('div');
        techsContainer.classList.add('techs-container'); 
        element.appendChild(techsContainer)

        // Trigger the transition with a slight delay to add visible class 
        setTimeout(() => { techsContainer.classList.add('visible'); }, 50); 
        // Slight delay to ensure smooth transition
    }
    const index = elementId.split('_')[0][7]

    return [index, techsContainer]
}

function getToggleIndex(elementId) {
    const idParts = elementId.split("-"); 
    const index = idParts[idParts.length - 1];
    return index
}

export { getAnchorIndex, getToggleIndex }