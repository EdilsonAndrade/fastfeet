<h1 align="center">
  <img alt="Fastfeet" title="Fastfeet" src="logo.png" width="300px" />
</h1>



<h3 align="center">
  FastFeet, delivery de encomendas por aplicativo
</h3>

<h4 align="center"><strong>Instalação e Configuração - Dependências</strong></h4>

<ul>
  <li>Acesse a pasta <b>fastfeet-backend</b> e siga os passos abaixo</li>
</ul>

```json
yarn
```
ou

```json
npm -i
```
<h5>este comando irá instalar todas as dependencias do projeto</h5>

<h4 align="center"><strong>Instalação e Configuração - Docker</strong></h4>
<h5>Realize a instalação e configuração do docker e permissão para o usuário da maquina rodar o docker conforme este <a href="https://docs.docker.com/" >link</a></h5>
<p>Após instalado realize os comandos para criação de duas imagens dentro do docker</p>

1. Banco de Dados Postgres

```json
docker run --name postgresfastfeet -e POSTGRES_PASSWORD=fastfeet -p 5432:5432 -d postgres:11
```

2. Redis

```json
docker run --name redisfastfeet -p 6379:6379 -d -t redis:alpine
```

<strong>Por fim inicie as duas imagens com o seguinte comando</strong>

```json
 docker start postgresfastfeet redisfastfeet
```
