# Password list generator

## Rust version

### Setting up variables

**They are found at lines 5-11**

### wordsArray

wordsArray is a list of strings before and after the numbers

Example:

```
prefix00001

prefix00002

...

prefix99999

00000apple

...

999999apple
```

Example code:

```Rust
let words_array = vec!["prefix", "apple"];
```

### Numbers

### Usually recommended for all digits to be 9

Defines how many numbers are there after and before every word in wordsArray

Example:

```Rust
let numbers = 999
```

Output:

```
prefix001

...

prefix999
```

## Download Rust

1. Right click on `install-rust.ps1` and `run` it

2. Choose option 1 and finish instructions. (This will be done automatically.)

3. Follow instructions

4. Proceed by [running script](#run-script)

## Build and Run

Build is used after setting up variables

1. Open powershell

2. Right click on `build.cmd` and click `run`
