# Adonis API application
The Node.js Framework that prefers developer joy and stability over anything else.

## Setup

Start by cloning this repo using the following command:

```bash
> git clone git@github.com:cairoramos7/backend-api.git
```
or with https
```bash
> git clone https://github.com/cairoramos7/backend-api.git
```

Next, install the dependencies from npm:

```bash
> npm install
```
or with yarn
```bash
> yarn
```

After that copy the `.env.example` file as `.env` and generate the secret key:

```bash
> adonis key:generate
```

### Migrations

Run the following command to run startup migrations.

```js
adonis migration:run
```

## Start server

The server is started using the `adonis serve` command:

```bash
> adonis serve --dev
```
