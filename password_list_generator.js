const fs = require("fs");
const progress = require("progress");

// FILL THIS IN ***************************************************
// Instructions in README.md
const wordsArray = ["Name", "State", "password"];
// Bigger needs more storage
const numbers = 99999;

//*****************************************************************

// Function to generate password list with array as a prefix
function generatePasswordList(words, outputPath, numbers, numbersLength) {
  // Calculate total iterations
  const totalIterations = words.length * numbers * 2;

  // Create a new progress bar
  const bar = new progress(":bar :percent (:current/:total)", {
    total: totalIterations,
  });

  // Open the file for writing
  const stream = fs.createWriteStream(outputPath, { flags: "a" });

  // Generate passwords with each word as a prefix
  words.forEach((word) => {
    for (let i = 0; i < numbers; i++) {
      stream.write(
        `${word}${i.toString().padStart(numbersLength, "0")}` + "\n"
      );
      bar.tick();
    }
    for (let i = 0; i < numbers; i++) {
      stream.write(
        `${i.toString().padStart(numbersLength, "0")}${word}` + "\n"
      );
      bar.tick();
    }
  });

  // Event handler for when the writing is finished
  stream.on("finish", () => {
    // End the progress bar
    bar.terminate();
    console.log(`Password list has been written to ${outputPath}`);
  });

  // Close the file stream
  stream.end();

  // Event handler for stream errors
  stream.on("error", (err) => {
    console.error("Error writing to file:", err);
  });
}
const outputFilePath = "password_list.txt";
const numbersLength = numbers.toString().length;
// Delete existing content in the file
fs.writeFileSync(outputFilePath, "");

// Generate password list and end the progress bar when done
generatePasswordList(wordsArray, outputFilePath, numbers, numbersLength);
