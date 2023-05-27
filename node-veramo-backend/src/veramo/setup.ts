// Core interfaces
import { createAgent, IDIDManager, IResolver, IDataStore, IKeyManager, ICredentialPlugin } from '@veramo/core'

import {
  IDIDManagerCreateArgs,
  IAgentContext
} from '@veramo/core-types'

// import { createAgentFromConfig } from '@veramo/cli/src/lib/agentCreator'

import { getAgent } from '@veramo/cli/src/setup'

// Core identity manager plugin
import { AbstractIdentifierProvider, DIDManager, MemoryDIDStore } from '@veramo/did-manager'

// Ethr did identity provider
import { EthrDIDProvider } from '@veramo/did-provider-ethr'

// Web did identity provider
import { WebDIDProvider } from '@veramo/did-provider-web'


import { Cheqd, CheqdDIDProvider, getResolver as CheqdDIDResolver } from '@cheqd/did-provider-cheqd'


// import { NetworkType } from '@cheqd/did-provider-cheqd/src/did-manager/cheqd-did-provider'


// Core key manager plugin
import { KeyManager, MemoryKeyStore, MemoryPrivateKeyStore } from '@veramo/key-manager'

// Custom key management system for RN
import { KeyManagementSystem, SecretBox } from '@veramo/kms-local'

// W3C Verifiable Credential plugin
import { CredentialPlugin } from '@veramo/credential-w3c'

// Custom resolvers
import { DIDResolverPlugin } from '@veramo/did-resolver'
import { Resolver, ResolverRegistry } from 'did-resolver'
import { getResolver as ethrDidResolver } from 'ethr-did-resolver'
import { getResolver as webDidResolver } from 'web-did-resolver'

import { getResolver as CosmoscashDIDResolver } from '../veramo/cosmoscash-did-resolver.ts'


import {
  DIDDocument
} from '@cheqd/sdk'
import {
  TImportableEd25519Key
} from '@cheqd/did-provider-cheqd/src/did-manager/cheqd-did-provider'


// Storage plugin using TypeOrm
import { Entities, KeyStore, DIDStore, IDataStoreORM, PrivateKeyStore, migrations } from '@veramo/data-store'

// TypeORM is installed with `@veramo/data-store`
import { DataSource } from 'typeorm'

import express from 'express';
import bodyParser from 'body-parser';
import { Request, Response } from 'express';
import cors from 'cors';


export enum NetworkType {
  Mainnet = "mainnet",
  Testnet = "testnet"
}

// This will be the name for the local sqlite database for demo purposes
const DATABASE_FILE = 'database.sqlite'

// You will need to get a project ID from infura https://www.infura.io
const INFURA_PROJECT_ID = '3586660d179141e3801c3895de1c2eba'


type TExportedDIDDocWithKeys = { didDoc: DIDDocument, keys: TImportableEd25519Key[], versionId?: string }

// This will be the secret key for the KMS
const KMS_SECRET_KEY =
  '11b574d316903ced6cc3f4787bbcc3047d9c72d1da4d83e36fe714ef785d10c1'
const app = express();
app.use(bodyParser.json());
app.use(cors());

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

app.listen(3000, () => {
  console.log('Server running on port 3000.');
});
const dbConnection = new DataSource({
  type: 'sqlite',
  database: DATABASE_FILE,
  synchronize: false,
  migrations,
  migrationsRun: true,
  logging: ['error', 'info', 'warn'],
  entities: Entities,
}).initialize()

type didPayload = {
  [key: string]: any;
}

const cheqdDidProvider = new CheqdDIDProvider({
  defaultKms: 'local',
  cosmosPayerSeed: 'fuel resist resource daughter mammal chat bench action banana hero shoulder lend',
  //networkType: NetworkType.Testnet,
  rpcUrl: "https://rpc.cheqd.network"
})

