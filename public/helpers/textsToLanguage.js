export const textsToLanguage = async (language, elementsToTranslate) => {

    const defaultLanguage = "en"
    const secondaryLanguage = "es"

    try {
        const requestJson = await fetch(`/languages/${language}.json`)
        const texts = await requestJson.json();

        const flag = document.getElementById(`translate-btn-${language}`)
        let target = flag.dataset.language;

        if (target !== defaultLanguage) {
            const enFlag = document.getElementById(`translate-btn-${defaultLanguage}`);
            flag.classList.add('hide-flag')
            enFlag.classList.remove('hide-flag');
        } else {
            const esFlag = document.getElementById(`translate-btn-${secondaryLanguage}`);
            flag.classList.add('hide-flag')
            esFlag.classList.remove('hide-flag');
        }

        for (const textTochange of elementsToTranslate) {
            const section = textTochange.dataset.section;
            const value = textTochange.dataset.value;

            if (textTochange === null) {
                console.log("null")
            }

            // if (value === "project-last-update") {
            //     const date = new Date();
            //     const options = { weekday: 'short', month: 'short', day: 'numeric' };
            //     const formattedDate = date.toLocaleDateString(language === defaultLanguage ? "en-US" : "es-ES", options);
            //     const projectLastUpdate = document.getElementById('last-updated-value');
            //     projectLastUpdate.innerHTML = formattedDate.capitalize();
            // }

            textTochange.innerHTML = texts[section][value]

        }

    } catch (err) {
        console.error("Error fetching languages data: ", err)
    }
}

Object.defineProperty(String.prototype, 'capitalize', {
    value: function () {
        return this.charAt(0).toUpperCase() + this.slice(1);
    },
    enumerable: false
});