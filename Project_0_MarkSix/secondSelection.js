// Hong Kong Mark Six Lottery Simulator
// Draws 5 patterns from given patterns

const givenPatterns = [
    "9, 21, 31, 40, 44, 48",
    "1, 8, 21, 36, 46, 48",
    "2, 10, 21, 34, 42, 43",
    "16, 17, 22, 37, 41, 43",
    "8, 10, 21, 24, 37, 45",
    "1, 7, 8, 28, 30, 41",
    "3, 21, 22, 28, 39, 48",
    "1, 10, 15, 30, 35, 48",
    "2, 13, 15, 21, 26, 35",
    "11, 19, 28, 29, 34, 46",
    "14, 17, 19, 28, 33, 37",
    "8, 13, 27, 38, 43, 49",
    "5, 12, 13, 40, 47, 49",
    "9, 12, 15, 20, 33, 37",
    "1, 13, 33, 36, 42, 49",
    "1, 9, 10, 19, 32, 49"
];

function draw5Patterns(patterns) {
    const selected = [];
    const usedIndices = new Set();

    while (selected.length < 5) {
        const index = Math.floor(Math.random() * patterns.length);
        if (!usedIndices.has(index)) {
            usedIndices.add(index);
            selected.push(patterns[index]);
        }
    }

    return selected;
}

const selectedPatterns = draw5Patterns(givenPatterns);
console.log('Selected 5 patterns from given patterns:');
selectedPatterns.forEach((pattern, index) => {
    console.log(`Pattern ${index + 1}: ${pattern}`);
});
