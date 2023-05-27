import { agent } from './veramo/setup.js'

async function main() {
  const identifier = await agent.didManagerGet({ did: 'did:cheqd:testnet:67PkBmAoEqt2MnEu69dg5F' })
  //const identifier = await agent.didManagerGet({ did: 'did:cosmos:net:cash:mancity' })
  //const id = await agent.resolveDid({ didUrl: 'did:cheqd:testnet:3zyL8vXTxsayB9VqdauF1D' })
  //const identifier = id
  console.log(identifier)

  const verifiableCredential = await agent.createVerifiableCredential({
    credential: {
      issuer: { id: identifier.did },
      credentialSubject: {
        //id: 'did:cosmos:net:cash:mancity',
        id: 'did:cheqd:testnet:67PkBmAoEqt2MnEu69dg5F',
        you: 'Bob',
      },
    },
    proofFormat: 'jwt',
  })
  //console.log(`New credential created`)
  //console.log(JSON.stringify(verifiableCredential, null, 2))


}

main().catch(console.log)