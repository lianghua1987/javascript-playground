# Javascript Playground
### E-Commerce
#### Get Started
To run application: `npm run dev`
![ecomm.png](previews%2Fecomm%2Fecomm.png)
![cart.png](previews%2Fecomm%2Fcart.png)
![set-cookie.png](previews%2Fecomm%2Fset-cookie.png)
#### Troubleshoot
**invalid value in custom validator** - https://github.com/express-validator/express-validator/issues/619

### Knowledge Concepts
#### Notorious `This`
- Did you define the function with an arrow function? - White `console.log(this)` on the first **valid** line about the arrow function. Value of `this` in the arrow function will be equal to that console log
- Did you call `'bind', 'call', 'apply'` on the function when you invoked it? - `'this'` is equal to the first argument of `'bind', 'call', 'apply'`
- All other cases - `'this'` is equal to whatever is to the left of the `'.'` in the method call