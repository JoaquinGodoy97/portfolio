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

function getLanguageList(list){
    const listOfLan = []

    for (const repo of list.repoList) {

        const total = Object.values(repo.languages).reduce((acc, val) => acc + val, 0);

        for (const [lan, value] of Object.entries(repo.languages)) {
            if (lan !== null) {
                // let lanProps = lan.split(" ");
                const percentage = (parseFloat(value) / total) * 100;
                if (percentage > 3){
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

    return listOfLan
}

export { sumRepeated, getLanguageList }


