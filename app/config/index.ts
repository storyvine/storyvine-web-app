console.log('process.env', process.env);
console.log('process.env.API_URL', process.env.API_URL);
console.log('process.env.CUSTOM_ENV', process.env.CUSTOM_ENV);

// TODO, fixme
// const apiUrl = process.env.API_URL ? process.env.CUSTOM_ENV : 'http://localhost:3001';
const apiUrl = 'https://storyvine-staging.herokuapp.com';

export default {
  bffUri: apiUrl,
  localhostUri: 'http://localhost:8000',
};
