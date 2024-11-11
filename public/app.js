import { getAnchorIndex, getToggleIndex } from "./helpers/getIndex.js";
import { showButtonOnScrollDown } from "./helpers/ShowButtonOnScroll.js";
import { addProjectTemplate, addProgressTemplate } from "./components/projectTemplate.js";
import { sumRepeated, getLanguageList } from "./helpers/listHelpers.js";
import { scrollToTop } from "./helpers/scrollFunctionality.js";
import { getTechnologies } from "./helpers/getGithubData.js";

document.addEventListener('DOMContentLoaded', async () => {
    const projectListDiv = document.querySelector('.project-list');

    // Event listener for the toggle button readme
    document.addEventListener('click', function(e) {
        
        if (e.target.className === 'toggle-readme'){

            const elementId = e.target.id; 
            const index = getToggleIndex(elementId);
            
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
            const elementId = e.target.id;

            const [index, techsContainer] = getAnchorIndex(getRepoName, elementId);

            if (techsContainer.children.length < 1) {
                getTechnologies(techsContainer, index);
            }

            // project pointer guide
            // const techContainer = document.querySelector('.techs-container')
            if (techsContainer) { 
                const svgPointer = document.querySelector('.pointer-project'); 
                if (svgPointer) { 
                    svgPointer.style.opacity = 0;
                }
            }
        }
    })

    // var main_container = document.querySelector('.main-container');
    const backToTopBtn = document.getElementById("backToTopBtn");

    // var body = document.querySelector('.body');
    window.addEventListener('scroll', function () {
        const valueScrollY = window.scrollY;
        showButtonOnScrollDown(valueScrollY, backToTopBtn)
    });

    // When the user clicks on the button, scroll to the top of the document
    backToTopBtn.addEventListener("click", function () {
        // document.body.scrollTop = 0; // For Safari
        scrollToTop();
        this.style.display = "none";
    });

    const selectLanguageBtn = document.querySelector('.select-language-btn')
    selectLanguageBtn.addEventListener('click', function () {
    // this.innerHTML = selectLanguageBtn.innerHTML !== 'ENG' ? 'ENG' : 'ESP';

    })
    
    const gitUser = 'JoaquinGodoy97'

    try {
        const response = await fetch('/api/repos');
        const repoData = await response.json();

        if (!response.ok) {
            throw new Error(`HTTP ERROR ${response.status}`)
        }

        const listOfLan = getLanguageList(repoData)
        const cleanList = sumRepeated(listOfLan)

        for (const language of cleanList) {
            addProgressTemplate(language['language'], language['percentage']);
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