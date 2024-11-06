
// const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
// const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))

// function getReadme(user, repo, project_slot) {

//     project_slot = String(project_slot)

//     fetch(`https://raw.githubusercontent.com/${user}/${repo}/main/README.md`) // Fetch the file from GitHub's api
//         .then(response => response.text())
//         .then(result => document.getElementById(`readme-text${project_slot}`).innerHTML = result);

//     document.getElementById(`project${project_slot}_git_name`).innerHTML = repo;

// }

// getReadme("JoaquinGodoy97", "movie-app-flask", 1)
// getReadme("JoaquinGodoy97", "flask-crud-introduction", 2)
// getReadme("JoaquinGodoy97", "gallery-img", 3)
// getReadme("JoaquinGodoy97", "weather-app-js", 4)




// public/app.js
document.addEventListener('DOMContentLoaded', async () => {
    const skillsContainer = document.querySelector('.skills-container');
    const progressList = document.createElement('div');
    progressList.classList.add('progress-list');

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

    var main_container = document.querySelector('.main-container');
    // var body = document.querySelector('.body');

    window.addEventListener('scroll', function () {
        valueScrollY = window.scrollY;

        main_container.style.transform = `translateY(${1 - valueScrollY * 0.05 + "%"})`;

    });

    var shadow_boxes = document.querySelectorAll('.box-shadow');

    console.log(shadow_boxes[2])

    const isHover = e => e.parentElement.querySelector(':hover') === e;

    window.addEventListener('mouseover', function () {

        for (var i = 0; i < shadow_boxes.length; i++) {

            if (hovered !== checkHover.hovered) {
                var hovered = isHover(shadow_boxes[i]);
                checkHover.hovered = hovered;
                shadow_boxes[i].style.transform = 'scale(105%)';
            }
        }

    });

    async function getReadme(user, repo, project_slot) {
        project_slot = String(project_slot);

        const response = await fetch(`https://raw.githubusercontent.com/${user}/${repo}/main/README.md`);
        const result = await response.text();
        document.getElementById(`readme-text${project_slot}`).innerHTML = result;

        document.getElementById(`project${project_slot}_git_name`).innerHTML = repo;
    }

    try {
        const response = await fetch('/api/repos');
        const repoData = await response.json();

        if (!response.ok) {
            throw new Error(`HTTP ERROR ${response.status}`)
        }

        for (const lan of repoData.repoList[0].languages) {
            let lanProps = lan.split(" ");
            addProgressTemplate(lanProps[0], lanProps[1]);  
        }

        getReadme("JoaquinGodoy97", "movie-app-flask", 1)
        getReadme("JoaquinGodoy97", "flask-crud-introduction", 2)
        getReadme("JoaquinGodoy97", "gallery-img", 3)
        getReadme("JoaquinGodoy97", "weather-app-js", 4)
        // Example usage of getReadme
        // await getReadme('username', 'repository', 1); // Replace with actual user and repo names
        // await getReadme('username', 'repository', 2); // Replace with actual user and repo names
    } catch (error) {
        console.error('Error fetching repository data:', error);
    }
});
