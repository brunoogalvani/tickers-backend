# Tickers Backend

API desenvolvida em Node.js com Express para um sistema de eventos. Este backend permite criar, listar, atualizar e excluir eventos e usuários.

## Integrantes do projeto:

- **Allan Lucas Ogawa - RA: 824138863**
- **Arthur Nascimento Nabas de Oliveira - RA: 824132232**
- **Bruno Galvani Thezolin - RA: 82411888**
- **Brunno Luiz de Sousa Nepomuceno - RA: 82414197**
- **Danilo de Araujo Massimetti Maranha - RA: 824129587**
- **Paulo Messias Santos Filho - RA: 825162650**

## Tecnologias

- **Node.js**
- **Express**
- **Prisma ORM**
- **MongoDB Atlas**


## Funcionalidades

- **Listar eventos cadastrados**
- **Adicionar novo evento**
- **Atualizar informações de um evento**
- **Remover um evento**
- **Listar usuários**
- **Adicionar novo usuário**
- **Atualizar informações de um usuário**
- **Remover um usuário**

## Como rodar o projeto localmente

### Instalação

1. Clone o repositório:

```
git clone git@github.com:brunoogalvani/tickers-backend.git
```

2. Instale as dependências:

```
npm install
```

3. Configure as variáveis de ambiente criando um arquivo .env fora da pasta /src:

4. Rode as migrations do banco:

```
npx prisma generate
```

5. Inicie o servidor:

```
npm run dev
```

O servidor estará rodando em http://localhost:8080.
Para acessar a documentação da API, entre em http://localhost:8080/api-docs

# Deploy no Vercel

Este projeto possui deploy no Vercel.
Para acessá-lo, entre em https://tickers-backend.vercel.app/api-docs/
