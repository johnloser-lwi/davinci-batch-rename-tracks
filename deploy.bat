@echo off
setlocal

set TARGET_DIR="C:\ProgramData\Blackmagic Design\DaVinci Resolve\Support\Workflow Integration Plugins\john_batch_rename_tracks"

REM Create target directory if it doesn't exist
if not exist %TARGET_DIR% (
    mkdir %TARGET_DIR%
)

REM Copy all files and folders except .git
xcopy * %TARGET_DIR% /E /I 
REM Remove .git folder if accidentally copied (shouldn't be, but just in case)
if exist %TARGET_DIR%\.git (
    rmdir /S /Q %TARGET_DIR%\.git
)

echo Deployment complete.
endlocal