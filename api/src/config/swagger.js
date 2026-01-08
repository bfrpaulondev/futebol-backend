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
          bearerFormat: 'JWT'
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
            preferredPosition: { type: 'string', example: 'atacante' },
            skills: {
              type: 'object',
              properties: {
                shooting: { type: 'number', example: 7 },
                passing: { type: 'number', example: 8 },
                dribbling: { type: 'number', example: 6 },
                defense: { type: 'number', example: 5 },
                physical: { type: 'number', example: 7 },
                goalkeeping: { type: 'number', example: 3 }
              }
            },
            stats: {
              type: 'object',
              properties: {
                gamesPlayed: { type: 'number', example: 15 },
                wins: { type: 'number', example: 10 },
                draws: { type: 'number', example: 2 },
                losses: { type: 'number', example: 3 },
                goals: { type: 'number', example: 12 },
                assists: { type: 'number', example: 8 },
                mvpCount: { type: 'number', example: 3 }
              }
            }
          }
        },
        Game: {
          type: 'object',
          properties: {
            _id: { type: 'string' },
            date: { type: 'string', format: 'date-time' },
            location: { type: 'string', example: 'Quadra Central' },
            status: { type: 'string', enum: ['scheduled', 'in_progress', 'completed'], example: 'scheduled' },
            attendees: {
              type: 'array',
              items: { type: 'string' }
            },
            maxPlayers: { type: 'number', example: 12 },
            teams: {
              type: 'object',
              properties: {
                team1: { type: 'array', items: { type: 'string' } },
                team2: { type: 'array', items: { type: 'string' } }
              }
            },
            result: {
              type: 'object',
              properties: {
                team1Score: { type: 'number' },
                team2Score: { type: 'number' },
                mvp: { type: 'string' }
              }
            }
          }
        },
        Transaction: {
          type: 'object',
          properties: {
            _id: { type: 'string' },
            type: { type: 'string', enum: ['income', 'expense'], example: 'expense' },
            amount: { type: 'number', example: 50.00 },
            description: { type: 'string', example: 'Aluguel da quadra' },
            category: { type: 'string', example: 'aluguel' },
            date: { type: 'string', format: 'date-time' },
            createdBy: { type: 'string' }
          }
        },
        Suggestion: {
          type: 'object',
          properties: {
            _id: { type: 'string' },
            title: { type: 'string', example: 'Comprar bolas novas' },
            description: { type: 'string', example: 'As bolas atuais estão muito gastas' },
            amount: { type: 'number', example: 150.00 },
            category: { type: 'string', example: 'equipamento' },
            status: { type: 'string', enum: ['pending', 'approved', 'rejected'], example: 'pending' },
            votes: {
              type: 'array',
              items: { type: 'string' }
            },
            createdBy: { type: 'string' },
            comments: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  user: { type: 'string' },
                  text: { type: 'string' },
                  createdAt: { type: 'string', format: 'date-time' }
                }
              }
            }
          }
        },
        Message: {
          type: 'object',
          properties: {
            _id: { type: 'string' },
            user: { type: 'string' },
            text: { type: 'string', example: 'Quem vai no jogo de sábado?' },
            type: { type: 'string', enum: ['general', 'game'], example: 'general' },
            readBy: { type: 'array', items: { type: 'string' } },
            reactions: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  user: { type: 'string' },
                  emoji: { type: 'string', example: '👍' }
                }
              }
            },
            createdAt: { type: 'string', format: 'date-time' }
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
            message: { type: 'string', example: 'Operação realizada com sucesso' }
          }
        }
      }
    },
    security: [
      {
        bearerAuth: []
      }
    ]
  },
  apis: ['./src/routes/*.js']
};

const swaggerSpec = swaggerJsdoc(options);

