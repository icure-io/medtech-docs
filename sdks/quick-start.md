# Quick Start

## Prerequisites and Installation

iCure can easily be used in the browser or with Node.

Node version 16 or higher is fully supported as it includes a webcrypto compatible implementation of the cryptography layer.

We recommend using yarn for package management but npm works fine as well.

The main dependency for using iCure is `@icure/medical-device-sdk`, two extra dependencies are required for node : `fetch-isomorphic` and `node-localstorage`.

```bash
mkdir healthcare-project
cd healthcare-project
yarn init -y
yarn add @icure/medical-device-sdk

#if you are using node two other dependencies are needed
yarn add node-fetch node-localstorage
```

## Installing the backend or using iCure cloud

iCure can be installed locally or in the cloud. 

The cloud version is available on [https://api.icure.cloud](https://api.icure.cloud) and can be configured using [our cockpit](https://cockpit.icure.cloud).

If, instead of using the cloud version, you want to install the iCure API locally, you can either use docker (recommended) or install it manually.

### Using iCure Cloud

Head to [https://cockpit.icure.cloud](https://cockpit.icure.cloud) and create an account.
Create an app and create a new administrator in the app.

Note down the credentials of your administrator. You will need them later.

### Using docker

Make sure you have docker installed and running on your machine.

Then, run the following command:

```bash
mkdir icure-api
cd icure-api
curl -O https://raw.githubusercontent.com/icure/icure-kraken-oss/main/docker/docker-compose.yml
docker compose up -d
```

The current version of iCure is called the Kraken. The docker compose file will start the Kraken and a [CouchDB](https://couchdb.apache.org) instance. 
Kraken connects to the couchdb database to store its data.

:::tip
The docker compose file exposes the Kraken on port 16043. It also exposes the CouchDB instance on port 5984.
:::

To connect to the Kraken, you will need credentials. If no user has ever been created in the database, the following entry will appear in the docker logs:

`User 'admin' has been created with password 'xxxxxxxxxxxxxx'`

Those credentials are going to be used later. Please note them down.

### Manual installation

You can also install the Kraken manually without relying on docker. This involves installing and configuring a local or remote instance of CouchDB and then installing and starting the Kraken jar. The installation instructions are available in the [Kraken repository](../how-to-install-icure-kraken.md).

## Using the SDK

Now that we have credentials for a local or remote instance of the Kraken, we can use the SDK to connect to it.

<!-- file://code-samples/quick-start/index.mts snippet:instantiate the api-->
```typescript
import { medTechApi } from '@icure/medical-device-sdk'
import { webcrypto } from "crypto";

const password = process.env.PASSWORD
const host = 'https://api.icure.cloud/rest/v1'

const api = await medTechApi()
	.withICureBasePath(host)
	.withUserName('admin')
	.withPassword(password)
	.withCrypto(webcrypto as any)
	.build()
```

Once logged in, you can check the user details.

<!-- file://code-samples/quick-start/index.mts snippet:get the currently logged user-->
```typescript
const user = await api.userApi.getLoggedUser()
console.log(JSON.stringify(user))
```

Congratulations, you are now ready to use the SDK to interact with the iCure API.
You can now head to the [Tutorial](../tutorial/index.md) to learn how to use the SDK to create a simple application.