// Counting.js - Analyze frequency of numbers from lottery patterns
// This script counts the frequency of each number from 1-49 across all provided patterns

const patterns = [
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

// Convert patterns to arrays of numbers
function parsePatterns(patterns) {
    return patterns.map(pattern => pattern.split(', ').map(num => parseInt(num)));
}

// Count frequency of each number (1-49)
function countFrequencies(parsedPatterns) {
    const frequency = {};

    // Initialize all numbers from 1-49 with count 0
    for (let i = 1; i <= 49; i++) {
        frequency[i] = 0;
    }

    // Count occurrences
    parsedPatterns.forEach(pattern => {
        pattern.forEach(number => {
            frequency[number]++;
        });
    });

    return frequency;
}

// Get top 20 most frequent numbers
function getTop20(frequency) {
    const sorted = Object.entries(frequency)
        .sort((a, b) => {
            // Sort by frequency (descending), then by number (ascending) for ties
            if (b[1] !== a[1]) {
                return b[1] - a[1];
            } else {
                return a[0] - b[0];
            }
        })
        .slice(0, 20);

    return sorted;
}

// Main execution
const parsedPatterns = parsePatterns(patterns);
const frequency = countFrequencies(parsedPatterns);
const top20 = getTop20(frequency);

// Display results
console.log('Hong Kong Mark Six - Number Frequency Analysis');
console.log('==========================================');
console.log(`Total patterns analyzed: ${patterns.length}`);
console.log(`Total numbers counted: ${parsedPatterns.length * 6}`);
console.log('');

console.log('Top 20 Most Frequent Numbers:');
console.log('============================');
top20.forEach(([number, count], index) => {
    console.log(`${index + 1}. Number ${number}: ${count} times`);
});

console.log('');
console.log('Complete frequency table:');
console.log('========================');
Object.entries(frequency)
    .sort((a, b) => b[1] - a[1])
    .forEach(([number, count]) => {
        console.log(`Number ${number}: ${count} times`);
    });
