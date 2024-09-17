module.exports = [
  'strapi::errors',
  {
    name: "strapi::security",
    config: {
      contentSecurityPolicy: {
        useDefaults: true,
        directives: {
          "script-src": ["'self'", "*.tiny.cloud", "https:"],
          "connect-src": ["'self'", "*.tiny.cloud", "blob:", "*.strapi.io"],
          "img-src": [
            "'self'",
          
            "*.tiny.cloud",
            "data:",
            "blob:",
            "dl.airtable.com",
            "strapi.io",
            "s3.amazonaws.com",
            "cdn.jsdelivr.net",
            "storage.googleapis.com",
          ],
          "style-src": [
            "'self'",
            "'unsafe-inline'",
            "*.tiny.cloud",
          ],
          "font-src": ["'self'",  "*.tiny.cloud"],
          "media-src": ["'self'", "data:", "blob:", "storage.googleapis.com"],
        },
        upgradeInsecureRequests: null,
      },
    },
  },
  'strapi::cors',
  'strapi::poweredBy',
  'strapi::logger',
  'strapi::query',
  'strapi::body',
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
];
