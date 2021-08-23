# Text to Speech
Creates buttons based on input text, for each sentence and word!
It translates it to Russian and plays it with text to speech!

<img src="src/assets/animation.gif">
<img src="src/assets/screenshot2.png">

# Installation
1. clone the repo/download
2. replace apikey for translation with yours (get it at console.cloud.google.com)
3. Creating a firestore database (at firebase)
4. go to firebase
go to (and login): https://console.firebase.google.com/u/0/project/_/overview
5. add new project & continue (to use existing project see at the bottom)
6. click on web app symbol
![alt text](readme-img-firebase.png)
7. register app
8. copy this
```
var firebaseConfig = {
    apiKey: "*********",
    authDomain: "*********",
    projectId: "*********",
    storageBucket: "*********",
    messagingSenderId: "*********",
    appId: "*********",
    measurementId: "*********"
  };
```
9. create the file src/environments/environment.ts and copy the credentials to here
```
export const environment = {
  production: true,
  firebase: {
    apiKey: "*********", // YOUR CREDENTIALS HERE
    authDomain: "*********",
    projectId: "*********",
    storageBucket: "*********",
    messagingSenderId: "*********",
    appId: "*********",
    measurementId: "*********"
  }
}
```  
10. export also whitelisted emails in src/environments/environment.ts   
```
export const whitelistedEmails = [ ... emails here seperated by comma ... ]
```  
NOTE: only these whitelisted emails will get access to your app!  
11. npm install  
12. npm start

# Get firestore credentials from an existing project
4. go to firebase
go to (and login): https://console.firebase.google.com/u/0/project/_/overview
5. select the project
6. click project settings
![alt text](readme-project-settings.png)
7. scroll down on the first general page
8. you'll find the credentials here:
```
{
    apiKey: "*********", // YOUR CREDENTIALS HERE
    authDomain: "*********",
    projectId: "*********",
    storageBucket: "*********",
    messagingSenderId: "*********",
    appId: "*********",
    measurementId: "*********"
  }
  ```
9. follow step 9 above
