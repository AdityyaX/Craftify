import { Stack, Region } from 'contentstack';

console.log('REACT_APP_CONTENTSTACK_REGION:', process.env.REACT_APP_CONTENTSTACK_REGION);

const config = {
  api_key: process.env.REACT_APP_CONTENTSTACK_API_KEY,
  delivery_token: process.env.REACT_APP_CONTENTSTACK_DELIVERY_TOKEN,
  environment: process.env.REACT_APP_CONTENTSTACK_ENVIRONMENT,
  preview_host: process.env.REACT_APP_CONTENTSTACK_PREVIEW_HOST,
  preview_token: process.env.REACT_APP_CONTENTSTACK_PREVIEW_TOKEN,
  app_host: process.env.REACT_APP_CONTENTSTACK_APP_HOST,
  api_host: process.env.REACT_APP_CONTENTSTACK_API_HOST,
  live_preview: process.env.REACT_APP_CONTENTSTACK_LIVE_PREVIEW === 'true',
  live_edit_tags: process.env.REACT_APP_CONTENTSTACK_LIVE_EDIT_TAGS === 'true',
  region:'EU',
};

console.log('Contentstack Config:', config);

const stack = new Stack(config);

export default stack;
