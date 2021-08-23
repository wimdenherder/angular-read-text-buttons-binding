# Text to Speech
Creates buttons based on input text, for each sentence and word!
It translates it to Russian and plays it with text to speech!

<img src="src/assets/animation.gif">
<img src="src/assets/screenshot2.png">

# Installation
1. clone the repo/download
2. replace apikey for translation with yours (get it at console.cloud.google.com)
3. create database at console.firebase.google.com
4. download credentials from console.firebase.google
5. copy them to src/environments/environment.ts (create this file if it doesn't exist)
```
export const environment = {
  production: true,
  firebase: { ... credentials here ... }
}
```  
6. export also whitelisted emails like this in src/environments/environment.ts   
```
export const whitelistedEmails = [ ... emails here seperated by comma ... ]
```  
7. npm install
8. npm start
