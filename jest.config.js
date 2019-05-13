module.exports = {
  setupFiles: ['<rootDir>/jest/requestAnimationFrame.js', '<rootDir>/jest/setupTests.js'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$',
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
    '\\.(gql|graphql)$': 'jest-transform-graphql',

    // Transform file imports into file names
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/jest/fileTransformer.js',
  },
  moduleDirectories: ['node_modules', 'app'],
  moduleNameMapper: {
    // Use proxy to mock CSS Modules. Lookups on the styles object will be returned as-is
    // (e.g., styles.foobar === 'foobar')
    '\\.(css|scss|less)$': 'identity-obj-proxy',
  },
};
