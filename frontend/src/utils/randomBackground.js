// Uses reference equality (bg !== previousBackground) — works because objects come from the
// same backgrounds array, but would break if the array is ever re-created (e.g. from an API).
export function getRandomBackground(backgrounds, previousBackground) {
    const filteredBackgrounds = backgrounds.filter(
        (bg) => bg !== previousBackground
    );
    // filteredBackgrounds.length - total count of backgrounds except the previous one
    return filteredBackgrounds[
        Math.floor(Math.random() * filteredBackgrounds.length) // - random number between 0 and total
    ];
}
