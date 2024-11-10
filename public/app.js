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

    // Function to create the SVG element
    function createSVG() {
        const svgNS = "http://www.w3.org/2000/svg"; 
        const svg = document.createElementNS(svgNS, "svg");
        svg.setAttribute("xmlns", svgNS);
        svg.setAttribute("width", "16");
        svg.setAttribute("height", "16");
        svg.setAttribute("fill", "currentColor");
        svg.setAttribute("class", "bi bi-hand-index-thumb pointer-project");
        svg.setAttribute("viewBox", "0 0 16 16");

        const path = document.createElementNS(svgNS, "path");
        path.setAttribute("d", "M6.75 1a.75.75 0 0 1 .75.75V8a.5.5 0 0 0 1 0V5.467l.086-.004c.317-.012.637-.008.816.027.134.027.294.096.448.182.077.042.15.147.15.314V8a.5.5 0 0 0 1 0V6.435l.106-.01c.316-.024.584-.01.708.04.118.046.3.207.486.43.081.096.15.19.2.259V8.5a.5.5 0 1 0 1 0v-1h.342a1 1 0 0 1 .995 1.1l-.271 2.715a2.5 2.5 0 0 1-.317.991l-1.395 2.442a.5.5 0 0 1-.434.252H6.118a.5.5 0 0 1-.447-.276l-1.232-2.465-2.512-4.185a.517.517 0 0 1 .809-.631l2.41 2.41A.5.5 0 0 0 6 9.5V1.75A.75.75 0 0 1 6.75 1M8.5 4.466V1.75a1.75 1.75 0 1 0-3.5 0v6.543L3.443 6.736A1.517 1.517 0 0 0 1.07 8.588l2.491 4.153 1.215 2.43A1.5 1.5 0 0 0 6.118 16h6.302a1.5 1.5 0 0 0 1.302-.756l1.395-2.441a3.5 3.5 0 0 0 .444-1.389l.271-2.715a2 2 0 0 0-1.99-2.199h-.581a5 5 0 0 0-.195-.248c-.191-.229-.51-.568-.88-.716-.364-.146-.846-.132-1.158-.108l-.132.012a1.26 1.26 0 0 0-.56-.642 2.6 2.6 0 0 0-.738-.288c-.31-.062-.739-.058-1.05-.046zm2.094 2.025");

        svg.appendChild(path);
        return svg;
    }

    // Function to append the SVG to project anchors
    function addSVGToAnchors() {
        const anchorDiv = document.querySelectorAll('.anchor-project-container')
        anchorDiv.forEach(anchor => {
            const svg = createSVG();
            anchor.appendChild(svg); // Appending the SVG next to the anchor text
        });
    }

    const projectListDiv = document.querySelector('.project-list');

    function addProjectTemplate(user, repo, index) {

        const projectListDiv = document.querySelector('.project-list');
        if (!projectListDiv) {
            console.error('ProjectListDiv not found')
            return;
        }

        // Outer elements
        const projectBox = document.createElement('div');
        projectBox.classList.add('box-shadow', 'p-3', 'mb-3', 'project-box', `${repo.repoName}-content-box`);

        // Title n description elements
        const projectTitle = document.createElement('h4');
        projectTitle.classList.add('project-title');
        projectTitle.innerHTML = repo.repoName
        projectBox.appendChild(projectTitle)
        const projectDescription = document.createElement('p');
        projectDescription.classList.add('project-description');
        projectDescription.innerHTML = repo.description || "No description."
        projectBox.appendChild(projectDescription)

        // Item-list wrapper
        const projectItemList = document.createElement('ul')
        projectItemList.classList.add('icon-list', 'ps-0')
        projectBox.appendChild(projectItemList)
        console.log('projectItemList created and appended:', projectItemList);

        // Link wrapper and link
        const projectLinkWrapper = document.createElement('li')
        projectLinkWrapper.classList.add('d-flex', 'align-items-start', 'mb-1', 'link-wrapper')
        projectItemList.appendChild(projectLinkWrapper)
        console.log('projectLinkWrapper created and appended:', projectLinkWrapper);
        
        const anchorDiv = document.createElement('div')
        anchorDiv.classList.add('anchor-project-container')
        projectLinkWrapper.appendChild(anchorDiv)
        console.log('anchorDiv created and appended:', anchorDiv);

        const projectAnchor = document.createElement('a')
        projectAnchor.setAttribute('href', repo.repoUrl || '#')
        projectAnchor.setAttribute('rel', 'noopener')
        projectAnchor.setAttribute('id', `project${index}_git_name`)
        projectAnchor.setAttribute('class', 'project-anchor')
        projectAnchor.setAttribute('target', '_blank')
        projectAnchor.innerHTML = repo.repoUrl ? 'to project...' : 'project missing...'
        anchorDiv.appendChild(projectAnchor)
        console.log('projectAnchor created and appended:', projectAnchor);

        addSVGToAnchors()
        
        // Language item
        // const projectLanguage = document.createElement('li')
        // projectLanguage.classList.add('text-muted', 'd-flex', 'align-items-start', 'mb-1', 'project-language')
        // projectLanguage.innerHTML = repo.languages || "No languages."
        // projectItemList.appendChild(projectLanguage)

        // Updated date
        const date = new Date(repo.whenUpdated)
        const projectLastUpdate = document.createElement('li')
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

        getReadme(user, repo.repoName, index)
    }

    // Event listener for the toggle button readme
    document.addEventListener('click', function(e) {
        
        if (e.target.className === 'toggle-readme'){

            const elementId = e.target.id; const idParts = elementId.split("-"); 
            const index = idParts[idParts.length - 1];

            const readmeText = document.getElementById(`readme-${index}`) // "text0" is the index
            if (readmeText.classList.contains('expanded')) {
                readmeText.classList.remove('expanded');
            } else {
                readmeText.classList.add('expanded');
            }
        }
    });

    projectListDiv.addEventListener('mouseover', function (e) {
        if (e.target.classList.contains('project-anchor')) {

            let getRepoName = e.target.href.split('/')
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
            const index = e.target.id.split('_')[0][7]

            if (techsContainer.children.length < 1) {
                getTechnologies(repoName, techsContainer, index);
            }

            // project pointer guide
            const techContainer = document.querySelector('.techs-container')
            if (techContainer) { 
                const svgPointer = document.querySelector('.pointer-project'); 
                if (svgPointer) { 
                    svgPointer.style.opacity = 0;
                    
                }
            }
        }
    })

    async function getTechnologies(repoName, container, index){

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

    // var main_container = document.querySelector('.main-container');
    const backToTopBtn = document.getElementById("backToTopBtn");

    // var body = document.querySelector('.body');
    window.addEventListener('scroll', function () {
        const valueScrollY = window.scrollY;
        // main_container.style.transform = `translateY(${1 - valueScrollY * 0.05 + "%"})`;

        if (valueScrollY > 20 || document.documentElement.scrollTop > 20) {
            backToTopBtn.style.display = "block";
        } else {
            backToTopBtn.style.display = "none";
        }
    });

    // When the user clicks on the button, scroll to the top of the document
    backToTopBtn.addEventListener("click", function () {
        // document.body.scrollTop = 0; // For Safari
        const scrollToTop = () => {
            const c = document.documentElement.scrollTop || document.body.scrollTop;
            if (c > 0) {
                window.requestAnimationFrame(scrollToTop);
                window.scrollTo(0, c - c / 8);
            }
        };
        scrollToTop();

        this.style.display = "none";
    });

    const selectLanguageBtn = document.querySelector('.select-language-btn')
    selectLanguageBtn.addEventListener('click', function () {
    // this.innerHTML = selectLanguageBtn.innerHTML !== 'ENG' ? 'ENG' : 'ESP';

    })

    async function getReadme(user, repoName, project_slot) {

        project_slot = String(project_slot);
        const response = await fetch(`https://raw.githubusercontent.com/${user}/${repoName}/main/README.md`);
        const result = await response.text();

        const projectElement = document.getElementById(`readme-text${project_slot}`)
        // const projectSlot = document.getElementById(`project${project_slot}_git_name`)

        projectElement.innerHTML = result
        // projectSlot.innerHTML = repoName

    }

    const gitUser = 'JoaquinGodoy97'

    try {
        const response = await fetch('/api/repos');
        const repoData = await response.json();

        console.log('Checking Data on app.js:', repoData)
        if (!response.ok) {
            throw new Error(`HTTP ERROR ${response.status}`)
        }

        const listOfLan = []

        for (const repo of repoData.repoList) {

            console.log(repo)
            const total = Object.values(repo.languages).reduce((acc, val) => acc + val, 0);

            for (const [lan, value] of Object.entries(repo.languages)) {
                if (lan !== null) {
                    // let lanProps = lan.split(" ");
                    const percentage = (parseFloat(value) / total) * 100;
                    if (percentage > 1){
                    //     console.log(lanProps[1])
                        let lanPropsObj = {
                            language: lan,
                            percentage: percentage
                        }
                        listOfLan.push(lanPropsObj)
                    }
                    
                }
            }
        }

        const cleanList = sumRepeated(listOfLan)
        for (const language of cleanList) {
            addProgressTemplate(language['language'], language['percentage']);
        }

        console.log(listOfLan, "This is the list with languages")

        function sumRepeated(list) {
            // Step 1: Accumulate percentages and counts 
            const accumulatedData = list.reduce((acc, { language, percentage }) => {

                if (acc[language]) {
                    acc[language].totalPercentage += percentage;
                    acc[language].count += 1;
                } else {
                    acc[language] = {
                        totalPercentage: percentage, count: 1
                    };
                } return acc;
            }, {}); 
            // Step 2: Calculate averages 
            const finalList = Object.keys(accumulatedData).map(language => ({
                language, percentage: (accumulatedData[language].totalPercentage / accumulatedData[language].count).toFixed(1)
            }));

            return finalList
        }

        const showReadme = () => {
            if (!Array.isArray(repoData.repoList)) {
                console.error('repoDetails is not an array');
                return;
            } repoData.repoList.forEach((repo, index) => {
                addProjectTemplate(gitUser, repo, index);
            });
        };
        showReadme();

    } catch (error) {
        console.error('Error fetching repository data:', error);
    }
});



    //template for div creation in <!-- LEFT COLUMN / PROJECTS --> class = project-list
    {/* TEMPLATE

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