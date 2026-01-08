import swaggerJsdoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Futebol API',
      version: '1.0.0',
      description: 'API completa para gestão de clube de futsal com autenticação JWT, Socket.io e IA para sorteio de times',
      contact: {
        name: 'API Support',
        url: 'https://github.com/bfrpaulondev/futebol-backend'
      }
    },
    servers: [
      {
        url: 'http://localhost:5000',
        description: 'Development server'
      },
      {
        url: 'https://futebol-api-6d10.onrender.com',
        description: 'Production server'
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description: 'Insira o token JWT obtido após login'
        }
      },
      schemas: {
        User: {
          type: 'object',
          properties: {
            _id: { type: 'string', example: '507f1f77bcf86cd799439011' },
            name: { type: 'string', example: 'João Silva' },
            email: { type: 'string', example: 'joao@futebol.com' },
            role: { type: 'string', enum: ['player', 'admin'], example: 'player' },
            avatar: { type: 'string', example: 'https://example.com/avatar.jpg' },
            skills: {
              type: 'object',
              properties: {
                passing: { type: 'number', example: 8 },
                shooting: { type: 'number', example: 7 },
                defense: { type: 'number', example: 6 },
                speed: { type: 'number', example: 9 },
                dribbling: { type: 'number', example: 8 },
                stamina: { type: 'number', example: 7 }
              }
            },
            stats: {
              type: 'object',
              properties: {
                gamesPlayed: { type: 'number', example: 15 },
                wins: { type: 'number', example: 10 },
                losses: { type: 'number', example: 5 },
                mvps: { type: 'number', example: 3 },
                goals: { type: 'number', example: 12 }
              }
            }
          }
        },
        Game: {
          type: 'object',
          properties: {
            _id: { type: 'string' },
            date: { type: 'string', format: 'date-time' },
            location: { type: 'string', example: 'Ginásio Municipal' },
            status: { type: 'string', enum: ['scheduled', 'in_progress', 'completed'], example: 'scheduled' },
            attendees: {
              type: 'array',
              items: { type: 'string' }
            },
            maxPlayers: { type: 'number', example: 12 },
            teams: {
              type: 'object',
              properties: {
                teamA: { type: 'array', items: { type: 'string' } },
                teamB: { type: 'array', items: { type: 'string' } }
              }
            }
          }
        },
        Transaction: {
          type: 'object',
          properties: {
            _id: { type: 'string' },
            type: { type: 'string', enum: ['income', 'expense'], example: 'income' },
            amount: { type: 'number', example: 50.00 },
            description: { type: 'string', example: 'Mensalidade de jogador' },
            category: { type: 'string', example: 'Mensalidade' },
            date: { type: 'string', format: 'date-time' },
            createdBy: { type: 'string' }
          }
        },
        Error: {
          type: 'object',
          properties: {
            success: { type: 'boolean', example: false },
            message: { type: 'string', example: 'Erro ao processar requisição' }
          }
        },
        Success: {
          type: 'object',
          properties: {
            success: { type: 'boolean', example: true },
            message: { type: 'string', example: 'Operação realizada com sucesso' },
            data: { type: 'object' }
          }
        }
      }
    },
    security: [{
      bearerAuth: []
    }]
  },
  apis: ['./src/routes/*.js', './src/server.js']
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;
