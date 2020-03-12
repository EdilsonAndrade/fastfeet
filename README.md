<h1 align="center">
  <img alt="Fastfeet" title="Fastfeet" src="logo.png" width="300px" />
</h1>


<h3 align="center">
  FastFeet, delivery de encomendas por aplicativo
</h3>


<h4 align="center"><strong>Instalação e Configuração - Dependências - Back End</strong></h4>

<ul>
  <li>Acesse a pasta <b>fastfeet-backend</b> e siga os passos abaixo para instalar as dependências do projeto</li>
</ul>

```
yarn
```

<h4 align="center"><strong>Instalação e Configuração - Docker</strong></h4>
<h5>Realize a instalação e configuração do docker e permissão para o usuário da maquina rodar o docker conforme este <a href="https://docs.docker.com/" >link</a></h5>
<p>Após instalado realize os comandos para criação de duas imagens dentro do docker</p>

1. Banco de Dados Postgres

```
docker run --name postgresfastfeet -e POSTGRES_PASSWORD=fastfeet -p 5432:5432 -d postgres:11
```

2. Redis

```
docker run --name redisfastfeet -p 6379:6379 -d -t redis:alpine
```

<strong>Por fim inicie as duas imagens com o seguinte comando</strong>

```
 docker start postgresfastfeet redisfastfeet
```

3. Acesse o banco postgres com algum gerenciador como exemplo postbird, crie o banco com nome de <strong>fastfeet</strong>
4. Crie um arquivo <b>.env</b> e coloque as configurações conforme arquivo [<b>.env.example</b> link](https://github.com/EdilsonAndrade/fastfeet/blob/master/fastfeet-backend/.env.example)  alterando ip, usuário,password, banco e demais propriedades... conforme definido na criação das imagens e também do banco.

5-Rode a migration

```
yarn sequelize db:migrate
```

7-Rode o seed do usuário adm

```
yarn sequelize db:seed:all
```

6-Rode a aplicação server e queue (cada um em um terminal)

```
yarn dev
yarn queue
```

<h4 align="center"><strong>Web Front End </strong></h4>

<ul>
  <li>Acesse a pasta <b>fastfeet-web</b> e siga os passos abaixo para instalar as dependências do projeto</li>
</ul>


1. Instalação de dependencias

```
yarn
```

2. Endereço de api
2.1. Acesse a pasta no projeto src/services/api.js e modifique a base url para o ip de sua maquina.

3. Rode o projeto

```
yarn start
```

<h4 align="center"><strong>MOBILE</strong></h4>

>**SOMENTE ANDROID**

<ul>
  <li>Acesse a pasta <b>fastfeetMobile</b> e siga os passos abaixo para instalar as dependências do projeto</li>
</ul>


1. Instalação de dependencias

```
yarn
```

1.1. Crie um arquivo .env e coloque um conteúdo como exemplo do arquivo [.env.example deste link](https://github.com/EdilsonAndrade/fastfeet/blob/master/fastfeetMobile/.env.example)

2. Abra duas abas do terminal

2.1. Connecte o celular via usb liberando acesso para transmissão de arquivo por esta porta ou utilize um emulador de ANDROID. 

3. Rode o comando em uma aba do terminal

```
react-native start
```

4. Rode este outros comando em outra aba do terminal

```
$ adb reverse tcp:8081 tcp:8081

```

4.1. Caso utilize o genymotion rode

```
$ adb connect IP_DO_SEU_EMULADOR:5555
```

5. Rode o comando para instalar no aparelho / emulador

```
$ react-native run-android

```
