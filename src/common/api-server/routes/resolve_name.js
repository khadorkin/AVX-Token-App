/*
Resolve stream info from a LBRY name

Args:
    'name': (str) name to look up, do not include lbry:// prefix
Returns:
    (dict) Metadata dictionary from name claim, None if the name is not
            resolvable
    'txid': (str) txid of claim
    'nout': (int) nout of claim
    'amount': (float) amount of claim
    'value': (str) value of claim
    'height' : (int) height of claim takeover
    'claim_id': (str) claim ID of claim
    'supports': (list) list of supports associated with claim
*/

export default ({ name }) => ({
  txid: 'txid',
  nout: 10,
  amount: 0,
  value: 0,
  height: 1,
  claim_id: name,
  supports: [],
});
