# Desafio Merx

<p align="center">
<img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" />
<img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" />
<img src="https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white" />
<img src="https://img.shields.io/badge/-AntDesign-%230170FE?style=for-the-badge&logo=ant-design&logoColor=white" />
</p>


<p align="center">
<img src="https://img.shields.io/github/repo-size/LuanAccioly/desafio-merx?style=for-the-badge" />
<img src="https://img.shields.io/github/languages/count/LuanAccioly/desafio-merx?style=for-the-badge" />

</p>

## Índice

- [Sobre](#sobre)
    - [Tecnologias Utilizadas](#tecnologias-utilizadas)
    - [Features](#features)
- [Requisitos](#requisitos)
- [Instalação](#instalação)
- [Execução Local](#execução-local)
    - [Configuração de Variáveis de Ambiente](#configuração-de-variáveis-de-ambiente)
- [Considerações](#considerações)
    - [Dificuldades](#dificuldades)
    - [Ideias](#ideias)

## Sobre

Este projeto é uma aplicação web construída com Next.js, React e Ant Design. O objetivo é criar uma interface que permita visualização e busca de personagens da Marvel.

Acessível em: [desafio-merx.vercel.app](https://desafio-merx.vercel.app/)

### Tecnologias Utilizadas

- [Next.js](https://nextjs.org/)
- [AntDesign](https://ant.design/)
- [Marvel API](https://developer.marvel.com/)

### Features

- Busca por nome de personagem
- Filtro para ignorar personagens que não tenham imagem de capa
- Modal para cada personagem
  - Descrição do personagem
  - Carrossel com algumas histórias em quadrinhos que o personagem aparece
- Página inicial com os 100 primeiros personagens retornados pela API
- Design responsivo
- Utilização de [Server Actions](https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations)
  - Funções assíncronas executadas do lado do servidor
  - Impede que a URL da requisição com dados sensíveis seja exposta no navegador

## Requisitos

Antes de começar, certifique-se de ter os seguintes itens instalados em sua máquina:

- Node.js (versão 12 ou superior)
- Yarn (versão 1.22.0 ou superior)

## Instalação
Para instalar as dependências do projeto, execute o seguinte comando na raiz do projeto:

```sh
yarn install
```

## Execução Local

### Configuração de Variáveis de Ambiente

1. Crie um arquivo `.env` na raiz do projeto
2. Adicione as variáveis necessárias para o Next.js:
   - BASE_URL
   - PUBLIC_KEY
   - HASH

    Exemplo:

    ```
    BASE_URL=https://gateway.marvel.com/v1/public
    PUBLIC_KEY=b136dac77627
    HASH=b136dac77627
    ```

3. Inicie o servidor de desenvolvimento
   ```
   yarn dev
   ```

A aplicação estará disponível em http://localhost:3000

## Considerações

### Dificuldades

- A Marvel API ainda está em beta e carece de dados mais relevantes sobre os personagens, assim como filtros mais específicos.
- Sendo meu primeiro contato com AntDesign, senti dificuldade em tornar os componentes mais responsivos.

### Ideias/Melhorias

- Implementação de Dark Mode.
- Melhor implementação da funcionalidade do carrossel.
