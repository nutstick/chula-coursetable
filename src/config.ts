if (process.env.BROWSER) {
  throw new Error('Do not import `config.js` from inside the client-side code.');
}

export const port = process.env.PORT || 3000;
export const host = process.env.WEBSITE_HOSTNAME || `localhost:${port}`;

export const mongodb = process.env.MONGODB || `chulacoursetable`;

// default locale is the first one
export const locales = ['en-US', 'cs-CZ', 'th-TH'];

export const analytics = {

  // https://analytics.google.com/
  google: {
    trackingId: 'UA-64309227-1',
  },

};

export const auth = {

  jwt: { secret: process.env.JWT_SECRET || 'React Starter Kit' },

  // https://developers.facebook.com/
  facebook: {
    id: process.env.FACEBOOK_APP_ID || '196824377496129',
    secret: process.env.FACEBOOK_APP_SECRET || '41850d422ed0c257ff83aefaa412fd76',
  },

  // https://cloud.google.com/console/project
  google: {
    id: process.env.GOOGLE_CLIENT_ID || '251410730550-ahcg0ou5mgfhl8hlui1urru7jn5s12km.apps.googleusercontent.com',
    secret: process.env.GOOGLE_CLIENT_SECRET || 'Y8yR9yZAhm9jQ8FKAL8QIEcd',
  },

  // https://apps.twitter.com/
  twitter: {
    key: process.env.TWITTER_CONSUMER_KEY || 'Ie20AZvLJI2lQD5Dsgxgjauns',
    secret: process.env.TWITTER_CONSUMER_SECRET || 'KTZ6cxoKnEakQCeSpZlaUCJWGAlTEBJj0y2EMkUBujA7zWSvaQ',
  },

};
