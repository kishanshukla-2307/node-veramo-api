# 🆔 Did Management App 

## ✅ Functionalities

### DID list

It displays all the did's with the controller and the time of creation.

### DID Management

This provides an UI for managing the did's.
It provides an easy way of creating a did using an alias name. Further the update functionality can be used from this did management UI to make further changes.

#### Resolving DID 

Given the key/address, Did resolution is performed using the corresponding provider based on the did. This generates the DID Document which contains the did, verification method, publicKeyMultibase. This also generates the DID Document Metadata and the DID Resolution Metadata.

## ✅ Quick setup

### For cosmos-cash reolution only 

Start your cosmos-cash chain by using the bellow command

### `cosmos-cashd start`

Then move to the cosmos-cash-resolver directory and the start the resolver (written in goLang)

### `go run main.go`

Move to the did-management-app directory and run the following command to install the required dependencies

### `npm i`

Once the dependencies are installed, we can start the react server (inside did-management-app directory).

### `npm start`

This starts the react server and gives us an UI to interact with the chain. Following are the functionalities provided by the UI...

####    - Did Management
####    - Did List




# 🆔 Veramo Node API 

## ✅ Quick setup

Before starting the node server, run the below command to install all the dependencies needed.

### `yarn`

Once the dependencies are installed, we are ready to start the node server.

### `yarn ts-node --esm ./src/create-identifier.ts`

This command starts the node server at port 3000 and exposes the following functionalities...
####    - list did
####    - created did
####    - update did
####    - delete did

## ✅ Functionalities

#### - localhost:3000/api/did/list

A get request to the above endpoint will list down all the did's created

#### - localhost:3000/api/did/create/:alias

A post request to the above endpoint will create a did.

#### - localhost:3000/api/did/update/:didToUpdate

A put request to the above endpoint will update the did.

