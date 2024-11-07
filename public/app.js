
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

    // Get the button
    

    // // When the user scrolls down 20px from the top of the document, show the button
    // window.onscroll = function() {scrollFunction()};

    // function scrollFunction() {
        
    // }

    


    //template for div creation in <!-- LEFT COLUMN / PROJECTS --> class = project-list
    {/* <div class="box-shadow p-3 mb-3">

    <h4>CRUD</h4>

    <div class="box-shadow p-3 mb-3">

        <h2 class="project-title">Movie-app project</h2>
        <p class="project-description">Ready to beyond the starter template? Check out these open source projects that
        you can quickly duplicate to a new GitHub repository.</p>
        <ul class="icon-list ps-0">
            <li class="d-flex align-items-start mb-1"><a href="https://github.com/JoaquinGodoy97/movie-app-flask"
                rel="noopener" target="_blank" id="project1_git_name">proyect missing.</a></li>
            <li class="text-muted d-flex align-items-start mb-1 project-language">
                # Flask, python
            </li>
            <pre id="readme-text1">hola</pre>
        </ul>

        </div>

    </div> */}

    
    function addProjectTemplate(user, repo, index){

        console.log(repo)

        const projectListDiv = document.querySelector('.project-list');

        // Outer elements
        const projectBox = document.createElement('div');
        projectBox.classList.add('box-shadow', 'p-3', 'mb-3');

        // Title n description elements
        const projectTitle = document.createElement('h2');
        projectTitle.classList.add('project-title');
        projectBox.appendChild(projectTitle)
        const projectDescription = document.createElement('p');
        projectDescription.classList.add('project-description');
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

        const projectAnchor = document.createElement('a')
        projectAnchor.setAttribute('href', repo.repoUrl)
        projectAnchor.setAttribute('rel', "noopener")
        projectAnchor.setAttribute('id', `project${index}_git_name`)
        projectAnchor.setAttribute('target', '_blank')
        projectAnchor.innerHTML = repo.repoName || 'proyect missing...'
        projectLinkWrapper.appendChild(projectAnchor)

        // Language item
        const projectLanguage = document.createElement('li')
        projectLanguage.classList.add('text-muted', 'd-flex', 'align-items-start', 'mb-1', 'project-language')
        projectLanguage.innerHTML = repo.languages || "No languages."
        projectItemList.appendChild(projectLanguage)

        // Updated date
        const projectLastUpdate = document.createElement('li')
        projectLastUpdate.innerHTML = `Last time updated: ${repo.whenUpdated}`
        projectItemList.appendChild(projectLastUpdate)

        // Readme text
        const readmeText = document.createElement('pre')
        readmeText.setAttribute('id', `readme-text${index}`)
        projectItemList.appendChild(readmeText)

        projectListDiv.appendChild(projectBox)

        getReadme(user, repo.repoName, index)
    }

    var main_container = document.querySelector('.main-container');

    const backToTopBtn = document.getElementById("backToTopBtn");

    // var body = document.querySelector('.body');
    document.body.addEventListener('scroll', function () {
        // valueScrollY = window.scrollY;
        // main_container.style.transform = `translateY(${1 - valueScrollY * 0.05 + "%"})`;

        // console.log(document.body.scrollTop, "Scroll Top")
        // console.log(document.body.scrollY, "Scroll Y")
        // console.log(window.pageYOffset, "page offset")

        if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
            backToTopBtn.style.display = "block";
        } else {
            backToTopBtn.style.display = "none";
        }
    });

    // When the user clicks on the button, scroll to the top of the document
    backToTopBtn.addEventListener("click", function() {
        // document.body.scrollTop = 0; // For Safari
        document.body.scrollTo({ top: 0, behavior: 'smooth' });
        backToTopBtn.style.display = "none";
    });

    const selectLanguageBtn = document.querySelector('.select-language')
    selectLanguageBtn.addEventListener('click', function (){
        selectLanguageBtn.innerHTML = selectLanguageBtn.innerHTML !== 'ENG' ? 'ENG' : 'ESP';

    })

    // var shadow_boxes = document.querySelectorAll('.box-shadow'); 

    // console.log(shadow_boxes[2])

    // const isHover = e => e.parentElement.querySelector(':hover') === e;

    // window.addEventListener('mouseover', function () {
    //     let checkHover = {};
    //     for (var i = 0; i < shadow_boxes.length; i++) {
    //         var hovered = isHover(shadow_boxes[i]);

    //         if (hovered !== checkHover.hovered) {
    //             var hovered = isHover(shadow_boxes[i]);
    //             checkHover.hovered = hovered;
    //             shadow_boxes[i].style.transform = 'scale(101%)';
    //         } else {
    //             shadow_boxes[i].style.transform = 'scale(100%)';
    //         }
    //     }
    // });

    async function getReadme(user, repoName, project_slot) {

        project_slot = String(project_slot);
        const response = await fetch(`https://raw.githubusercontent.com/${user}/${repoName}/main/README.md`);
        const result = await response.text();

        const projectElement = document.getElementById(`readme-text${project_slot}`)
        const projectSlot = document.getElementById(`project${project_slot}_git_name`)

        projectElement.innerHTML = result
        projectSlot.innerHTML = repoName

        // if (!projectElement && projectSlot) {
        //     addProjectTemplate(project_slot)

        //     
        // }
        
        // <li class="d-flex align-items-start mb-1"><a href="https://github.com/JoaquinGodoy97/movie-app-flask"
        //         rel="noopener" target="_blank" id="project1_git_name">proyect missing.</a></li>
        //     <li class="text-muted d-flex align-items-start mb-1 project-language">
        //       # Flask, python
        //     </li>
        //     <pre id="readme-text1">hola</pre>

        // if (element) {
        //     element.innerHTML = result;
        //     element.innerHTML = repo;

        //     console.log(element)
        // } 
        // else {
        //     console.error(`Element with id repo${project_slot} not found`);
        // }
        
    }

    const gitUser = 'JoaquinGodoy97'

    try {
        const response = await fetch('/api/repos');
        const repoData = await response.json();

        if (!response.ok) {
            throw new Error(`HTTP ERROR ${response.status}`)
        }

        const listOfLan = []

        for (const repo of repoData.repoList) {
            for (const lan of repo.languages) {
                if (lan !== null) {
                    let lanProps = lan.split(" ");
                    let lanPropsObj = {
                        language: lanProps[0],
                        percentage: parseFloat(lanProps[1])
                    }
                    listOfLan.push(lanPropsObj)
                }
            }
        }

        const cleanList = sumRepeated(listOfLan)
        for (const language of cleanList) {
            addProgressTemplate(language['language'], language['percentage']);
        }

        console.log(listOfLan, "This is the list with languages")

        function sumRepeated(list) {
            const combinedPercentages = list.reduce((acc, { language, percentage }) => {
                if (acc[language]) {
                    acc[language] += percentage;
                } else {
                    acc[language] = percentage;
                }
                return acc;
            }, {});
            const finalList = Object.keys(combinedPercentages).map(language => ({
                language, percentage: combinedPercentages[language].toFixed(1)
            }));

            return finalList
        }

        const showReadme = () => { 
            if (!Array.isArray(repoData.repoDetails)) { 
                console.error('repoDetails is not an array'); 
                return; 
            } repoData.repoDetails.forEach((repo, index) => { 
                addProjectTemplate(gitUser, repo, index); 
            }); 
        };

        showReadme();

    } catch (error) {
        console.error('Error fetching repository data:', error);
    }


    

});



