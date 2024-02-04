# Message
Write-host "Downloading Rust installer. Do not exit" -ForegroundColor Green
# Define the URL of the file to download
$url = "https://static.rust-lang.org/rustup/dist/x86_64-pc-windows-msvc/rustup-init.exe"

# Define the local path where the file will be saved
$path = "$env:USERPROFILE\Downloads\rustup-init.exe"

# Download the file using Invoke-WebRequest
Invoke-WebRequest -Uri $url -OutFile $path

# Create a wshell object
$wshell = New-Object -ComObject wscript.shell

# Run the file using Start-Process and wait for it to activate
Start-Process -FilePath $path
Start-sleep 2
$wshell.AppActivate('rustup-init')

# Send '1' and 'Enter' keystrokes to the program
$wshell.SendKeys('1')
$wshell.SendKeys('~')

# Success 

exit 0