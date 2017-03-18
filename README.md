#(NEF) Node-Express-Firebase REST APIs implementation made easy

This is a simple boilerplate implementation of making REST APIs in **Node.js** using **ES6 (ECMA Script 2015)** and **Express**  with implementation of **Firebase** Admin for Authentication implemented with **JWT** (JSON Web Token) for more fast and secure communication. Using [Airbnb's Javascript style guide](https://github.com/airbnb/javascript).

Using modified base from [Kunalkapadia](http://kunalkapadia.github.io/express-mongoose-es6-rest-api/) that Heavily inspired from [Egghead.io - How to Write an Open Source JavaScript Library](https://egghead.io/courses/how-to-write-an-open-source-javascript-library).

----------
Features
-------------------

| Feature                                | Summary                                                                                                                                                                                                                                                     |
|----------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Firebase Admin Authetification                  	 	 | Firebase Auth for making client simply using Google [Firebase](https://babeljs.io/) for creating and updating account, reduce your development time for making Auth System  |
| Uses [yarn](https://yarnpkg.com) over npm            | Yarn caches every package it downloads so it never needs to download it again. It also parallelizes operations to maximize resource utilization so install times are faster than ever, check from official website [here](https://code.facebook.com/posts/1840075619545360) |
| ES6 syntax transform using Babel                  	 	 | [Babel](https://babeljs.io/) has support for the latest version of JavaScript through syntax transformers. These plugins allow you to use new syntax, right now without waiting for browser.  |
|JWT Authentication                   	 	 | JSON Web Token (JWT) is an open standard (RFC 7519) that defines a compact and self-contained way for securely transmitting information between parties as a JSON object. Node.js using library from [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken).  |
| Code Linting               			 | JavaScript code linting is done using [ESLint](http://eslint.org) - a pluggable linter tool for identifying and reporting on patterns in JavaScript. Uses ESLint with [eslint-config-airbnb](https://github.com/airbnb/javascript/tree/master/packages/eslint-config-airbnb), which tries to follow the Airbnb JavaScript style guide.                                                                                                |
| Auto server restart                  	 | Restart the server using [nodemon](https://github.com/remy/nodemon) in real-time anytime an edit is made, with babel compilation and eslint.                                                                                                                                                                            |
| ES6 Code Coverage via [istanbul](https://www.npmjs.com/package/istanbul)                  | Supports code coverage of ES6 code using istanbul and mocha. Code coverage reports are saved in `coverage/` directory post `yarn test` execution. Open `coverage/lcov-report/index.html` to view coverage report. `yarn test` also displays code coverage summary on console. Code coverage can also be enforced overall and per file as well, configured via .istanbul.yml                                                                                                                                                                            |
| Debugging via [debug](https://www.npmjs.com/package/debug)           | Instead of inserting and deleting console.log you can replace it with the debug function and just leave it there. You can then selectively debug portions of your code by setting DEBUG env variable. If DEBUG env variable is not set, nothing is displayed to the console.                       |
| Promisified Code via [bluebird](https://github.com/petkaantonov/bluebird)           | We love promise, don't we ? All our code is promisified and even so our tests via [supertest-as-promised](https://www.npmjs.com/package/supertest-as-promised).                       |
| API parameter validation via [express-validation](https://www.npmjs.com/package/express-validation)           | Validate body, params, query, headers and cookies of a request (via middleware) and return a response with errors; if any of the configured validation rules fail. You won't anymore need to make your route handler dirty with such validations. |
| Pre-commit hooks           | Runs lint and tests before any commit is made locally, making sure that only tested and quality code is committed
| Secure app via [helmet](https://github.com/helmetjs/helmet)           | Helmet helps secure Express apps by setting various HTTP headers. |


- CORS support via [cors](https://github.com/expressjs/cors)
- Uses [http-status](https://www.npmjs.com/package/http-status) to set http status code. It is recommended to use `httpStatus.INTERNAL_SERVER_ERROR` instead of directly using `500` when setting status code.
- Has `.editorconfig` which helps developers define and maintain consistent coding styles between different editors and IDEs. 

----------
Installation
-------------------
####Creating Firebase Account
After you clone or fork this, you must create Firebase account [here](https://firebase.google.com/) then create new project [firebase docs](https://firebase.google.com/docs/) and generate Firebase Admin [Secret Key](https://firebase.google.com/docs/admin/setup) and download or save your on project folder.
> **NOTE:** Paste and rename your .json file for firstime use to *firebaseServiceAccount.json*

####Create MongoDB Database
There is plenty of ways for creating mongodb database, but for development purpose i recomend using **FREE**  databases from [mLab.com](mLab.com). After you sign-up and create new databases watch for your database url, port and name. You will get database url prettymuch like this:
*You can insert in your .env folder*
> **DATABASE URL:** mongodb://USERNAME:PASSWORD@somelink.mlab.com:PORT/DATABASE_NAME
####Setting Up Environtment
Clone the repo:
```sh
git clone git@github.com/asyrafduyshart/node-express-firebase.git
cd node-express-firebase
```

Install yarn:
*This will install yarn package globally in your computer*
```js
npm install -g yarn
```

Install dependencies:
*Make sure you open your terminal where packege.json is, it basically replace npm install*
```sh
yarn
```

Set environment (vars):
*This will become your environtment file, watch for your DATABASE connect url here*

```sh
cp .env.example .env
```

Start server:
```sh
# Start server
yarn start

# Selectively set DEBUG env var to get logs
DEBUG=node-express-firebase:* yarn start
```
Refer [debug](https://www.npmjs.com/package/debug) to know how to selectively turn on logs.


Tests:
```sh
# Run tests written in ES6 
yarn test

# Run test along with code coverage
yarn test:coverage

# Run tests on file change
yarn test:watch

# Run tests enforcing code coverage (configured via .istanbul.yml)
yarn test:check-coverage
```

Lint:
```sh
# Lint code with ESLint
yarn lint

# Run lint on any file change
yarn lint:watch
```

Other gulp tasks:
```sh
# Wipe out dist and coverage directory
gulp clean

# Default task: Wipes out dist and coverage directory. Compiles using babel.
gulp
```
Conceptual Aside
-------------------
### What is [Firebase](https://firebase.google.com/)?

Firebase is a technology that permits you to make web applications with no server-side programming so that development turns out to be quicker and easier. With Firebase, we don't have to stress over-provisioning servers or building REST APIs with just a little bit of configuration; we can give Firebase a chance to take every necessary step: storing data, verifying users, and implementing access rules.

It supports the web, iOS, OS X, and Android clients. Applications using Firebase can just use and control data, without having to think about how data would be stored, and synchronized across various examples of the application in real time. There is no need to write server side code, or to deploy a complex server framework to get an app started with Firebase.
### What is [Express](https://expressjs.com/)?

Express.js, or simply Express, is a web application framework for Node.js, released as free and open-source software under the MIT License. It is designed for building web applications and APIs. It is the de facto standard server framework for Node.js.

### What is ECMAScript 6?
ECMAScript 6, also known as ECMAScript 2015, is the latest version of the ECMAScript standard.  ES6 is a significant update to the language, and the first update to the language since ES5 was standardized in 2009. Implementation of these features in major JavaScript engines is [underway now](http://kangax.github.io/es5-compat-table/es6/).

### What is [Yarn](https://yarnpkg.com/en/)?
Yarn is a new package manager that replaces the existing workflow for the npm client or other package managers while remaining compatible with the npm registry. It has the same feature set as existing workflows while operating faster, more securely, and more reliably.

### What is [gulp](http://gulpjs.com/)?
Gulp is a toolkit for automating painful or time-consuming tasks in your development workflow, so you can stop messing around and build something. 

- *Automation* - gulp is a toolkit that helps you automate painful or time-consuming tasks in your development workflow.
- *Platform-agnostic* - Integrations are built into all major IDEs and people are using gulp with PHP, .NET, Node.js, Java, and other platforms.
- *Strong Ecosystem* - Use npm modules to do anything you want + over 2000 curated plugins for streaming file transformations
- *Simple* - By providing only a minimal API surface, gulp is easy to learn and simple to use

### What is [ESLint](http://eslint.org/docs/about/)?
ESLint is an open source JavaScript linting utility originally created by Nicholas C. Zakas in June 2013. Code linting is a type of static analysis that is frequently used to find problematic patterns or code that doesn’t adhere to certain style guidelines. There are code linters for most programming languages, and compilers sometimes incorporate linting into the compilation process.

Debugging
-------------------

    TODO

License
-------
	The MIT License (MIT)

	Copyright (c) 2016-2017 Asyraf Duyshart
	
	Permission is hereby granted, free of charge, to any person obtaining a copy
	of this software and associated documentation files (the "Software"), to deal
	in the Software without restriction, including without limitation the rights
	to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	copies of the Software, and to permit persons to whom the Software is
	furnished to do so, subject to the following conditions:
	
	The above copyright notice and this permission notice shall be included in all
	copies or substantial portions of the Software.
	
	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
	SOFTWARE.

