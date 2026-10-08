ROCKS FROM THE SKY - Windows app + Android app
================================================
This folder builds two real apps with everything bundled inside:
  - Windows: an installer (.exe) and a portable (.exe, no install needed)
  - Android: an .apk file you can send to phones

You do NOT need to install anything. GitHub builds the apps for you, free, in the cloud.

STEPS
1. Make a free account at github.com, then click New repository (any name, e.g. rocky-app).
2. On the new repository page click "uploading an existing file". Open this unzipped folder and
   drag EVERYTHING inside it (all files and folders) into the page. Click Commit changes.
3. Check the file list: you should see a folder called .github
   If it is missing: click Add file > Create new file, type   .github/workflows/build.yml
   as the name, paste in everything from build-workflow.yml, and click Commit changes.
4. Click the Actions tab > Build apps > Run workflow (green button). Wait 5 to 10 minutes
   until both jobs (windows, android) show a green tick.
5. Click the finished run. At the bottom, under Artifacts, download Windows-app and Android-app.
   Unzip them: you now have the .exe files and app-debug.apk.

INSTALLING
Windows: run RocksFromTheSky-Setup-1.0.0.exe (or the Portable one).
  Windows may say "Windows protected your PC" because the app is not signed.
  Click More info, then Run anyway.
Android: send app-debug.apk to the phone (WhatsApp, Google Drive, cable), open it, and allow
  installs from that source when asked. Play Protect may warn about an unknown app: choose Install anyway.
iPhone: Apple does not allow sharing app files like this. Use the website link and Add to Home Screen.

IF A BUILD TURNS RED
Click the red job, scroll to the last few lines, and send them to Claude to fix.

CHANGING THE APP LATER
Edit www/index.html, upload it again to GitHub, and run the workflow again.
