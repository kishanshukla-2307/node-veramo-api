# Veramo Node API

## Overview

## Quick setup

Before starting the node server, run the below command to install all the dependencies needed.

### `yarn`

Once the dependencies are installed, we are ready to start the node server.

### `yarn ts-node --esm ./src/list-identifier.ts`

This command starts the node server at port 3000 and exposes the following functionalities...
    - list did
    - created did
    - update did
    - delete did

## Functionalities

### `localhost:3000/api/did/list`

A get request to the above endpoint will list downs all the did's created

### `localhost:3000/api/did/create/:alias`

A post request to the above endpoint will create a did.

### `localhost:3000/api/did/update/:didToUpdate`

A put request to the above endpoint will update the did 


## Did Management App

# Overview

# Quick setup

Run the following command to install the required dependencies

### `npm i`

Once the dependencies are installed, we can start the react server.

### `npm start`

This starts the react server and gives us an UI to interact with the chain. Following are the functionalities provided by the UI...
    - Did List
    - Did Management

## Functionalities

### DID list

It displays all the did's with the controller and the time of creation.

### DID Management

This provides an UI for managing the did's.
It provides an easy way of creating a did using an alias name. Further the update functionality can be used from this did management UI to make further changes.
