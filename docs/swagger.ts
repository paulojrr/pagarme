import swaggerJsDoc from 'swagger-jsdoc';

export const options = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'API Pagar.me',
      description: 'Documentation of API Pagar.me',
      version: '1.0.0',
    },
    servers: [
      {
        url: 'http://localhost:3000',
      },
    ],
    paths: {
      '/transaction': {
        post: {
          summary: 'Create a transaction',
          description: 'This route receives an object with transaction data and returns the created transaction.',
          requestBody: {
            description: 'Object with transaction data',
            required: true,

            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/TransactionRequestBody',
                },
              },
            },
          },
          responses: {
            '200': {
              description: 'Return created transaction',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/TransactionResponseBody',
                  },
                },
              },
            },
            '400': {
              description: 'invalid parameters',
            },
          },
        },
      },
      '/transaction/available': {
        get: {
          summary: 'Get available balance',
          description: 'This route returns the available balance.',
          "parameters": [
            {
              "name": "cpf",
              "in": "query",
              "description": "CPF numbers (only numbers)",
              "required": true,
              "schema": {
                "type": "string",
                "pattern": "^[0-9]{11}$"
              }
            }
          ],
          responses: {
            '200': {
              description: 'Return available balance',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      available: {
                        type: 'number',
                        example: 97,
                        description: 'This is balance available.'
                      },
                    },
                  },
                },
              },
            },
            '400': {
              description: 'invalid parameters',
            },
          },
        },
      },
      '/transaction/waitingFunds': {
        get: {
          summary: 'Get waiting funds balance',
          description: 'This route returns the waiting funds balance.',
          parameters: [
            {
              "name": "cpf",
              "in": "query",
              "description": "CPF numbers (only numbers)",
              "required": true,
              "schema": {
                "type": "string",
                "pattern": "^[0-9]{11}$"
              }
            }
          ],
          responses: {
            '200': {
              description: 'Return waiting funds balance',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      waitingFunds: {
                        type: 'number',
                        example: 97,
                        description: 'This is waiting funds available.'
                      },
                    },
                  },
                },
              },
            },
            '400': {
              description: 'invalid parameters',
            },
          },
        },
      },
    },
    components: {
      schemas: {
        TransactionRequestBody: {
          type: 'object',
          properties: {
            value: {
              type: 'number',
              example: 100.0,
              description: 'The transaction amount.'
            },
            cpf: {
              type: 'string',
              example: '079.430.010-36',
              description: 'The customer CPF (Brazilian identification number).'
            },
            description: {
              type: 'string',
              example: 'Test',
              description: 'A brief description of the transaction.'
            },
            paymentMethod: {
              type: 'string',
              enum: ["credit_card", "debit_card"],
              example: "credit_card",
              description: 'The payment method used for this transaction.'
            },
            cardNumber: {
              type: 'string',
              example: '4280085985817828',
              description: 'The card number used for credit or debit card payments.'
            },
            cardHolderName: {
              type: 'string',
              example: 'John Doe',
              description: 'The name of the card holder.'
            },
            validFrom: {
              type: 'string',
              format: 'date-time',
              example: '2020-01-01T00:00:00Z',
              description: 'The date when the credit/debit card became valid.'
            },
            verificationNumber: {
              type: 'string',
              example: '123',
              description: 'The verification number (CVV) of the credit/debit card.'
            }
          }
        },
        TransactionResponseBody: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              example: "669efe18-d690-461d-bc17-4b9d13c121f7",
              description: 'the transaction id.'
            },
            value: {
              type: 'number',
              example: 100.0,
              description: 'The transaction amount.'
            },
            cpf: {
              type: 'string',
              example: '079.430.010-36',
              description: 'The customer CPF (Brazilian identification number).'
            },
            description: {
              type: 'string',
              example: 'Test',
              description: 'A brief description of the transaction.'
            },
            paymentMethod: {
              type: 'string',
              enum: ["credit_card", "debit_card"],
              example: "credit_card",
              description: 'The payment method used for this transaction.'
            },
            cardNumber: {
              type: 'string',
              example: '7828',
              description: 'The card number used for credit or debit card payments.'
            },
            cardHolderName: {
              type: 'string',
              example: 'John Doe',
              description: 'The name of the card holder.'
            },
            validFrom: {
              type: 'string',
              format: 'date-time',
              example: '2020-01-01T00:00:00Z',
              description: 'The date when the credit/debit card became valid.'
            },
            verificationNumber: {
              type: 'string',
              example: '123',
              description: 'The verification number (CVV) of the credit/debit card.'
            },
            payablesId: {
              type: 'string',
              example: "87ae5870-8930-4e45-b0e6-b4924ed43fb1",
              description: 'the payablesId id.'
            }
          }
        },
      },
    },
  },
  apis: ['../src/infra/api/rest/*.ts'],
}

export const specs = swaggerJsDoc(options);



