/*
Resolve a LBRY URI

Args:
    'uri': (str) uri to download
Returns:
    None if nothing can be resolved, otherwise:
    If uri resolves to a channel or a claim in a channel:
        'certificate': {
            'address': (str) claim address,
            'amount': (float) claim amount,
            'effective_amount': (float) claim amount including supports,
            'claim_id': (str) claim id,
            'claim_sequence': (int) claim sequence number,
            'decoded_claim': (bool) whether or not the claim value was decoded,
            'height': (int) claim height,
            'depth': (int) claim depth,
            'has_signature': (bool) included if decoded_claim
            'name': (str) claim name,
            'supports: (list) list of supports [{'txid': txid,
                                                 'nout': nout,
                                                 'amount': amount}],
            'txid': (str) claim txid,
            'nout': (str) claim nout,
            'signature_is_valid': (bool), included if has_signature,
            'value': ClaimDict if decoded, otherwise hex string
        }
    If uri resolves to a channel:
        'claims_in_channel': [
            {
                'address': (str) claim address,
                'amount': (float) claim amount,
                'effective_amount': (float) claim amount including supports,
                'claim_id': (str) claim id,
                'claim_sequence': (int) claim sequence number,
                'decoded_claim': (bool) whether or not the claim value was decoded,
                'height': (int) claim height,
                'depth': (int) claim depth,
                'has_signature': (bool) included if decoded_claim
                'name': (str) claim name,
                'supports: (list) list of supports [{'txid': txid,
                                                     'nout': nout,
                                                     'amount': amount}],
                'txid': (str) claim txid,
                'nout': (str) claim nout,
                'signature_is_valid': (bool), included if has_signature,
                'value': ClaimDict if decoded, otherwise hex string
            }
        ]
    If uri resolves to a claim:
        'claim': {
            'address': (str) claim address,
            'amount': (float) claim amount,
            'effective_amount': (float) claim amount including supports,
            'claim_id': (str) claim id,
            'claim_sequence': (int) claim sequence number,
            'decoded_claim': (bool) whether or not the claim value was decoded,
            'height': (int) claim height,
            'depth': (int) claim depth,
            'has_signature': (bool) included if decoded_claim
            'name': (str) claim name,
            'channel_name': (str) channel name if claim is in a channel
            'supports: (list) list of supports [{'txid': txid,
                                                 'nout': nout,
                                                 'amount': amount}]
            'txid': (str) claim txid,
            'nout': (str) claim nout,
            'signature_is_valid': (bool), included if has_signature,
            'value': ClaimDict if decoded, otherwise hex string
        }
    }
*/

export default () => ({});
