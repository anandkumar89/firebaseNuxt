BUild from SRC, Deploy from Outside.

# Challenges in setting NUXT SSR using firebase

1. Create 3 directories - src, public & functions
2. Paste Nuxt app in src folder
3. add to build object  publicPath : public
          inside export buildDir   : '../functions/nuxt'

4. Probably you'd need to copy package.json (note that, in functions directory there'll already be a package json) to functions folder and install the modules. I didn't need it cz I was able to build the app to functions/nuxt directory

5. Copy assets folder to public. There will be a assets folder in public after copy.


sidenote: Don't use express. While using express, I faced lots of issues of slow execution of function. Also, Changed node version to 10 in functions/package.json and also on function settings on GCP.

What I don't understand ? 
How functions determine which files to render server side and which files to serve via CDN given static/assets files are copied to both functions and public folder.
-----------------------------

scripts copied from dev.to blog on nuxt js & firebase ssr. But Is likely no longer needed. Setup this project by watching official firebase channel video on firebase and nuxt server side rendering video.


```json
    "clean:dist": "rimraf \"dist/**/*.*!(md)\" && rimraf \"dist/_nuxt\"",
    "clean:functions": "rimraf \"functions/node_modules\" && rimraf \"functions/.nuxt\"",
    "clean:static": "rimraf \"src/static/sw.js\"",
    "copy:nuxt": "xcopy \"functions\\.nuxt\\dist\\*\" \"dist\\_nuxt\\\" /E /Y",
    "copy:static": "xcopy \"src\\static\\*\" \"dist\\\" /E /Y",
    "clean": "npm run clean:dist && npm run clean:functions && npm run clean:static",
    "copy": "npm run copy:nuxt && npm run copy:static",
    "build:firebase": "npm run clean && npm run build && npm run copy && cd \"functions\" && npm install",
    "start:firebase": "firebase serve --only functions,hosting",
    "deploy": "firebase deploy --only functions,hosting"
```
----------------------------
lines removed from firebase.json
```json
"database": {
    "rules": "database.rules.json"
},
"firestore": {
    "rules": "firestore.rules",
    "indexes": "firestore.indexes.json"
},
"functions": {
    "predeploy": [
        "npm --prefix \"$RESOURCE_DIR\" run lint"
    ]
},

"storage": {
    "rules": "storage.rules"
}

```
-------------------------
eigenspace - webapp apiKey

```json
          apiKey: "AIzaSyD6Xqi5W9cxN3I4Wiu50cbQWHEi9YBaiQI",
          authDomain: "eigenspace-3ebc0.firebaseapp.com",
          databaseURL: "https://eigenspace-3ebc0.firebaseio.com",
          projectId: "eigenspace-3ebc0",
          storageBucket: "eigenspace-3ebc0.appspot.com",
          messagingSenderId: "493331419335",
          appId: "1:493331419335:web:75fab3b658d21e6262eee2"
```