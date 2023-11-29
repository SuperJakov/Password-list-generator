// Import the fs promises API
const fs = require("fs/promises");

// File name
const fileName = "password_list.txt";

// Initialize the counter
let i = 0;

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
      // Loop until the counter reaches the limit
      while (i <= 999999999) {
        // Pad the number with leading zeros to make it 9 digits long
        let password = i.toString().padStart(9, "0");
        // Append the password to the buffer
        buffer += "INNBOX" + password + "\n";
        // Increment the counter
        i++;
        // Check if the buffer size is 5000 or more, larger = better cpu
        if (buffer.length >= 5000) {
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
