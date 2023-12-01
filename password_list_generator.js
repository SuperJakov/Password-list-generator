// Import the fs promises API
const fs = require("fs/promises");

// File name
const fileName = "password_list.txt";

// prefix
// leave empty for no prefix. Example no prefix:
// const prefix = "";
const prefix = "prefix";
console.log(`Initialized prefix: ${prefix}`);
// number count
// count of numbers after prefix (or no prefix)
// bigger = more ssd space
// bigger = longer
const numberCount = 99999;
console.log(`Initialized numberCount: ${numberCount}`);
// bigger = better cpu
// 2500 = bad pc
// 5000 = average pc
// 15000 = good pc
// 30000 extreme pc NOT RECOMMENDED!
// bigger = faster

const cpu = 25000;
console.log(`Initialized cpu: ${cpu}`);
// Initialize the counter
let i = 0;
// Set a file to blank
fs.writeFile(fileName, "", (err) => {
  if (err) console.error(err);
  else {
    console.log("File emptied successfully");
  }
});
// Define an async function
async function makePasswordList() {
  // Try to open the file in append mode
  try {
    // Get the file handle
    const fileHandle = await fs.open(fileName, "a");
    // Check if the file handle is valid
    if (fileHandle) {
      // Initialize a buffer to store passwords
      let buffer = "";
      const localPrefix = prefix;
      const localCpu = cpu;
      // Loop until the counter reaches the limit
      while (i <= numberCount) {
        // Pad the number with leading zeros to make it 9 digits long
        let password = i
          .toString()
          .padStart(numberCount.toString().length, "0");
        // Append the password to the buffer
        buffer += localPrefix + password + "\n";
        // Increment the counter
        i++;
        // Check if the buffer size is 5000 or more, larger = better cpu
        if (buffer.length >= localCpu) {
          // Write the buffer to the file
          await fileHandle.write(buffer);
          // Clear the buffer
          buffer = "";
        }
      }
      // Write the remaining buffer to the file
      if (buffer.length > 0) {
        await fileHandle.write(buffer);
      }
      // Close the file handle
      await fileHandle.close();
      // Log success message
      console.log("Password list file created successfully");
    } else {
      // Throw an error if the file handle is invalid
      throw new Error("Invalid file handle");
    }
  } catch (err) {
    // Handle errors
    console.error(err);
  }
}

// Call the async function
makePasswordList();
