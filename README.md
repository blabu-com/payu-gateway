#PayU Gateway

## Environments
* SANDBOX: https://secure.snd.payu.com
* PRODUCTION: https://secure.payu.com

## Implementation
For performance reasons, I suggest to separately handle access token and its refresh and caching from order process,
but for small scale operations its just fine to get access token on the fly.

## Cards
In order to test card payments on sandbox, please use the following credentials.

Card issuer	Number	Month	Year	CVV	3-D Secure	Behavior
Visa	4444333322221111	01	21	123	no	Positive authorization
MasterCard	5434021016824014	01	21	123	no	Positive authorization
Maestro	5099802211165618	01	21	123	no	Positive authorization. CVV is not required in single click payments (PayU | Express)
Visa	4012001037141112	01	21	123	yes	Positive authorization
Maestro	5000105018126595	01	21	123	no	Negative authorization
Visa	4000398284360	01	21	123	no	Negative authorization
