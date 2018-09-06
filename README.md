# Develop Phoenix applications in Docker containers
  [![Build Status][travis-image]][travis-url] 

> Want to try Phoenix 1.4 before its official releasing? this project make you able to try Phoenix of the latest version from its master branch through a Docker container based on Alpine, without potential conflicts with your current working on production versions of Phoenix.

![phoenix logo](https://raw.githubusercontent.com/phoenixframework/phoenix/master/priv/static/phoenix.png)


# Introduction

This a Docker image for try next release of Phoenix framework before its official releasing. Currently, Phoenix 1.4 could be tried before it may be released later this year.

## Other benefits

* Isolate different Elixir or Phoenix projects' development environments, avoiding contamination of Elixir/Erlang environment on your desktop.
* Easy to add dependent components, such as database, message broker, etc. E.g. a Postgres database container will be bootstrapped by default.


# Usage

## Setup

### Setup your project

We use Docker Compose to introduce the Phoenix development environment into your own project, There are two ways to achieve this:

1. Leverage [this project](https://github.com/jeantsai/docker-phoenix-preview)
Fork, import or download a zipped one of this project. Inside this project, there is a docker-compose.yml which you can run to bootstrap the whold Phoenix development environment.

1. Create one from scratch
You can create a docker-compose.yml by refering the following example:

```yaml
version: '3'

services:
  postgres:
    image: postgres:10-alpine
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: M0bi1e
    volumes:
      - ./db/pg-data:/var/lib/postgresql/data
  phx:
    image: jeantsai/phoenix-alpine
    ports:
      - 4100:4000
    volumes:
      - .:/app
    links:
      - postgres
    entrypoint:
      - sh
    stdin_open: true
    tty: true
```

## Bootstrap the environment

### Bootstrap all containers

There are two ways to start this development environment.

1. Bootstrap through Docker Compose
Just run the following Docker Compose command to start up all containers:
```
docker-compose up -d
```

2. Bootstrap through you IDE
Many IDE started to support Docker nowadays. Take VS code for example here.

Just right click on file "docker-compose.yml" and select **"Compose Up"**. 


### Connect to Phoenix

You can use Phoenix by attache a terminal to the developing container through the following ways.

1. Through Docker Command Line
```
docker exec -it <developing docker name or ID> /bin/sh
```

2. Through your IDE
Take VS Code for example:

Just go to the Docker container list by clicking the Docker Icon on the left side menu, and then right click the developing container, and then select **"Attach Shell" from the context menu.


## Run Phoenix

### Start the scaffolding

Connect to Phoenix container from a terminal, then run the following command to generate a Phoenix project scaffold:
Assume "chatter" is your project name.
```
/app # mix phx.new chatter
```

if you want to use your project root folder - where the docker-compose.yml located - as your Phoenix project's root folder, you can call Phoenix's scaffolding function as following.
```
/app # mix phx.new --module Chatter --app chatter .
```

> Make sure your current working directory is /app. Since we mount the project folder on our host system to the /app on Phoenix container, we will place the generated Phoenix project one layer beleath our project root folder on host system unless you choose the second way just metioned right above.


### Complete the scaffolding

At the end of the running of phx.new, you will be asked whether the dependencies should be installed for us automatically, please answer "no", since we want to use **Yarn** to instead of **npm**.

#### Install Elixir dependencies
From the main folder of the newly generated Phoenix project, run the following command:
```
mix deps.get
```

#### Install frontend NodeJS dependencies
Enter into the main folder of the frontend part of the newly generated Phoenix project. Currently, it is "assets". Run the following command:
```
cd asserts
yarn install
/app/chatter/assets # node node_modules/webpack/bin/webpack.js --mode development
```

#### Configure database connection
Find "config :chatter :Chatter.Repo" inside file chatter/config/dev.exs, update password and hostname as below:
```
  password: "M0bi1e",
  hostname: "postgres"
```

#### Initialize database
Run the follwoing command from the main folder of the generated Phoenix project:
```
mix ecto.create
```

#### Start developing server
Run the follwoing command from the main folder of the generated Phoenix project:
```
mix phx.server
```
Or, run the following comannd to start it in interactive way:
```
iex -S mix phx.server
```

> **NOTES:** To avoid potential port conflict with Phoenix project being developed and debug
> directly on the host system, we can set port number to other number instead of "4000" in
> "docker-compose.yml". **If this is the case, please replace "static_url" with "static_path"
> in file "app.html.eex" of the Phoenix project you just generated.


# License

View [license information](https://github.com/nodejs/node/blob/master/LICENSE) for the software contained in the Docker image in this project.

As with all Docker images, these likely also contain other software which may be under other licenses (such as Bash, etc from the base distribution, along with any direct or indirect dependencies of the primary software being contained).

As for any pre-built image usage, it is the image user's responsibility to ensure that any use of this image complies with any relevant licenses for all software contained within.

MIT © [Jun Cai](https://github.com/jeantsai)

[travis-image]: https://travis-ci.org/jeantsai/generator-jhipster-circleci-2.svg?branch=master
[travis-url]: https://travis-ci.org/jeantsai/generator-jhipster-circleci-2