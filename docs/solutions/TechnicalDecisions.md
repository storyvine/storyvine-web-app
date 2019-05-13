# Technical Decisions:
- Framework: **React**
- Styling Framework: **Ant Design**
- Data Layer: **Apollo**
- Unit Tests: **Jest**
- E2E Tests: **Codecept**
- Additional Tools:
    - **Flow** - static type checker
    - **Stylyguidist** - help in documentation


## Why we use Ant
Ant is good match for this project, as it allows us to build pretty fast. The project doesn't need a lot of custom behaviour so drawbacks of Ant is not that harmfull. Sometimes it can become tricky though, in this case you should consider:
- asking for changes in design
- writting to Ant in github
- creating custom component (worst case).

## How we do styling
We prefer using SCSS for styling our components, not writing css in js, when possible.
**Naming convention** for styles is as follows: .Component__Some_Part__Inner_Part; See the example of scss below.
In src/theme you can find following files:
- **_variables.scss** - file with variables for colors, breakpoints, layout sizes.
- **variables.js** - same variables as above, in case there is a need to use them in .js file
- **ant-vars.less** - file with configuration for ant styling
- **main.scss** - global styles

We agreed to use global variables from _variables.scss file to create local variables right in .scss file you work on, for example:
```scss
// Header.scss
@import '_variables.scss';
$header-button-background-color: $greyLight;

.Header {
    &__Button {
        background-color: $header-button-background-color;
    }
}
```

## What we use for data storage (sharing state between components)?
* **TL;DR:** Apollo Storage - React16 Context - Component State
* We use Apollo for fetching data from BE and caching them. As Apollo v2 is decoupled from Redux, at the start we tried apollo-link-state for local state management in order to store everything in **Apollo Storage**.
* However it's api appeared to be pretty unhandy to use, so we tried new **React Context** api from React ^16.4 (which lays behind of Redux) and it worked perfectly fine for our needs.
* In case project grows and we will feel the need in more advanced handling of data storage we will consider coming to Redux.
* **Component State** is used for storing component related data that do not have to be shared with other components, always use it in case you do not need to share state farther.

## Why we use apollo + gql
TL;DR: Because it fast to build and reliable to use. We get a crazy amount of features out of the box and are comfortable in communication with the BE.
- [GraphQL tutorial](https://www.howtographql.com/)
- [Apollo tutorial](https://dev-blog.apollodata.com/full-stack-react-graphql-tutorial-582ac8d24e3b)

- [GraphQL vs REST unopinionated](https://philsturgeon.uk/api/2017/01/24/graphql-vs-rest-overview/)
- [GraphQL vs REST opinionated](https://www.sitepoint.com/rest-2-0-graphql/)
- [Apollo vs Relay unopinionated](https://medium.com/@codazeninc/choosing-a-graphql-client-apollo-vs-relay-9398dde5363a)

## When we use class vs stateless component
We agreed to use "ES6 Class" components in case of need for the state in component.
* There was a discussion "ES6 Class vs enhanced stateless component" for such cases, but we came to agreement Classes look cleaner and more self-explanatory, especially for new developers.
* In case you do not need state in component - use stateless component (just a function).
Useful discussion over the topic in other team is [here](https://github.com/rainforestapp/frontend-conventions/issues/19) 

## How we handle errors / exceptions
- Separate parts of application should be wrapped with [ErrorBoundary](https://github.com/oakslab/dot-fund-investorsportal/tree/master/app/components/ErrorBoundary) to not kill whole app in production in case of uncaught exception and to show helpful error message in development mode.
- In case any error could occure (for example unsuccessfull api request) we should be ready to show it to user with Ant message.error().
- Always think about what error should be shown as message and what as overlay (depending on context).

## What we use for tests:
Unit Tests: **Jest**
- Cover with tests all business logic cases and [do it properly](https://medium.com/selleo/testing-react-components-best-practices-2f77ac302d12)
- Cover with snapshot tests what possible, [do it right](https://medium.com/@luisvieira_gmr/snapshot-testing-react-components-with-jest-best-practices-dd1585b2b93d)

E2E Tests: **Codecept**
- [It has cool API](https://codecept.io/)
- Discuss cases to cover with PMs and QA team

## How we use Flow:
**TODO**
[Using Flow tool](../blob/master/docs/tools/flow.md)

## How we use Stylyguidist:
We are using Styleguidlist to improve the quality of our documentation, by showing component props and description.
**[More about writing feature documentation](../blob/master/docs/solutions/WritingDocumentation.md)**

## How we deploy
**TL;DR:** we are using Travis and Google Cloud Platform.
* **[More about deployment](https://github.com/oakslab/dot-deployment)**



