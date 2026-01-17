# 🔐 Locksmith

## 📃 Sobre o LockSmith

Locksmith é uma API de autenticação robusta, desenvolvida seguindo boas práticas de arquitetura de software e segurança. O projeto foi construído para ser escalável e seguro, utilizando as tecnologias mais modernas do ecossistema Node.js.

O sistema implementa autenticação via JWT (JSON Web Token) com estratégia de Refresh Tokens via Cookies HttpOnly, prevenindo ataques comuns como XSS.

## 💻 Tecnologias

- **Linguagem:** TypeScript
- **Runtime:** Node.js (v24.12.0)
- **Framework:** Express
- **Database:** PostgreSQL
- **ORM:** Prisma
- **Validação:** Zod
- **Segurança:** Bcrypt (Hashing) & JWT
- **DevOps:** Docker & Docker Compose

## 📦 Instalação

### 🏃🏽‍♂️‍➡️ Modo Rápido (Recomendado)

#### Pré requisitos

- Docker
- Docker Compose

#### Como instalar

Configure o CORS no server.ts, adicionando as origins que podem acessar a API.

Rode os seguinte comandos no terminal.

```bash
cp .env.example .env
docker compose up -d --build
```

Observação: Altere os campos dos .env caso queria mudar as credenciais.

### 🖐🏽 Modo Manual

#### Pré requisitos

- Node v24.12.0
- Banco de Dados PostgreSQL

#### Como instalar

Configure o CORS no server.ts, adicionando as origins que podem acessar a API.

Rode os seguinte comandos no terminal.

```bash
npm install (Ou yarn)
npx prisma generate
cp .env.example .env
```

Em seguida, mude as credenciais do .env pelas do seu banco de dados e o JWT_SECRET por uma string hexadecimal.

E então rode os seguinte comandos

```bash
npm run build
npm start
```

Com isso a API estará rodando na porta 5000 do seu computador

# 🧪 Testes

Na raiz no projeto tem os arquivos de rotas do [Bruno](./BrunoRotas.json) e do [Postman](./PostmanRotas.json), você pode importa-las nos aplicativos.

<details>
<summary><h1>🛤️ Rotas</h1></summary>

## 🔑 Auth

### Register

POST http://localhost:5000/auth/register

#### Request

Body

```JSON
{
  "name": "Usuário",
  "email": "usuario@email.com",
  "password": "Senhaforte@123",
  "confirmPassword": "Senhaforte@123"
}
```

#### Response

Status: 201 Created

```JSON
{
  "message": "User Usuário created successfuly"
}
```

### Login

POST http://localhost:5000/auth/login

#### Request

Body

```JSON
{
  "email": "seuemail@gmail.com",
  "password": "senhaForte@123"
}
```

#### Response

Status: 200 OK

```JSON
{
  "message": "Bem vindo de volta",
  "accessToken": "Seu token JWT"
}
```

### Logout

POST http://localhost:5000/auth/logout

#### Request

Não tem um body para request, apenas usa o opaque token enviado por Cookies HttpOnly

#### Response

Status: 204 No Content

```JSON

```

### Refresh Token

POST http://localhost:5000/auth/refresh-token

#### Request

Não tem um body para request, apenas usa o opaque token enviado por Cookies HttpOnly

#### Response

Status: 200 OK

```JSON
{
  "message": "Access Token renovado",
  "accessToken": "Seu novo Token JWT"
}
```

## 👥 Users

### Show Profile

GET http://localhost:5000/users/me

#### Request

Não tem um body para request, apenas usa o JWT Token enviado pelo Header como Bearer Token.

#### Response

Status: 200 OK

```JSON
{
  "body": {
    "id": "86b917d2-1b0a-47d3-a097-94a9d0f52e05",
    "email": "usuario@email.com",
    "name": "Usuário",
    "createdAt": "2026-01-17T14:09:26.055Z"
  }
}
```

# 📱 Entre em Contato

</details>

<div align="center">
  <a href="https://github.com/GabrielUS19">
    <img src="https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white" target="_blank">
  </a>
  <a href="https://www.linkedin.com/in/gabriel-uchoa-de-sousa-9911662ba/">
    <img src="https://img.shields.io/badge/-LinkedIn-%230077B5?style=for-the-badge&logo=linkedin&logoColor=white" target="_blank">
  </a> 
  <a href="mailto:gabrieluchoa2607@gmail.com">
    <img src="https://img.shields.io/badge/Gmail-D14836?style=for-the-badge&logo=gmail&logoColor=white" target="_blank">
  </a>
</div>
