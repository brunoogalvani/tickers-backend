export default {
    openapi: '3.0.0',
    info: {
        title: 'Tickers API',
        description: 'Essa API faz parte do projeto das matérias de <strong>Sistemas distribuídos e mobile</strong> e <strong>Usabilidade, desenvolvimento web, mobile e jogos</strong>.<br><br>Os integrantes do grupo são: <ul><li>Allan Lucas Ogawa - RA: 824138863</li><li>Arthur Nascimento Nabas de Oliveira - RA: 824132232</li><li>Bruno Galvani Thezolin - RA: 82411888</li><li>Brunno Luiz de Sousa Nepomuceno - RA: 82414197</li><li>Danilo de Araujo Massimetti Maranha - RA: 824129587</li><li>Paulo Messias Santos Filho - RA: 825162650</li></ul>',
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
        },
        {
            name: 'compras',
            description: 'Ações sobre as compras'
        }
    ],
    paths: {
        '/users': {
            get: {
                tags: ['users'],
                summary: 'Retorna uma lista com todos os usuários',
                responses: {
                    200: {description: 'Lista de usuários retornada'},
                    500: {description: 'Erro no servidor'}
                },
            },
            post: {
                tags: ['users'],
                summary: 'Cria um novo usuário',
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: {$ref: '#/components/schemas/user'}
                        }
                    }
                },
                responses: {
                    201: {description: 'Usuário criado'},
                    400: {description: 'Faltam dados obrigatórios ou o email já está sendo utilizado'},
                    500: {description: 'Erro no servidor'}
                },
            }
        },
        '/users/{userId}': {
            get: {
                tags: ['users'],
                summary: 'Retorna um usuário',
                parameters: [
                    {
                        name: 'userId',
                        in: 'path',
                        description: 'ID do usuário',
                        required: true,
                        schema: {type: 'string'}
                    }
                ],
                responses: {
                    200: {description: 'Usuário retornado',},
                    400: {description: 'ID é obrigatório'},
                    500: {description: 'Erro no servidor'}
                },
            },
            delete: {
                tags: ['users'],
                summary: 'Deleta um usuário',
                parameters: [
                    {
                        name: 'userId',
                        in: 'path',
                        description: 'ID do usuário',
                        required: true,
                        schema: {type: 'string'}
                    }
                ],
                responses: {
                    200: {description: 'Usuário deletado'},
                    400: {description: 'ID é obrigatório'},
                    404: {description: 'Usuário não encontrado'},
                    500: {description: 'Erro no servidor'}
                },
            },
            patch: {
                tags: ['users'],
                summary: 'Atualiza um usuário',
                parameters: [
                    {
                        name: 'userId',
                        in: 'path',
                        description: 'ID do usuário',
                        required: true,
                        schema: {type: 'string'}
                    }
                ],
                requestBody: {
                    content: {
                        'application/json': {
                            schema: {$ref: '#/components/schemas/userUpdate'}
                        }
                    }
                },
                responses: {
                    200: {description: 'Usuário atualizado'},
                    400: {description: 'ID é obrigatório'},
                    404: {description: 'Usuário não encontrado'},
                    409: {description: 'Email já está em uso'},
                    500: {description: 'Erro no servidor'}
                },
            }
        },
        '/users/login': {
            post: {
                tags: ['users'],
                summary: 'Realiza a autenticação de um usuário',
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: {$ref: '#/components/schemas/userLogin'}
                        }
                    }
                },
                responses: {
                    200: {description: 'Usuário autenticado'},
                    400: {description: 'Faltam dados obrigatórios'},
                    401: {description: 'Credenciais inválidas'},
                    404: {description: 'Usuário não encontrado'},
                    500: {description: 'Erro no servidor'}
                },
            }
        },
        '/users/{userId}/eventos': {
            get: {
                tags: ['users'],
                summary: 'Retorna uma lista dos eventos criados de um usuário',
                parameters: [
                    {
                        name: 'userId',
                        in: 'path',
                        description: 'ID do usuário',
                        required: true,
                        schema: {type: 'string'}
                    }
                ],
                responses: {
                    200: {description: 'Eventos do usuário retornados'},
                    400: {description: 'ID é obrigatório'},
                    404: {description: 'Usuário não encontrado'},
                    500: {description: 'Erro no servidor'}
                },
            },
        },
        '/users/{userId}/compras': {
            get: {
                tags: ['users'],
                summary: 'Retorna uma lista das compras feitas por um usuário',
                parameters: [
                    {
                        name: 'userId',
                        in: 'path',
                        description: 'ID do usuário',
                        required: true,
                        schema: {type: 'string'}
                    }
                ],
                responses: {
                    200: {description: 'Compras do usuário retornadas'},
                    400: {description: 'ID é obrigatório'},
                    404: {description: 'Usuário não encontrado'},
                    500: {description: 'Erro no servidor'}
                },
            }
        },
        '/users/{userId}/favoritos': {
            get: {
                tags: ['users'],
                summary: 'Retorna uma lista dos eventos favoritos do usuário',
                parameters: [
                    {
                        name: 'userId',
                        in: 'path',
                        description: 'ID do usuário',
                        required: true,
                        schema: {type: 'string'}
                    }
                ],
                responses: {
                    200: {description: 'Eventos favoritos retornados'},
                    400: {description: 'ID é obrigatório'},
                    500: {description: 'Erro no servidor'}
                },
            },
            post: {
                tags: ['users'],
                summary: 'Adiciona um evento aos favoritos do usuário',
                parameters: [
                    {
                        name: 'userId',
                        in: 'path',
                        description: 'ID do usuário',
                        required: true,
                        schema: {type: 'string'}
                    }
                ],
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    eventoId: {type: 'string'}
                                },
                                required: ['eventoId']
                            }
                        }
                    }
                },
                responses: {
                    201: {description: 'Evento adicionado aos favoritos'},
                    400: {description: 'IDs do usuário e do evento são obrigatórios'},
                    404: {description: 'Usuário/evento não encontrado'},
                    409: {description: 'Evento já está nos favoritos'},
                    500: {description: 'Erro no servidor'}
                },
            }
        },
        '/users/{userId}/favoritos/{eventoId}': {
            delete: {
                tags: ['users'],
                summary: 'Remove um evento dos favoritos do usuário',
                parameters: [
                    {
                        name: 'userId',
                        in: 'path',
                        description: 'ID do usuário',
                        required: true,
                        schema: {type: 'string'}
                    },
                    {
                        name: 'eventoId',
                        in: 'path',
                        description: 'ID do evento',
                        required: true,
                        schema: {type: 'string'}
                    }
                ],
                responses: {
                    200: {description: 'Evento removido dos favoritos'},
                    400: {description: 'IDs do usuário e do evento são obrigatórios'},
                    404: {description: 'Favorito não encontrado'},
                    500: {description: 'Erro no servidor'}
                },
            }
        },
        '/users/{userId}/favoritos/check/{eventoId}': {
            get: {
                tags: ['users'],
                summary: 'Verifica se um evento faz parte dos favoritos do usuário',
                parameters: [
                    {
                        name: 'userId',
                        in: 'path',
                        description: 'ID do usuário',
                        required: true,
                        schema: {type: 'string'}
                    },
                    {
                        name: 'eventoId',
                        in: 'path',
                        description: 'ID do evento',
                        required: true,
                        schema: {type: 'string'}
                    }
                ],
                responses: {
                    200: {description: 'Verificação realizada'},
                    400: {description: 'IDs do usuário e do evento são obrigatórios'},
                    500: {description: 'Erro no servidor'}
                },
            }
        },
        '/eventos': {
            get: {
                tags:['eventos'],
                summary: 'Retorna uma lista com todos os eventos',
                responses: {
                    200: {description: 'Lista de eventos retornada'},
                    500: {description: 'Erro no servidor'}
                }
            },
            post: {
                tags:['eventos'],
                summary: 'Cria um novo evento',
                requestBody: {
                    required: true,
                    content: {
                        'multipart/form-data': {
                            schema: {$ref: '#/components/schemas/evento'}
                        }
                    }
                },
                responses: {
                    201: {description: 'Evento criado'},
                    400: {description: 'Faltam dados obrigatórios'},
                    409: {description: 'Já existe um evento com este nome'},
                    500: {description: 'Erro no servidor'}
                },
            }
        },
        '/eventos/{eventoId}': {
            get: {
                tags: ['eventos'],
                summary: 'Retorna um evento',
                parameters: [
                    {
                        name: 'eventoId',
                        in: 'path',
                        description: 'ID do evento',
                        required: true,
                        schema: {type: 'string'}
                    }
                ],
                responses: {
                    200: {description: 'Evento retornado'},
                    400: {description: 'ID é obrigatório'},
                    404: {description: 'Evento não encontrado'},
                    500: {description: 'Erro no servidor'}
                },
            },
            delete: {
                tags: ['eventos'],
                summary: 'Deleta um evento',
                parameters: [
                    {
                        name: 'eventoId',
                        in: 'path',
                        description: 'ID do evento',
                        required: true,
                        schema: {type: 'string'}
                    }
                ],
                responses: {
                    200: {description: 'Evento deletado'},
                    400: {description: 'ID é obrigatório'},
                    404: {description: 'Evento não encontrado'},
                    500: {description: 'Erro no servidor'}
                },
            },
            patch: {
                tags: ['eventos'],
                summary: 'Atualiza um evento',
                parameters: [
                    {
                        name: 'eventoId',
                        in: 'path',
                        description: 'ID do evento',
                        required: true,
                        schema: {type: 'string'}
                    }
                ],
                requestBody: {
                    content: {
                        'multipart/form-data': {
                            schema: {$ref: '#/components/schemas/eventoUpdate'}
                        }
                    }
                },
                responses: {
                    200: {description: 'Evento atualizado'},
                    400: {description: 'ID é obrigatório'},
                    404: {description: 'Evento não encontrado'},
                    500: {description: 'Erro no servidor'}
                },
            }
        },
        '/eventos/{eventoId}/cancelar': {
            patch: {
                tags: ['eventos'],
                summary: 'Cancela um evento',
                parameters: [
                    {
                        name: 'eventoId',
                        in: 'path',
                        description: 'ID do evento',
                        required: true,
                        schema: {type: 'string'}
                    }
                ],
                responses: {
                    200: {description: 'Evento cancelado'},
                    400: {description: 'ID é obrigatório ou evento já cancelado/encerrado'},
                    404: {description: 'Evento não encontrado'},
                    500: {description: 'Erro no servidor'}
                },
            }
        },
        '/eventos/{eventoId}/compras': {
            get: {
                tags: ['eventos'],
                summary: 'Retorna uma lista com as compras de um evento',
                parameters: [
                    {
                        name: 'eventoId',
                        in: 'path',
                        description: 'ID do evento',
                        required: true,
                        schema: {type: 'string'}
                    }
                ],
                responses: {
                    200: {description: 'Lista de compras do evento retornada'},
                    400: {description: 'ID é obrigatório'},
                    404: {description: 'Evento não encontrado'},
                    500: {description: 'Erro no servidor'}
                },
            }
        },
        '/compras': {
            get: {
                tags: ['compras'],
                summary: 'Retorna uma lista com todas as compras',
                responses: {
                    200: {description: 'Lista de compras retornada'},
                    500: {description: 'Erro no servidor'}
                },
            },
            post: {
                tags: ['compras'],
                summary: 'Cria uma nova compra',
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: {$ref: '#/components/schemas/compra'}
                        }
                    }
                },
                responses: {
                    201: {description: 'Compra realizada'},
                    400: {description: 'Faltam dados obrigatórios, evento indisponível para compra ou quantidade de ingressos indisponível'},
                    404: {description: 'Usuário/evento não encontrado'},
                    500: {description: 'Erro no servidor'}
                },
            }
        },
        '/compras/{compraId}': {
            get: {
                tags: ['compras'],
                summary: 'Retorna uma compra',
                parameters: [
                    {
                        name: 'compraId',
                        in: 'path',
                        description: 'ID da compra',
                        required: true,
                        schema: {type: 'string'}
                    }
                ],
                responses: {
                    200: {description: 'Compra retornada'},
                    400: {description: 'ID é obrigatório'},
                    404: {description: 'Compra não encontrada'},
                    500: {description: 'Erro no servidor'}
                },
            }
        }
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
                    dataInicio: {type: 'string'},
                    horaInicio: {type: 'string'},
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
                    imagemCapa: {type: 'string', format: 'binary', nullable: true},
                    criadoPorId: {type: 'string'},
                    qtdIngressos: {type: 'number'}
                },
                required: ['titulo', 'descricao', 'categoria', 'dataInicio', 'horaInicio', 'local', 'preco', 'criadoPorId', 'qtdIngressos']
            },
            eventoUpdate: {
                type: 'object',
                properties: {
                    titulo: {type: 'string', nullable: true},
                    descricao: {type: 'string', nullable: true},
                    categoria: {type: 'string', nullable: true},
                    dataInicio: {type: 'string', nullable: true},
                    horaInicio: {type: 'string', nullable: true},
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
                    imagemCapa: {type: 'string', format: 'binary', nullable: true},
                    criadoPorId: {type: 'string', nullable: true},
                    qtdIngressos: {type: 'number', nullable: true}
                },
            },
            compra: {
                type: 'object',
                properties: {
                    userId: {type: 'string'},
                    eventoId: {type: 'string'},
                    qtd: {type: 'number'}
                },
                required: ['userId', 'eventoId', 'qtd']
            }
        }
    }
};