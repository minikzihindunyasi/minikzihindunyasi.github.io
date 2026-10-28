@echo off
setlocal
cd /d "%~dp0"
echo Minik Zihin hazirlaniyor...
start "Minik Zihin Sunucusu" /min cmd /c "cd /d ""%~dp0"" && py -m http.server 8000"
timeout /t 2 /nobreak >nul
if exist "%ProgramFiles(x86)%\Microsoft\Edge\Application\msedge.exe" (
  start "" "%ProgramFiles(x86)%\Microsoft\Edge\Application\msedge.exe" --app=http://localhost:8000
  exit /b
)
if exist "%ProgramFiles%\Microsoft\Edge\Application\msedge.exe" (
  start "" "%ProgramFiles%\Microsoft\Edge\Application\msedge.exe" --app=http://localhost:8000
  exit /b
)
start "" http://localhost:8000
