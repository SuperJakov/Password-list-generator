const fs = require("fs/promises");

// File name
const fileName = "password_list.txt";
// Make file blank
fs.writeFile(fileName, "");
// prefix
// leave empty for no prefix. Example no prefix:
// const prefix = "";
const prefix = "INNBOX";
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

const cpu = 30000;
console.log(`Initialized cpu: ${cpu}`);

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
      // Get the length of the number count
      const numberLength = numberCount.toString().length;
      // Loop until the counter reaches the limit
      for (let i = 0; i <= numberCount; i++) {
        // Pad the number with leading zeros to make it 9 digits long
        let password = i.toString().padStart(numberLength, "0");
        // Append the password to the buffer
        buffer += prefix + password + "\n";
        // Check if the buffer size is 5000 or more, larger = better cpu
        if (buffer.length >= cpu) {
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
