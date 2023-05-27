import { agent } from './veramo/setup.js'

async function main() {
  const result = await agent.verifyCredential({
    credential: {
      "credentialSubject": {
        "you": "Rock",
        "id": "did:cheqd:testnet:67PkBmAoEqt2MnEu69dg5F"
      },
      "issuer": {
        "id": "did:cheqd:testnet:FKJ2hWVQtGw9XNKhMHgAUj"
      },
      "type": [
        "VerifiableCredential"
      ],
      "@context": [
        "https://www.w3.org/2018/credentials/v1"
      ],
      "issuanceDate": "2023-05-26T01:16:18.000Z",
      "proof": {
        "type": "JwtProof2020",
        "jwt": "eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJ2YyI6eyJAY29udGV4dCI6WyJodHRwczovL3d3dy53My5vcmcvMjAxOC9jcmVkZW50aWFscy92MSJdLCJ0eXBlIjpbIlZlcmlmaWFibGVDcmVkZW50aWFsIl0sImNyZWRlbnRpYWxTdWJqZWN0Ijp7InlvdSI6IlJvY2sifX0sInN1YiI6ImRpZDpjaGVxZDp0ZXN0bmV0OjY3UGtCbUFvRXF0Mk1uRXU2OWRnNUYiLCJuYmYiOjE2ODUwNjM3NzgsImlzcyI6ImRpZDpjaGVxZDp0ZXN0bmV0OkZLSjJoV1ZRdEd3OVhOS2hNSGdBVWoifQ.6LILTJuRiQ7WxsKG-OiW1goVIqd4bF5k1wD-PArCuH8DSoRVzLCzTDxzc4MoLpUFe0Ku_bv-VevnA6dAFALgDg"
      }
    }
  })
  console.log(`Credential verified`, result.verified)
}

main().catch(console.log)