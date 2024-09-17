module.exports = ({ env }) => ({
  // Other plugin configurations...

  'import-export-entries': {
    enabled: true,
    config: {
     
    },
  },
  

  'documentation': {
    enabled: true,
    config: {
      openapi: {
        info: {
          title: 'Import-Export Entries API Documentation',
          description: 'API documentation for import and export entries feature in Strapi.',
          version: '1.0.0',
          contact: {
            name: 'Support Team',
            email: 'support@example.com',
          },
        },
        components: {
          securitySchemes: {
            bearerAuth: {
              type: 'http',
              scheme: 'bearer',
              bearerFormat: 'JWT',
            },
          },
        },
        security: [
          {
            bearerAuth: [],
          },
        ],
        tags: [
          {
            name: 'Import-Export Entries',
            description: 'APIs related to importing and exporting entries.',
          },
        ],
        paths: {
          '/import-export-entries/import': {
            post: {
              tags: ['Import-Export Entries'],
              summary: 'Import entries into the system',
              operationId: 'importEntries',
              requestBody: {
                content: {
                  'application/json': {
                    schema: {
                      type: 'object',
                      properties: {
                        data: { type: 'string' },
                      },
                      required: ['data'],
                    },
                  },
                },
              },
              responses: {
                200: {
                  description: 'Import successful',
                },
                400: {
                  description: 'Bad request',
                },
              },
            },
          },
          '/import-export-entries/export': {
            get: {
              tags: ['Import-Export Entries'],
              summary: 'Export entries from the system',
              operationId: 'exportEntries',
              responses: {
                200: {
                  description: 'Export successful',
                  content: {
                    'application/json': {
                      schema: {
                        type: 'array',
                        items: { type: 'object' },
                      },
                    },
                  },
                },
                400: {
                  description: 'Bad request',
                },
              },
            },
          },
        },
      },
    },
  },
});
