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
            
            // console.log(textTochange)
            // const date = textTochange.innerHTML

            // if (date.includes(": ")) {
            //     console.log(textTochange);
            // }

            textTochange.innerHTML = texts[section][value]
        }

    } catch (err) {
        console.error("Error fetching languages data: ", err)
    }
}