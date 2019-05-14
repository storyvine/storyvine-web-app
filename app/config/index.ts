console.log('process.env', process.env);

const apiUrl = process.env.API_URL ? process.env.CUSTOM_ENV : 'http://localhost:3001';

export default {
  bffUri: apiUrl,
  localhostUri: 'http://localhost:8000',
};
