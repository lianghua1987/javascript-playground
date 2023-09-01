# Javascript Playground
### E-Commerce (Express JS)
#### Get Started
To run application: `npm run dev`
![ecomm.png](previews%2Fecomm%2Fecomm.png)
![cart.png](previews%2Fecomm%2Fcart.png)
![set-cookie.png](previews%2Fecomm%2Fset-cookie.png)
#### Troubleshoot
**invalid value in custom validator** - https://github.com/express-validator/express-validator/issues/619
### Movie Fight (Vanilla JS)
#### Get Started
Movie comparison using [OMDb API](https://www.omdbapi.com/)
To run application:
* Create env.js under current folder with below format:
    ```javascript
    const OMDB_API_KEY = "YOUR_API_KEY";
    export default OMDB_API_KEY;
    ```
* Open application using browser
![preview.png](previews%2Fmovie-fight%2Fpreview.png)
![test.png](previews%2Fmovie-fight%2Ftest.png)

### Message sharing (Vanilla JS)
#### Get Started
Base64 is used to do the "encryption". To run application, open in browser `index.html`  
To deploy to server, run `npx now`  
See deployed: https://message-sharing-4abdkmh7z-hualiang987-gmailcom.vercel.app/ (Powered by [https://vercel.com/](https://vercel.com/))
![home.png](previews%2Fmessage-sharing%2Fhome.png)
![encrypted.png](previews%2Fmessage-sharing%2Fencrypted.png)
![decrypted.png](previews%2Fmessage-sharing%2Fdecrypted.png)
### Testing framework (NodeJS - CLI)
#### Get Started
```shell
npm link
export FORCE_COLOR=true # To set up coloring (Git Bash on PC)
tme
```
![preview.png](previews%2Ftest-framework%2Fpreview.png)
### Knowledge Concepts
#### Notorious `This`
- Did you define the function with an arrow function? - White `console.log(this)` on the first **valid** line about the arrow function. Value of `this` in the arrow function will be equal to that console log
- Did you call `'bind', 'call', 'apply'` on the function when you invoked it? - `'this'` is equal to the first argument of `'bind', 'call', 'apply'`
- All other cases - `'this'` is equal to whatever is to the left of the `'.'` in the method call