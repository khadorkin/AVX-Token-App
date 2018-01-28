/*
List my name claims

Args:
    None
Returns
    (list) List of name claims owned by user
{
  'address': (str) address that owns the claim
  'amount': (float) amount assigned to the claim
  'blocks_to_expiration': (int) number of blocks until it expires
  'category': (str) "claim", "update" , or "support"
  'claim_id': (str) claim ID of the claim
  'confirmations': (int) number of blocks of confirmations for the claim
  'expiration_height': (int) the block height which the claim will expire
  'expired': (bool) true if expired, false otherwise
  'height': (int) height of the block containing the claim
  'is_spent': (bool) true if claim is abandoned, false otherwise
  'name': (str) name of the claim
  'txid': (str) txid of the cliam
  'nout': (int) nout of the claim
  'value': (str) value of the claim
}
*/

export default () => [];
