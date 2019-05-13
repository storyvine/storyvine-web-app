# OOO-ADMIN-BOILERPLATE

## NPM Scripts

- `npm install` - install dependencies
- `npm run develop` - run development server
- `npm run prod` - run production server
- `npm run build` - build app for deployment
- `npm run lint:fix` - lint check + autofixes + prettify code with **prettier**
- `npm run test` - run test suite
- **[More npm scripts](./docs/tools/npm.md)**

## TODO on project setup:

- Search for ON_STARTUP comments and address them:
  - app/config/index.js - change bffUri
  - app/index.js - change sentry url and uncomment it
  - app/store/app - adjust .graphql files to your project
  - app/theme - adjust color scheme to your project
  - app/images - change logos and favicon
  - app/modules/Login/containers/UserAuth - change email to contact support
- Update [CI setup](./docs/CI.md)
- Update Readme.md - change project name and remove "TODO on project setup" section
- Drink a cup of coffee/tea and enjoy your life :-)

## Table of Contents

- [Features Documentation](./docs/features/TODO.md)
- [Project Structure](./docs/solutions/ProjectStructure.md)
- [Technical Decisions](./docs/solutions/TechnicalDecisions.md)
- [Feature Checklist](./docs/solutions/FeatureChecklist.md)
- [Writing Documentation](./docs/solutions/WritingDocumentation.md)

## Additional tips

- Checkout unit (components/MenuLink, utils/format) and snapshot (all components) tests examples. Set up E2E to test critical flows as it is done in [this example](https://github.com/oakslab/e2e-travis-example).
- Components are typed using TypeScript [how to work with it](./docs/tools/typescript)
- [Setup CI](./docs/CI.md) if you haven't done it before
- Take some inspiration (or just move to your repo) common features like [Notifications](./examples/Notifications) or [Two Factor Auth](./examples/TwoFA)
- [Utils](./app/utils) provide bunch of enhancements for you, use them!
- [React Context api usage example](./app/store/sidebar) is used for local state management. You can easily change it to [Redux](https://redux.js.org/) or [Apollo-link-state](https://github.com/apollographql/apollo-link-state). These examples can give you some ideas over what will work best for you: [Context way](https://jsfiddle.net/j7vhrdmw/), [Redux way](https://jsfiddle.net/dL2hsfc8/), [Apollo-link-state way](https://jsfiddle.net/ugr6j7o0/1/).
- Need some package updates? Check if they haven't been done to boilerplate yet, if not ask why and maybe [prepare PR](./docs/Contribution)
