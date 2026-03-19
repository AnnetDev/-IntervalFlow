export function getRandomBackground(backgrounds, previousBackground) {
  const filteredBackgrounds = backgrounds.filter(
    (bg) => bg !== previousBackground
  );
  // filteredBackgrounds.length - total count of backgrounds except the previous one
  return filteredBackgrounds[
    Math.floor(Math.random() * filteredBackgrounds.length) // - random number between 0 and total
  ];
}

