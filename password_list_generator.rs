use std::fs::File;
use std::io::{self, Write};

fn main() {
    // FILL THIS IN ***************************************************
    // Instructions in README.md
    let words_array = vec!["Name", "State", "password"];
    // Bigger needs more storage
    let numbers = 999999;

    //*****************************************************************

    let output_file_path = "password_list.txt";
    let numbers_length = numbers.to_string().len();

    // Delete existing content in the file
    let mut file = File::create(output_file_path).expect("Error creating file");

    // Generate password list and end the progress bar when done
    generate_password_list(
        &words_array,
        &output_file_path,
        numbers,
        numbers_length,
        &mut file,
    );
}

// Function to generate password list with array as a prefix
fn generate_password_list(
    words: &[&str],
    output_path: &str,
    numbers: usize,
    numbers_length: usize,
    file: &mut File,
) {
    // Calculate total iterations
    let total_iterations = words.len() * numbers * 2;
    let mut current_iteration = 0;

    // Generate passwords with each word as a prefix
    for word in words {
        for i in 0..numbers {
            writeln!(
                file,
                "{}{}",
                word,
                format!("{:0width$}", i, width = numbers_length)
            )
            .expect("Error writing to file");
            current_iteration += 1;
            print_progress(current_iteration, total_iterations);
        }
        for i in 0..numbers {
            writeln!(
                file,
                "{}{}",
                format!("{:0width$}", i, width = numbers_length),
                word
            )
            .expect("Error writing to file");
            current_iteration += 1;
            print_progress(current_iteration, total_iterations);
        }
    }

    // End the progress bar
    println!("\nPassword list has been written to {}", output_path);
}

// Function to print progress bar
fn print_progress(current: usize, total: usize) {
    let percent = (current * 100) as f64 / total as f64;
    print!(
        "\r{:>3}% [{:<50}] ({}/{})",
        percent as usize,
        "=".repeat((percent * 0.5) as usize),
        current,
        total
    );
    io::stdout().flush().unwrap();
}
