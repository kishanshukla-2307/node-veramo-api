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
    ): Promise<any> {
        //console.log(did)
        //console.log(parsed)
        // {method: 'mymethod', id: 'abcdefg', did: 'did:mymethod:abcdefg/some/path#fragment=123', path: '/some/path', fragment: 'fragment=123'}
        const didDoc = await axios.get('http://localhost:2109/identifier/' + did)


        return { didDoc }

    }
    build(): Record<string, DIDResolver> {
        return { cosmoscash: this.resolve.bind(this) }
    }
}