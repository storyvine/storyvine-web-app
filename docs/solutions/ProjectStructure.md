# Project Structure
    . 
    ├── ...
    ├── app
        ├──components - in case several modules share them, "dumb" components, no fetching
        ├──contatiners - in case several modules share them, "smart" components, fetching
        ├──modules
        |  ├──components - 'dumb' components, no fetching
        |  ├──contatiners - 'smart' components, fetching
        |  ├──store - includes graphql + react.context stuff for module
        |  ├──types - in case several components share them
        |  ├──utils
        |  index.js - always export only one file, in case you need more - create separate module
        ├──store - in case several modules share state
        ├──types - in case several modules share types
        ├──utils - in case several modules share utils
        ├──routes - shows app structure + responsible for code splitting
        ├──theme - global css
        ├──config - global app config
    ├──docs - you are here!
    ├──jest - tests
    │   └── ...                 
    └── ...

## Why we have index.js file + Component.js file
It is done to search easily for a file with CMD+P by it's name and have distinct names when multiple files opened (and not 4 index.js files at once).
For the same reason .scss files are called "Something.scss" and not "style.scss".