export const agent = createAgent<IDIDManager & IKeyManager & IDataStore & IDataStoreORM & IResolver & ICredentialPlugin>({
  plugins: [
    new KeyManager({
      store: new KeyStore(dbConnection),
      kms: {
        local: new KeyManagementSystem(new PrivateKeyStore(dbConnection, new SecretBox(KMS_SECRET_KEY))),
      },
    }),
    new DIDManager({
      store: new DIDStore(dbConnection),
      defaultProvider: 'did:cheqd:testnet',
      providers: {
        'did:ethr:goerli': new EthrDIDProvider({
          defaultKms: 'local',
          network: 'goerli',
          rpcUrl: 'https://goerli.infura.io/v3/' + INFURA_PROJECT_ID,
        }),
        'did:web': new WebDIDProvider({
          defaultKms: 'local',
        }),
        'did:cheqd:testnet': cheqdDidProvider
      },
    }),
    new DIDResolverPlugin({
      resolver: new Resolver({
        ...ethrDidResolver({ infuraProjectId: INFURA_PROJECT_ID }),
        ...webDidResolver(),
        ...CheqdDIDResolver(),
        ...CosmoscashDIDResolver()
      }),
    }),
    new CredentialPlugin(),
    new Cheqd({
      'providers': [
        new CheqdDIDProvider({
          defaultKms: 'local',
          cosmosPayerSeed: 'fuel resist resource daughter mammal chat bench action banana hero shoulder lend',
          //networkType: NetworkType.Testnet,
          rpcUrl: "https://rpc.cheqd.network"
        })
      ]
    })
  ],
  authorizedMethods: [
    'keyManagerCreate',
    'keyManagerGet',
    'keyManagerDelete',
    'keyManagerImport',
    'keyManagerEncryptJWE',
    'keyManagerDecryptJWE',
    'keyManagerSign',
    'keyManagerSharedSecret',
    'keyManagerSignJWT',
    'keyManagerSignEthTX',
    'didManagerGetProviders',
    'didManagerFind',
    'didManagerGet',
    'didManagerGetByAlias',
    'didManagerCreate',
    'didManagerGetOrCreate',
    'didManagerUpdate',
    'didManagerImport',
    'didManagerDelete',
    'didManagerAddKey',
    'didManagerRemoveKey',
    'didManagerAddService',
    'didManagerRemoveService',
    'resolveDid',
    'getDIDComponentById',
    'discoverDid',
    'dataStoreGetMessage',
    'dataStoreSaveMessage',
    'dataStoreGetVerifiableCredential',
    'dataStoreSaveVerifiableCredential',
    'dataStoreGetVerifiablePresentation',
    'dataStoreSaveVerifiablePresentation',
    'dataStoreORMGetIdentifiers',
    'dataStoreORMGetIdentifiersCount',
    'dataStoreORMGetMessages',
    'dataStoreORMGetMessagesCount',
    'dataStoreORMGetVerifiableCredentialsByClaims',
    'dataStoreORMGetVerifiableCredentialsByClaimsCount',
    'dataStoreORMGetVerifiableCredentials',
    'dataStoreORMGetVerifiableCredentialsCount',
    'dataStoreORMGetVerifiablePresentations',
    'dataStoreORMGetVerifiablePresentationsCount',
    'handleMessage',
    'packDIDCommMessage',
    'unpackDIDCommMessage',
    'sendDIDCommMessage',
    'sendMessageDIDCommAlpha1',
    'createVerifiableCredential',
    'createVerifiablePresentation',
    'verifyCredential',
    'verifyPresentation',
    'createSelectiveDisclosureRequest',
    'getVerifiableCredentialsForSdr',
    'validatePresentationAgainstSdr',
    'cheqdCreateIdentifier',
    'cheqdUpdateIdentifier',
    'cheqdDeactivateIdentifier',
    'cheqdCreateLinkedResource',
    'cheqdGenerateDidDoc',
    'cheqdGenerateDidDocWithLinkedResource',
    'cheqdGenerateIdentityKeys',
    'cheqdGenerateVersionId'
  ]
})

app.get('/api/did/list', async (req: Request, res: Response) => {
  try {
    const dids = await agent.didManagerFind();
    res.json(dids);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/did/resolve/:alias1', async (req: Request, res: Response) => {
  try {
    const didDocument = await agent.resolveDid({ didUrl: req.params.alias1 });
    res.json(didDocument);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/did/createVC/:vc_did1/:vc_did', async (req: Request, res: Response) => {
  try {
    // const didDocument = await agent.resolveDid({ didUrl: req.params.vc_did });
    // res.json(didDocument);
    console.log(req.params)
    const identifier = await agent.didManagerGet({ did: req.params.vc_did })
    const verifiableCredential = await agent.createVerifiableCredential({
      credential: {
        issuer: { id: identifier.did },
        credentialSubject: {
          id: req.params.vc_did1,
          you: 'alice',
        },
      },
      proofFormat: 'jwt',
    })
    console.log(`New credential created`)
    console.log(JSON.stringify(verifiableCredential, null, 2))
    //const result = await agent.verifyCredential({ credential: verifiableCredential })
    //console.log(result)
    res.json(verifiableCredential)


  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});


app.post('/api/did/create/:alias', async (req: Request, res: Response) => {
  try {
    const args: IDIDManagerCreateArgs = { alias: req.params.alias }

    const generatedDID = await agent.execute(
      'cheqdGenerateDidDoc',
      {
        verificationMethod: 'Ed25519VerificationKey2020',
        methodSpecificIdAlgo: 'base58btc',
        network: 'testnet'
      })
    console.log(generatedDID['didDoc'])

    const payload: didPayload = {
      "kms": "local",
      "alias": args.alias,
      "document": generatedDID['didDoc'],
      "versionId": generatedDID['versionId'],
      "keys": generatedDID['keys']
    }

    console.log(payload)

    const providers = await agent.didManagerGetProviders()
    const providerName = providers[2]
    console.log(providerName)

    // check if already exists
    if (args.alias !== undefined) {
      let existingIdentifier
      try {
        existingIdentifier = await agent.execute('didManagerGet', { alias: args.alias, provider: providerName })
      } catch (e) { }
      if (existingIdentifier) {
        throw Error(
          `illegal_argument: Identifier with alias: ${args.alias}, provider: ${providerName} already exists: ${existingIdentifier.did}`,
        )
      }
    }

    const result = await agent.execute('cheqdCreateIdentifier', { kms: payload['kms'], alias: payload['alias'], document: payload['document'], keys: payload['keys'] })
    console.log(result)
    res.json(result);
  } catch (error: any) {
    console.log(error)
    res.status(500).json({ error: error.message });
  }
});
app.put('/api/did/update/:did', async (req: Request, res: Response) => {
  try {
    // You may need to update the DID document with additional properties or services
    const didDocument = await agent.resolveDid({ didUrl: req.params.did });
    res.json(didDocument);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Delete DID
app.delete('/api/did/delete/:did', async (req: Request, res: Response) => {
  try {
    const result = await agent.didManagerDelete({ did: req.params.did });
    res.json(result);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});