// Adicionar documentação manual para todas as rotas
swaggerSpec.paths = {
  '/health': {
    get: {
      tags: ['Health'],
      summary: 'Health check',
      security: [],
      responses: {
        200: {
          description: 'API is running',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  success: { type: 'boolean', example: true },
                  message: { type: 'string', example: 'API is running' },
                  environment: { type: 'string', example: 'production' }
                }
              }
            }
          }
        }
      }
    }
  },
  '/api/auth/register': {
    post: {
      tags: ['Authentication'],
      summary: 'Register new user',
      security: [],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              required: ['name', 'email', 'password'],
              properties: {
                name: { type: 'string', example: 'João Silva' },
                email: { type: 'string', example: 'joao@futebol.com' },
                password: { type: 'string', example: 'senha123456' }
              }
            }
          }
        }
      },
      responses: {
        201: {
          description: 'User created successfully',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  success: { type: 'boolean', example: true },
                  token: { type: 'string' },
                  user: { $ref: '#/components/schemas/User' }
                }
              }
            }
          }
        }
      }
    }
  },
  '/api/auth/login': {
    post: {
      tags: ['Authentication'],
      summary: 'Login user',
      security: [],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              required: ['email', 'password'],
              properties: {
                email: { type: 'string', example: 'joao@futebol.com' },
                password: { type: 'string', example: 'senha123456' }
              }
            }
          }
        }
      },
      responses: {
        200: {
          description: 'Login successful',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  success: { type: 'boolean', example: true },
                  token: { type: 'string' },
                  user: { $ref: '#/components/schemas/User' }
                }
              }
            }
          }
        }
      }
    }
  },
  '/api/auth/me': {
    get: {
      tags: ['Authentication'],
      summary: 'Get current user',
      security: [{ bearerAuth: [] }],
      responses: {
        200: {
          description: 'User data',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  success: { type: 'boolean', example: true },
                  user: { $ref: '#/components/schemas/User' }
                }
              }
            }
          }
        }
      }
    }
  },
  '/api/auth/logout': {
    post: {
      tags: ['Authentication'],
      summary: 'Logout user',
      security: [{ bearerAuth: [] }],
      responses: {
        200: {
          description: 'Logout successful',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/Success' }
            }
          }
        }
      }
    }
  },
  '/api/games/next': {
    get: {
      tags: ['Games'],
      summary: 'Get next scheduled game',
      security: [{ bearerAuth: [] }],
      responses: {
        200: {
          description: 'Next game',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  success: { type: 'boolean', example: true },
                  game: { $ref: '#/components/schemas/Game' }
                }
              }
            }
          }
        }
      }
    }
  },
  '/api/games/{id}': {
    get: {
      tags: ['Games'],
      summary: 'Get game by ID',
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          name: 'id',
          in: 'path',
          required: true,
          schema: { type: 'string' }
        }
      ],
      responses: {
        200: {
          description: 'Game data',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  success: { type: 'boolean', example: true },
                  game: { $ref: '#/components/schemas/Game' }
                }
              }
            }
          }
        }
      }
    }
  },
  '/api/games/{id}/confirm': {
    post: {
      tags: ['Games'],
      summary: 'Confirm presence in game',
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          name: 'id',
          in: 'path',
          required: true,
          schema: { type: 'string' }
        }
      ],
      responses: {
        200: {
          description: 'Presence confirmed',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/Success' }
            }
          }
        }
      }
    }
  },
  '/api/games/{id}/cancel': {
    post: {
      tags: ['Games'],
      summary: 'Cancel presence in game',
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          name: 'id',
          in: 'path',
          required: true,
          schema: { type: 'string' }
        }
      ],
      responses: {
        200: {
          description: 'Presence cancelled',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/Success' }
            }
          }
        }
      }
    }
  },
  '/api/games/{id}/draw': {
    post: {
      tags: ['Games'],
      summary: 'Draw teams for game (AI powered)',
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          name: 'id',
          in: 'path',
          required: true,
          schema: { type: 'string' }
        }
      ],
      responses: {
        200: {
          description: 'Teams drawn successfully',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  success: { type: 'boolean', example: true },
                  game: { $ref: '#/components/schemas/Game' }
                }
              }
            }
          }
        }
      }
    }
  },
  '/api/games/{id}/result': {
    put: {
      tags: ['Games'],
      summary: 'Update game result (Admin only)',
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          name: 'id',
          in: 'path',
          required: true,
          schema: { type: 'string' }
        }
      ],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                team1Score: { type: 'number', example: 5 },
                team2Score: { type: 'number', example: 3 },
                mvp: { type: 'string', example: '507f1f77bcf86cd799439011' }
              }
            }
          }
        }
      },
      responses: {
        200: {
          description: 'Result updated',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/Success' }
            }
          }
        }
      }
    }
  },
  '/api/games': {
    post: {
      tags: ['Games'],
      summary: 'Create new game (Admin only)',
      security: [{ bearerAuth: [] }],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              required: ['date', 'location'],
              properties: {
                date: { type: 'string', format: 'date-time', example: '2026-01-15T20:00:00Z' },
                location: { type: 'string', example: 'Quadra Central' },
                maxPlayers: { type: 'number', example: 12 }
              }
            }
          }
        }
      },
      responses: {
        201: {
          description: 'Game created',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  success: { type: 'boolean', example: true },
                  game: { $ref: '#/components/schemas/Game' }
                }
              }
            }
          }
        }
      }
    }
  },
  '/api/users/profile': {
    get: {
      tags: ['Users'],
      summary: 'Get own profile',
      security: [{ bearerAuth: [] }],
      responses: {
        200: {
          description: 'Profile data',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  success: { type: 'boolean', example: true },
                  user: { $ref: '#/components/schemas/User' }
                }
              }
            }
          }
        }
      }
    },
    put: {
      tags: ['Users'],
      summary: 'Update own profile',
      security: [{ bearerAuth: [] }],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                name: { type: 'string' },
                preferredPosition: { type: 'string' },
                skills: {
                  type: 'object',
                  properties: {
                    shooting: { type: 'number' },
                    passing: { type: 'number' },
                    dribbling: { type: 'number' },
                    defense: { type: 'number' },
                    physical: { type: 'number' },
                    goalkeeping: { type: 'number' }
                  }
                }
              }
            }
          }
        }
      },
      responses: {
        200: {
          description: 'Profile updated',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/Success' }
            }
          }
        }
      }
    }
  },
  '/api/users/avatar': {
    post: {
      tags: ['Users'],
      summary: 'Upload avatar',
      security: [{ bearerAuth: [] }],
      requestBody: {
        required: true,
        content: {
          'multipart/form-data': {
            schema: {
              type: 'object',
              properties: {
                avatar: {
                  type: 'string',
                  format: 'binary'
                }
              }
            }
          }
        }
      },
      responses: {
        200: {
          description: 'Avatar uploaded',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  success: { type: 'boolean', example: true },
                  avatar: { type: 'string', example: 'https://example.com/avatar.jpg' }
                }
              }
            }
          }
        }
      }
    }
  },
  '/api/users/leaderboard': {
    get: {
      tags: ['Users'],
      summary: 'Get leaderboard',
      security: [{ bearerAuth: [] }],
      responses: {
        200: {
          description: 'Leaderboard data',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  success: { type: 'boolean', example: true },
                  leaderboard: {
                    type: 'array',
                    items: { $ref: '#/components/schemas/User' }
                  }
                }
              }
            }
          }
        }
      }
    }
  },
  '/api/users': {
    get: {
      tags: ['Users'],
      summary: 'Get all users (Admin only)',
      security: [{ bearerAuth: [] }],
      responses: {
        200: {
          description: 'List of users',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  success: { type: 'boolean', example: true },
                  users: {
                    type: 'array',
                    items: { $ref: '#/components/schemas/User' }
                  }
                }
              }
            }
          }
        }
      }
    }
  },
  '/api/users/{id}': {
    get: {
      tags: ['Users'],
      summary: 'Get user by ID',
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          name: 'id',
          in: 'path',
          required: true,
          schema: { type: 'string' }
        }
      ],
      responses: {
        200: {
          description: 'User data',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  success: { type: 'boolean', example: true },
                  user: { $ref: '#/components/schemas/User' }
                }
              }
            }
          }
        }
      }
    },
    put: {
      tags: ['Users'],
      summary: 'Update user (Admin only)',
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          name: 'id',
          in: 'path',
          required: true,
          schema: { type: 'string' }
        }
      ],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                name: { type: 'string' },
                email: { type: 'string' },
                role: { type: 'string', enum: ['player', 'admin'] },
                skills: { type: 'object' },
                stats: { type: 'object' }
              }
            }
          }
        }
      },
      responses: {
        200: {
          description: 'User updated',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/Success' }
            }
          }
        }
      }
    },
    delete: {
      tags: ['Users'],
      summary: 'Delete user (Admin only)',
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          name: 'id',
          in: 'path',
          required: true,
          schema: { type: 'string' }
        }
      ],
      responses: {
        200: {
          description: 'User deleted',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/Success' }
            }
          }
        }
      }
    }
  },
  '/api/finance/balance': {
    get: {
      tags: ['Finance'],
      summary: 'Get club balance',
      security: [{ bearerAuth: [] }],
      responses: {
        200: {
          description: 'Balance data',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  success: { type: 'boolean', example: true },
                  balance: { type: 'number', example: 1500.50 },
                  totalIncome: { type: 'number', example: 3000.00 },
                  totalExpenses: { type: 'number', example: 1499.50 }
                }
              }
            }
          }
        }
      }
    }
  },
  '/api/finance/transactions': {
    get: {
      tags: ['Finance'],
      summary: 'Get all transactions',
      security: [{ bearerAuth: [] }],
      responses: {
        200: {
          description: 'List of transactions',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  success: { type: 'boolean', example: true },
                  transactions: {
                    type: 'array',
                    items: { $ref: '#/components/schemas/Transaction' }
                  }
                }
              }
            }
          }
        }
      }
    },
    post: {
      tags: ['Finance'],
      summary: 'Create transaction (Admin only)',
      security: [{ bearerAuth: [] }],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              required: ['type', 'amount', 'description', 'category'],
              properties: {
                type: { type: 'string', enum: ['income', 'expense'], example: 'expense' },
                amount: { type: 'number', example: 50.00 },
                description: { type: 'string', example: 'Aluguel da quadra' },
                category: { type: 'string', example: 'aluguel' }
              }
            }
          }
        }
      },
      responses: {
        201: {
          description: 'Transaction created',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  success: { type: 'boolean', example: true },
                  transaction: { $ref: '#/components/schemas/Transaction' }
                }
              }
            }
          }
        }
      }
    }
  },
  '/api/finance/suggestions': {
    get: {
      tags: ['Finance'],
      summary: 'Get all suggestions',
      security: [{ bearerAuth: [] }],
      responses: {
        200: {
          description: 'List of suggestions',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  success: { type: 'boolean', example: true },
                  suggestions: {
                    type: 'array',
                    items: { $ref: '#/components/schemas/Suggestion' }
                  }
                }
              }
            }
          }
        }
      }
    },
    post: {
      tags: ['Finance'],
      summary: 'Create suggestion',
      security: [{ bearerAuth: [] }],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              required: ['title', 'description', 'amount', 'category'],
              properties: {
                title: { type: 'string', example: 'Comprar bolas novas' },
                description: { type: 'string', example: 'As bolas atuais estão muito gastas' },
                amount: { type: 'number', example: 150.00 },
                category: { type: 'string', example: 'equipamento' }
              }
            }
          }
        }
      },
      responses: {
        201: {
          description: 'Suggestion created',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  success: { type: 'boolean', example: true },
                  suggestion: { $ref: '#/components/schemas/Suggestion' }
                }
              }
            }
          }
        }
      }
    }
  },
  '/api/finance/suggestions/{id}/vote': {
    post: {
      tags: ['Finance'],
      summary: 'Vote on suggestion',
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          name: 'id',
          in: 'path',
          required: true,
          schema: { type: 'string' }
        }
      ],
      responses: {
        200: {
          description: 'Vote added',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/Success' }
            }
          }
        }
      }
    },
    delete: {
      tags: ['Finance'],
      summary: 'Remove vote from suggestion',
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          name: 'id',
          in: 'path',
          required: true,
          schema: { type: 'string' }
        }
      ],
      responses: {
        200: {
          description: 'Vote removed',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/Success' }
            }
          }
        }
      }
    }
  },
  '/api/finance/suggestions/{id}/status': {
    put: {
      tags: ['Finance'],
      summary: 'Update suggestion status (Admin only)',
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          name: 'id',
          in: 'path',
          required: true,
          schema: { type: 'string' }
        }
      ],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              required: ['status'],
              properties: {
                status: { type: 'string', enum: ['pending', 'approved', 'rejected'], example: 'approved' }
              }
            }
          }
        }
      },
      responses: {
        200: {
          description: 'Status updated',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/Success' }
            }
          }
        }
      }
    }
  },
  '/api/finance/suggestions/{id}/comments': {
    post: {
      tags: ['Finance'],
      summary: 'Add comment to suggestion',
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          name: 'id',
          in: 'path',
          required: true,
          schema: { type: 'string' }
        }
      ],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              required: ['text'],
              properties: {
                text: { type: 'string', example: 'Concordo, precisamos muito!' }
              }
            }
          }
        }
      },
      responses: {
        200: {
          description: 'Comment added',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/Success' }
            }
          }
        }
      }
    }
  },
  '/api/chat/messages': {
    get: {
      tags: ['Chat'],
      summary: 'Get messages',
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          name: 'type',
          in: 'query',
          schema: { type: 'string', enum: ['general', 'game'] }
        },
        {
          name: 'gameId',
          in: 'query',
          schema: { type: 'string' }
        }
      ],
      responses: {
        200: {
          description: 'List of messages',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  success: { type: 'boolean', example: true },
                  messages: {
                    type: 'array',
                    items: { $ref: '#/components/schemas/Message' }
                  }
                }
              }
            }
          }
        }
      }
    },
    post: {
      tags: ['Chat'],
      summary: 'Send message',
      security: [{ bearerAuth: [] }],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              required: ['text', 'type'],
              properties: {
                text: { type: 'string', example: 'Quem vai no jogo?' },
                type: { type: 'string', enum: ['general', 'game'], example: 'general' },
                gameId: { type: 'string' }
              }
            }
          }
        }
      },
      responses: {
        201: {
          description: 'Message sent',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  success: { type: 'boolean', example: true },
                  message: { $ref: '#/components/schemas/Message' }
                }
              }
            }
          }
        }
      }
    }
  },
  '/api/chat/messages/{id}': {
    delete: {
      tags: ['Chat'],
      summary: 'Delete message',
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          name: 'id',
          in: 'path',
          required: true,
          schema: { type: 'string' }
        }
      ],
      responses: {
        200: {
          description: 'Message deleted',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/Success' }
            }
          }
        }
      }
    }
  },
  '/api/chat/messages/{id}/read': {
    post: {
      tags: ['Chat'],
      summary: 'Mark message as read',
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          name: 'id',
          in: 'path',
          required: true,
          schema: { type: 'string' }
        }
      ],
      responses: {
        200: {
          description: 'Message marked as read',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/Success' }
            }
          }
        }
      }
    }
  },
  '/api/chat/messages/{id}/reactions': {
    post: {
      tags: ['Chat'],
      summary: 'Add reaction to message',
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          name: 'id',
          in: 'path',
          required: true,
          schema: { type: 'string' }
        }
      ],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              required: ['emoji'],
              properties: {
                emoji: { type: 'string', example: '👍' }
              }
            }
          }
        }
      },
      responses: {
        200: {
          description: 'Reaction added',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/Success' }
            }
          }
        }
      }
    }
  },
  '/api/chat/messages/{id}/reactions/{emoji}': {
    delete: {
      tags: ['Chat'],
      summary: 'Remove reaction from message',
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          name: 'id',
          in: 'path',
          required: true,
          schema: { type: 'string' }
        },
        {
          name: 'emoji',
          in: 'path',
          required: true,
          schema: { type: 'string' }
        }
      ],
      responses: {
        200: {
          description: 'Reaction removed',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/Success' }
            }
          }
        }
      }
    }
  }
};


export default swaggerSpec;
