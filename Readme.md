# OOO Admin Boilerplate

Production-ready React + Webpack architecture implemented with JWT authorization. Perceived performance and development experience are key factors in this setup. You can use this code base for learning or to scaffold your mission-critical project.

## Key concepts:

- [x] [Webpack 3 Tree shaking](http://moduscreate.com/webpack-2-tree-shaking-configuration/)
- [x] [PRPL pattern](https://www.slideshare.net/grgur/prpl-pattern-with-webpack-and-react) with minimal application core
- [x] Automatic code splitting with React Router 4 and `import()` statement
- [x] Automatic common chunk bundling
- [x] CSS modules
- [x] Snapshot testing with Jest
- [x] Flow static typing. Check out this [guide to using Flow in the project](https://github.com/ModusCreateOrg/budgeting-sample-app-webpack2/blob/master/docs/flow.md).
- [x] Performance budgets in Webpack 3
- [x] React 16 Error Boundaries

## Performance

1. **Minimal application core.** Vendor chunk is not used. Instead, it's bundled in the app core. The app core is actually very small, containing just the code needed to bootstrap the app.
2. **Common code is a chunk.** Webpack figure out which bundles we reuse in chunks and create a common chunk that's also asyncronous. 
3. **Redux module injection**. Each chunk contains respective views _and_ redux modules. Yes, that means reducers, action creators, actions - are all dynamically injected as we navigate through routes. That adds to the _minimal application core_ concept and PRPL pattern. 
4. **Pre-caching**. Service Workers pre-cache resources so the browser can access them as soon as the user needs to.

## Performance Budgets
Target is 300kB for the entrypoint and 300kB for all other assets. This is how it's set up [webpack configuration]

```js
performance: {
  maxAssetSize: 300000,
  maxEntrypointSize: 300000,
  hints: 'warning',
},
```

Adding lots of extra code to the entry chunk might cause the build (`yarn run build`) process to show a warning.

Note that running webpack dev server in production mode (`yarn run prod`) will trigger this warning because of the additional dev server code injected in the app. This code will not show in regular production builds.

## Service Workers
Service workers are enabled only when serving static files, not through webpack-dev-server. Here's how you can test service worker functionality:
1. Run `yarn run build` (or `npm run build`) to build the app
2. Run `yarn run serve` (or `npm run serve`) to serve the app on [localhost:3000](http://localhost:3000)
3. Run a new instance of Chrome with disabled security (because localhost is not on https): 

**OS X**

```bash
open -a "Google Chrome" --args --user-data-dir=/tmp/unsafe --unsafely-treat-insecure-origin-as-secure=http://localhost
```

**Linux**

```bash
/path/to/chrome --user-data-dir=/tmp/unsafe --unsafely-treat-insecure-origin-as-secure=http://localhost
```

**Windows**

```bash
chrome.exe --user-data-dir=c:\temp --unsafely-treat-insecure-origin-as-secure=http://localhost
```

4. Now you can observe network traffic in the Network tab or SW activity in Application > Service Workers in Developer Tools

## Stack
The app was built using these aweseome technologies

- [x] [Webpack 3.5](https://webpack.github.io)
- [x] [React 16.x](https://facebook.github.io/react/)
- [x] [Redux](http://redux.js.org/)
- [x] [Antd Design](https://ant.design/docs/react/introduce)
- [x] [Sagas](https://github.com/redux-saga/redux-saga)
- [x] [React Router 4](https://reacttraining.com/react-router/)
- [x] [Reselect](https://github.com/reactjs/reselect/)
- [x] [Babel](https://babeljs.io/)
- [x] [Prettier](https://github.com/prettier/prettier)
- [x] [Jest](https://facebook.github.io/jest/)
- [x] [Flow](https://flow.org/en/)
- [x] [Yarn](https://yarnpkg.com/en/)
- [x] [Ducks](https://github.com/erikras/ducks-modular-redux/) 🐣
- [x] [Sass](http://sass-lang.com/)
- [x] [Autoprefixer](https://github.com/postcss/autoprefixer)

## Yarn Scripts

* `yarn` - install dependencies
* `yarn start` - run development server
* `yarn run prod` - run production server
* `yarn run build` - build app for deployment
* `yarn run serve` - serve previously built app using pushstate server
* `yarn run lint` - lint check
* `yarn run lint:fix` - lint check + autofixes + prettify code with __prettier__
* `yarn run test` - run test suite
* `yarn run test:fix` - run test suite watching files for changes
* `yarn run flow` - run flow type checking
* `yarn run update-types` - update flow library definitions

## NPM Scripts
Similar to Yarn, really...

* `npm install` - install dependencies
* `npm start` - run development server
* `npm run prod` - run production server
* `npm run build` - build app for deployment
* `npm run serve` - serve previously built app using pushstate server
* `npm run lint` - lint check
* `npm run lint:fix` - lint check + autofixes + prettify code with __prettier__
* `npm run test` - run test suite
* `npm run test:fix` - run test suite watching files for changes
* `npm run flow` - run flow type checking
* `npm run update-types` - update flow library definitions

## License - MIT
