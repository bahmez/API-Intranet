
import sha256 from 'crypto-js/sha256.js'
import hex from 'crypto-js/enc-hex.js';


export default function hash_sha256(message) {
    return hex.stringify(sha256(message))
}