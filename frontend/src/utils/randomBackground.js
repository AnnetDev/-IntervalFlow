

export function getRandomBackground(backgrounds, previousBackground) {
 

    const filteredBackgrounds = backgrounds.filter((bg) => bg !== previousBackground);
    return filteredBackgrounds[Math.floor(Math.random() * filteredBackgrounds.length)];
}

