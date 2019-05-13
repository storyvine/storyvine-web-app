console.log('process.env', process.env);

// ON_STARTUP: change bffUri for your one
export default {
  bffUri: process.env.CUSTOM_ENV === 'production' ? 'https://your-production-api' : 'https://staging.api.dotfund.com',
  localhostUri: 'http://localhost:8000',
};