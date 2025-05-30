export default {
    openapi: '3.0.0',
    info: {
        title: 'Tickers API',
        description: 'Essa API faz parte do projeto das matérias de <strong>Sistemas distribuídos e mobile</strong> e <strong>Usabilidade, desenvolvimento web, mobile e jogos</strong>.<br><br>Os integrantes do grupo são: <ul><li>Allan Lucas Ogawa - RA: 824138863</li><li>Arthur Nascimento Nabas de Oliveira - RA: 824132232</li><li>Bruno Galvani Thezolin - RA: 82411888</li><li>Brunno Luiz de Sousa Nepomuceno - RA: 82414197</li><li>Danilo de Araujo Massimetti Maranha - RA: 824129587</li><li>Bruno Galvani Thezolin - RA: 82411888</li><li>Paulo Messias Santos Filho - RA: 825162650</li></ul>',
        version: '1.0.0',
    },
    servers: [{url: 'https://tickers-backend.vercel.app'}, {url: 'http://localhost:8080'}],
    tags: [
        {
            name: 'users',
            description: 'Ações sobre os usuários'
        },
        {
            name: 'eventos',
            description: 'Ações sobre os eventos'
        }
    ],
    paths: {
        '/users': {
            get: {
                tags: ['users'],
                summary: 'Retorna uma lista com todos os usuários',
                responses: {
                    200: {
                        description: 'Lista de usuários retornada'
                    }
                },
            },
            post: {
                tags: ['users'],
                summary: 'Cria um novo usuário',
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: {
                                $ref: '#/components/schemas/user'
                            }
                        }
                    }
                },
                responses: {
                    201: {
                        description: 'Usuário criado'
                    },
                    400: {
                        description: 'Erro na requisição'
                    },
                    500: {
                        description: 'Erro no servidor'
                    }
                },
            }
        },
        '/users/{userId}': {
            get: {
                tags: ['users'],
                summary: 'Retorna um usuário de acordo com o ID',
                "parameters": [
                    {
                        "name": "userId",
                        "in": "path",
                        "description": "ID do usuário",
                        "required": true,
                        "type": "integer",
                        "format": "int64"
                    }
                ],
                responses: {
                    200: {
                        description: 'Usuário retornado',
                    }
                },
            },
            delete: {
                tags: ['users'],
                summary: 'Deleta um usuário de acordo com o ID',
                "parameters": [
                    {
                        "name": "userId",
                        "in": "path",
                        "description": "ID do usuário",
                        "required": true,
                        "type": "integer",
                        "format": "int64"
                    }
                ],
                responses: {
                    200: {
                        description: 'Usuário deletado'
                    },
                    500: {
                        description: 'Erro no servidor'
                    }
                },
            },
            patch: {
                tags: ['users'],
                summary: 'Atualiza um usuário',
                "parameters": [
                    {
                        "name": "userId",
                        "in": "path",
                        "description": "ID do usuário",
                        "required": true,
                        "type": "integer",
                        "format": "int64"
                    }
                ],
                requestBody: {
                    content: {
                        'application/json': {
                            schema: {
                                $ref: '#/components/schemas/userUpdate'
                            }
                        }
                    }
                },
                responses: {
                    200: {
                        description: 'Usuário atualizado'
                    },
                    400: {
                        description: 'ID é obrigatório'
                    },
                    404: {
                        description: 'Usuário não encontrado'
                    },
                    500: {
                        description: 'Erro no servidor'
                    }
                },
            }
        },
        '/users/login': {
            post: {
                tags: ['users'],
                summary: 'Realiza a autenticação de um usuário a partir do email e da senha',
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: {
                                $ref: '#/components/schemas/userLogin'
                            }
                        }
                    }
                },
                responses: {
                    200: {
                        description: 'Usuário autenticado'
                    },
                    400: {
                        description: 'Credenciais inválidas'
                    },
                    500: {
                        description: 'Erro no servidor'
                    }
                },
            }
        },
        '/eventos': {
            get: {
                tags:['eventos'],
                summary: 'Retorna uma lista com todos os eventos',
                responses: {
                    200: {
                        description: 'Lista de eventos retornada',
                    },
                    500: {
                        description: 'Erro no servidor'
                    }
                }
            },
            post: {
                tags:['eventos'],
                summary: 'Cria um novo evento',
                requestBody: {
                    required: true,
                    content: {
                        'multipart/form-data': {
                            schema: {
                                $ref: '#/components/schemas/evento'
                            }
                        }
                    }
                },
                responses: {
                    201: {
                        description: 'Evento criado'
                    },
                    400: {
                        description: 'Erro na requisição'
                    },
                    500: {
                        description: 'Erro no servidor'
                    }
                },
            }
        },
        '/eventos/{eventoId}': {
            delete: {
                tags: ['eventos'],
                summary: 'Deleta um evento de acordo com o ID',
                "parameters": [
                    {
                        "name": "eventoId",
                        "in": "path",
                        "description": "ID do evento",
                        "required": true,
                        "type": "integer",
                        "format": "int64"
                    }
                ],
                responses: {
                    200: {
                        description: 'Evento deletado'
                    },
                    500: {
                        description: 'Erro no servidor'
                    }
                },
            },
            patch: {
                tags: ['eventos'],
                summary: 'Atualiza um evento',
                "parameters": [
                    {
                        "name": "eventoId",
                        "in": "path",
                        "description": "ID do evento",
                        "required": true,
                        "type": "integer",
                        "format": "int64"
                    }
                ],
                requestBody: {
                    content: {
                        'multipart/form-data': {
                            schema: {
                                $ref: '#/components/schemas/eventoUpdate'
                            }
                        }
                    }
                },
                responses: {
                    200: {
                        description: 'Evento atualizado'
                    },
                    400: {
                        description: 'ID é obrigatório'
                    },
                    404: {
                        description: 'Evento não encontrado'
                    },
                    500: {
                        description: 'Erro no servidor'
                    }
                },
            }
        },
    },
    components: {
        schemas: {
            user: {
                type: 'object',
                properties: {
                    nome: {type: 'string'},
                    email: {type: 'string'},
                    telefone: {type: 'string'},
                    role: {type: 'string', enum: ['user', 'admin', 'promoter']},
                    cep: {type: 'string'},
                    senha: {type: 'string'}
                },
                required: ['nome', 'email', 'telefone', 'role', 'cep', 'senha']
            },
            userUpdate: {
                type: 'object',
                properties: {
                    nome: {type: 'string', nullable: true},
                    email: {type: 'string', nullable: true},
                    telefone: {type: 'string', nullable: true},
                    role: {type: 'string', nullable: true},
                    cep: {type: 'string', nullable: true},
                    senha: {type: 'string', nullable: true}
                },
            },
            userLogin: {
                type: 'object',
                properties: {
                    email: {type: 'string'},
                    senha: {type: 'string'}
                },
                required: ['email', 'senha']
            },
            evento: {
                type: 'object',
                properties: {
                    titulo: {type: 'string'},
                    descricao: {type: 'string'},
                    categoria: {type: 'string'},
                    dataInicioISO: {type: 'string', format: 'date-time'},
                    dataInicio: {type: 'string'},
                    dataFim: {type: 'string', nullable: true},
                    local: {
                        type: 'object',
                        properties: {
                            nome: {type: 'string'},
                            endereco: {type: 'string'},
                            cidade: {type: 'string'},
                            estado: {type: 'string'},
                            cep: {type: 'string'}
                        },
                        required: ['nome', 'endereco', 'cidade', 'estado', 'cep']
                    },
                    preco: {type: 'number'},
                    imagemCapa: {type: 'string', format: 'binary'}
                },
                required: ['titulo', 'descricao', 'categoria', 'dataInicioISO', 'dataInicio', 'local', 'preco', 'imagemCapa']
            },
            eventoUpdate: {
                type: 'object',
                properties: {
                    titulo: {type: 'string', nullable: true},
                    descricao: {type: 'string', nullable: true},
                    categoria: {type: 'string', nullable: true},
                    dataInicioISO: {type: 'string', format: 'date-time', nullable: true},
                    dataInicio: {type: 'string', nullable: true},
                    dataFim: {type: 'string', nullable: true},
                    local: {
                        type: 'object',
                        properties: {
                            nome: {type: 'string', nullable: true},
                            endereco: {type: 'string', nullable: true},
                            cidade: {type: 'string', nullable: true},
                            estado: {type: 'string', nullable: true},
                            cep: {type: 'string', nullable: true}
                        },
                    },
                    preco: {type: 'number', nullable: true},
                    imagemCapa: {type: 'string', format: 'binary', nullable: true}
                },
            }
        }
    }
};