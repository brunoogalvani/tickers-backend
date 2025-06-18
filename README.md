# Tickers Backend

API desenvolvida em Node.js com Express para gerenciamento de tickers de ações. Este backend permite criar, listar, atualizar e excluir tickers, além de buscar dados atualizados sobre ações na bolsa de valores.

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
git clone https://github.com/brunoogalvani/tickers-backend.git
```

2. Instale as dependências:

```
npm install
```

3. Configure as variáveis de ambiente criando um arquivo .env fora da pasta /src:

```
DATABASE_URL="mongodb+srv://brunnolsn:EJv5V1zsXPTuIV8U@tickers.cwguffk.mongodb.net/Tickers?retryWrites=true&w=majority&appName=Tickers"
CLOUDINARY_URL=cloudinary://763427534844265:74gaMlwRGJEQCm939fAe30n9-7s@dexmww3sm
CLOUDINARY_CLOUD_NAME=dexmww3sm
CLOUDINARY_API_KEY=763427534844265
CLOUDINARY_API_SECRET=74gaMlwRGJEQCm939fAe30n9-7s
```

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
