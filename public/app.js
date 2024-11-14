import { getAnchorIndex, getToggleIndex } from "./helpers/getIndex.js";
import { showButtonOnScrollDown } from "./helpers/ShowButtonOnScroll.js";
import { addProjectTemplate, addProgressTemplate } from "./components/projectTemplate.js";
import { sumRepeated, getLanguageList } from "./helpers/listHelpers.js";
import { scrollToTop } from "./helpers/scrollFunctionality.js";
import { getTechnologies } from "./helpers/getGithubData.js";
import { textsToLanguage } from "./helpers/textsToLanguage.js";
import { addSVGToAnchors } from "./components/svgIcon.js";

document.addEventListener('DOMContentLoaded', async () => {

    const mediaQuery = window.matchMedia('(max-width: 768px)'); // You can adjust this breakpoint

    const projectListDiv = document.querySelector('.project-list');

    const languageBtns = document.querySelectorAll('.select-language-btn');
        languageBtns.forEach( button => {
            button.addEventListener("click", function (e) {

                // console.log(e.target.parentElement.dataset.language)
                const language = e.currentTarget.dataset.language;
                console.log(`Button clicked, language: ${language}`); // Added logging
                updateTexts(language)
            });
        })

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
            } 
            
            repoData.repoList.forEach((repo, index) => {
                addProjectTemplate(repo.gituser, repo, index);
            });

        };

        showReadme();

        await addSVGToAnchors()

        // Wait briefly to ensure .project-anchor elements are in DOM
        setTimeout(() => {
            handleScreenSizeChange(mediaQuery);
        }, 100);  // Delay in milliseconds


        // const languageBtnContainer = document.getElementById('language-btn-container');
    } catch (error) {
        console.error('Error fetching repository data:', error);
    }

    if (mediaQuery.addEventListener) { 
        mediaQuery.addEventListener('change', handleScreenSizeChange); 
    } else if (mediaQuery.addListener) { 
        // For older browsers 
        mediaQuery.addListener(handleScreenSizeChange); 
    }

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

});

// Store the interval ID to keep track of the interval state
let intervalId;

// Function to re-query and apply translations
async function updateTexts(language) {
    const textsToChange = document.querySelectorAll('[data-section]');
    let updateInterval = 1500;
    const mainContainer = document.querySelector('.main-container')

    if (textsToChange.length === 0) {
        console.warn("No elements to update.");
        return;
    }
    mainContainer.style.opacity = 0.7;
    
    // Clear any existing interval before starting a new one
    if (intervalId) {
        clearInterval(intervalId);
    }
    
    intervalId  = setInterval(() => {
                mainContainer.style.opacity = 1;
                textsToLanguage(language, textsToChange);
                clearInterval(intervalId);
            }, updateInterval)
    }

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

    async function handleScreenSizeChange(e) { 
        const projectList = document.querySelectorAll('.project-anchor')
        
        if (e.matches && !document.querySelector('.techs-container')) { 
        // If the screen width is less than or equal to 768px (phone screen size) 
            for (const project of projectList) {
                let getRepoName = project.href.split('/')
                const elementId = project.id;
                const [index, techsContainer] = getAnchorIndex(getRepoName, elementId)
                await getTechnologies(techsContainer, index);
                
            }
        } 
    }