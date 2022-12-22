# Streaming de video

API RestFul implementada com Node.js, Express.js e Typescript.

## Principais tecnologias utilizadas

- Typescript - Superset do JavaScript, que adiciona tipagens à mesma, possibilitando uma melhor experiência de desenvolvimento;

- Express.js - Micro-Framework do Node.js pouco opinado para criação de API Restful com uma grande facilidade para implementar. Ideal para moldar a aplicação da forma que necessitarmos;

- Prisma - Um dos ORMs mais famosos do Node.js, para criação de modelos que integram com o banco de dados e com o próprio Typescript, disponibilizando tipagens dos modelos recém criados. Usado para facilitar o desenvolvimento de entidades e deixar o código mais legível e facil de entender;

- Tsyringe - Biblioteca criada pela microsoft para injeção de dependências automáticas em tempo de execução. Muito útil ao utilizar junto com o design pattern Singleton que é disponibilizado por padrão.

## Estrutura do projeto

Utilizado conceitos do clean architecture para separar o máximo possível a camada da aplicação em si - o núcleo do app, onde ficam todaa aa regraa de negócio, entidades, casos de usos, o domínio -, do resto, no caso a camada de infraestrutura, onde estão todas as implementações de baixo nível, como o framework utilizado, banco de dados, etc. Dessa forma, a aplicação fica quase 100% desacoplada, sem dependendo de implementações de banco de dados e afins.

- @core - núcleo da aplicação
- infra - camada de baixo nível, contendo implementações que não diz respeito às regras de uso da aplicação
- shared - pasta contendo todas as injeções de dependências
- test - pasta que contém módulos utilizados apenas para testes, como os repositórios em memória e as factories de entidades

## Outros conceitos

Utilizado bastante os princípios de **S.O.L.I.D.**. Principalmente a inversão de dependência e o princípio de substituição de Liskov.

## Testes unitários

Execute este comando para iniciar os testes:
```
$ yarn test
```

## Rodar a aplicação

Execute este comando para iniciar a aplicação:
```
yarn start:dev # Servidor iniciará em: http://localhost:3333
```

Após isso, a api estará disponível. Para testar, será necessário algum cliente API Rest, tal como Insomnia, Postman e afins. Ou acessar a [documentação da API](http://localhost:3333/api-docs).

## Endpoints

### Usuários

***```- POST /users```*** 

- Criação de usuário. Recebe no corpo da requisição, email, nome e senha.

***```- POST /sessions```***

- Autenticação de usuário. Recebe no corpo da requisição, email e senha. Retorna um token JWT.

### Videos

***```- POST /videos```*** 

- Upload de video. Recebe no corpo da requisição, title, description e a url. **Necessário autenticação**.

***```- POST /videos/:id/tags```*** 

- Vincular uma tag à um video do usuário autenticado. Recebe no corpo da requisição a id da tag e nos parâmetros, a id do video. **Necessário autenticação**.

***```- POST /tags/:tagName/videos```*** 

- Listagem de todos os videos vinculados à uma tag, passado como parâmetro da requsição. **Necessário autenticação**.

***```- GET /videos```*** 

- Listagem de todos os videos registrados na plataforma. **Necessário autenticação**.

***```- GET /videos/:id```*** 

- Listar apenas um video pelo id passado nos parâmetros. **Necessário autenticação**.

***```- GET /videos/from/:userId```*** 

- Listar videos de um usuário, pelo id passado nos parâmetros. **Necessário autenticação**.

***```- PUT /videos/:id```*** 

- Atualizar um video do usuário atualmente autenticado, pelo id passado nos parâmetros. **Necessário autenticação**.

***```- DELETE /videos/:id```*** 

- Deleter um video do usuário atualmente autenticado, pelo id passado nos parâmetros. **Necessário autenticação**.

### Tags

***```- POST /tags```*** 

- Criar uma tag, com o nome passado no corpo da requisição. **Necessário autenticação**.

***```- GET /tags```*** 

- Listagem de todas as tags. **Necessário autenticação**.

***```- PUT /tags/:id```*** 

- Atualizar uma tag com a id passada pelos parâmetros da requisição. **Necessário autenticação**.

***```- DELETE /tags/:id```*** 

- Deletar uma tag com a id passada pelos parâmetros da requisição. **Necessário autenticação**.

> **🚩 Info**
>
> No SwaggerUI, após autenticar no endpoint ```/sessions```, basta clicar no ícone do cadeado e colar o token no campo que aparecer.

***```- GET /api-docs```*** 

- Documentação da API feito com SwaggerUI. Também útil para testar os endpoints, podendo substituir um client API Rest como o Insomnia. Disponível em: http://localhost:3333/api-docs
