import {
    DIDDocument,
    DIDResolutionOptions,
    DIDResolutionResult,
    DIDResolver,
    ParsedDID,
    Resolvable,
    Resolver,
    Service,
    VerificationMethod,
} from 'did-resolver'

import axios from 'axios'


export function getResolver(): Record<string, DIDResolver> {
    return new CosmoscashDidResolver().build()
}

export class CosmoscashDidResolver {

    async resolve(
        did: string,
        parsed: ParsedDID,
        didResolver: Resolvable,
        options: DIDResolutionOptions
    ): Promise<DIDResolutionResult> {
        //console.log(did)
        //console.log(parsed)
        // {method: 'mymethod', id: 'abcdefg', did: 'did:mymethod:abcdefg/some/path#fragment=123', path: '/some/path', fragment: 'fragment=123'}
        const didDoc = await axios.get('http://localhost:2109/identifier/' + did)
        // const didDocResult = (await didDoc.data) as DIDResolutionResult// lookup doc
        const didDocResult: DIDResolutionResult = didDoc.data

        return didDocResult

    }
    build(): Record<string, DIDResolver> {
        return { cosmos: this.resolve.bind(this) }
    }
}