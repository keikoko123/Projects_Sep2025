// Hong Kong Mark Six Lottery Simulator
// Draws 6 unique numbers from 1 to 49

function generateMarkSixNumbers() {
    const numbers = [];
    const usedNumbers = new Set();

    while (numbers.length < 6) {
        const num = Math.floor(Math.random() * 49) + 1;
        if (!usedNumbers.has(num)) {
            usedNumbers.add(num);
            numbers.push(num);
        }
    }

    return numbers.sort((a, b) => a - b);
}

for (let i = 0; i < 10; i++) {
    const drawnNumbers = generateMarkSixNumbers();
    console.log(`Draw ${i + 1}: ${drawnNumbers.join(', ')}`);
}
