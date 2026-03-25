@echo off
echo Mapping www.snbt.ac.in to 127.0.0.1...
powershell -Command "Add-Content -Path C:\Windows\System32\drivers\etc\hosts -Value '`n127.0.0.1 www.snbt.ac.in`n127.0.0.1 snbt.ac.in'"
if %errorlevel% neq 0 (
    echo.
    echo ERROR: Could not update hosts file. 
    echo Please make sure you right-clicked this file and selected "Run as Administrator".
    pause
) else (
    echo.
    echo SUCCESS! Domain mapping updated.
    echo.
    echo 1. Start your server: node server.js
    echo 2. Visit your college website: http://www.snbt.ac.in
    pause
)
