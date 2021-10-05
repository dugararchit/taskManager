# Node js Mongodb Restful services

A Boilerplate for setup restful api's for Nodejs and Express, Database is Mongodb.

## Quick Start

To start with just clone ( Url needs to be added)
git clone --depth 1 git/link

cd /path/to/the/folder

```bash
npm install
```

## Downloading Docker

### Ubuntu

- sudo apt update
- sudo apt install apt-transport-https ca-certificates curl software-properties-common
- curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
- sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu bionic stable"
- sudo apt update
- apt-cache policy docker-ce

### windows

- One can download docker desktop and continue working

## Eslint and preetier

### Download eslint extention for vscode

```
- Launch VS Code Quick Open (Ctrl+P), paste the following command, and press enter.

- Launch VS Code Quick Open (Ctrl+P), paste the following command, and press enter.

OR

Download it from extentions in vscode
```

### Download prettier extention for vscode

```
- Launch VS Code Quick Open (Ctrl+P), paste the following command, and press enter.
- Launch VS Code Quick Open (Ctrl+P), paste the following command, and press enter.
```

## For development purpose

```
sudo npm run docker:dev
```

## For production purpose

Either run npm run start with mongoose installed and change configuraton in env

or run docker using docker:dev

### Api Routes

Deault existing routes

```
Auth:
http://localhost:3000/auth/signup
http://localhost:3000/auth/login

Users:
http://localhost:3000/users/getUsers
http://localhost:3000/users/deleteAllUsers
http://localhost:3000/users/deleteUser
http://localhost:3000/users/updateUser
```

Create your own routes with automation stuffs

```
npm run newroute
```

Then there will be few questions,

```
1.what will be your decider Route name - Add your route name the new one that you want to create

2. what will be your decider schema name - Enter the schema name, like for users details we keep it as name and password,

3. what will be your decider schema type or leave blank as default is String - Enter the type of that or leave blank to make it String as default

4. Do you want to add more type y or n - enter y if you want more schema to be added
```

The above steps will create multiple files and some enteries in index routes

It will create a model, controller, please check the api routes in below given swagger url

## swagger url

current configured port for docker is 3000
change if you want
http://localhost:3000/v1/docs/
