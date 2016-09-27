# Filmstrip2

## Step by Step

### 1. Make sure you have the latest [node.js](https://nodejs.org), npm, angular-cli and firebase-tools installed.

**Update npm itself**

*On i sidenote, i highly recommend [Node Version Manager](https://github.com/creationix/nvm)*
```bash
npm install -g npm
```

**Install angular-cli and firebase-tools**
```bash
npm install -g angular-cli firebase-tools
```

### 2. Clone the project from Github

**SSH (You should be using SSH, if not get to it!)**
```bash
git clone git@github.com:LarsVonQualen/filmstrip2.git
```

**HTTPS Ugh...**
```bash
git clone https://github.com/LarsVonQualen/filmstrip2.git
```

### 3. Install dependencies

*Lets hope the Angular folks haven't messed anything up...*

```bash
cd filmstrip2
npm install
```

If you get a TypeError because something tries to access 'uid' on undefined, then try cleaning the npm cache and npm install again.

```bash
npm cache clean
npm install
```

### 4. Create a project on firebase

*Not strictly a necessecity, but the app will have trouble being awesome if you don't connect to Firebase*

[https://firebase.google.com/](https://firebase.google.com/)

Now you have to active authentication, we'll go with basic email/password authentication in this demo.

So go ahead and enable that in the Firebase Web Console.

### 5. Create an environment.ts and environment.prod.ts file

The Firebase config can be found in the Firebase Web Console.

**src/environment/environment.ts**
```typescript
import { AuthProviders, AuthMethods, FirebaseAuthConfig, FirebaseConfig } from 'angularfire2';

const firebaseConfig: FirebaseConfig = {
  apiKey: '<your-key>',
  authDomain: '<your-project-authdomain>',
  databaseURL: '<your-database-URL>',
  storageBucket: '<your-storage-bucket>',
  messagingSenderId: '<your-messaging-sender-id>'
};

const firebaseAuthConfig: FirebaseAuthConfig = {
  provider: AuthProviders.Password,
  method: AuthMethods.Password
};

export const environment = {
  // NOTICE THIS FLAG
  production: false,
  firebase: {
    config: firebaseConfig,
    authConfig: firebaseAuthConfig
  }
};
```

**src/environment/environment.prod.ts**
```typescript
import { AuthProviders, AuthMethods, FirebaseAuthConfig, FirebaseConfig } from 'angularfire2';

const firebaseConfig: FirebaseConfig = {
  apiKey: '<your-key>',
  authDomain: '<your-project-authdomain>',
  databaseURL: '<your-database-URL>',
  storageBucket: '<your-storage-bucket>',
  messagingSenderId: '<your-messaging-sender-id>'
};

const firebaseAuthConfig: FirebaseAuthConfig = {
  provider: AuthProviders.Password,
  method: AuthMethods.Password
};

export const environment = {
  // NOTICE THIS FLAG
  production: true,
  firebase: {
    config: firebaseConfig,
    authConfig: firebaseAuthConfig
  }
};
```

### 6. You're good to go!

**Development mode**
```bash
npm start
```

**Prod build and deployment to Firebase**
```bash
npm run deploy:prod
```

### 7. ????


### 8. Profit! 💰🤑💰🤑💰🤑💰🤑💰🤑💰🤑

Hit up [http://localhost:4200](http://localhost:4200)

# Angular CLI Readme

This project was generated with [angular-cli](https://github.com/angular/angular-cli) version 1.0.0-beta.15.

## Development server
Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive/pipe/service/class`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/). 
Before running the tests make sure you are serving the app via `ng serve`.

## Deploying to Github Pages

Run `ng github-pages:deploy` to deploy to Github Pages.

## Further help

To get more help on the `angular-cli` use `ng --help` or go check out the [Angular-CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
