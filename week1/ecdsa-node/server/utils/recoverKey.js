const secp = require('ethereum-cryptography/secp256k1');
const { toHex } = require('ethereum-cryptography/utils');
const { keccak256 } = require('ethereum-cryptography/keccak');
const hashMessage = require('./hashMessage');

const recoverKey = (message, signature, recoveryBit) => {
    return `0x${toHex(
        keccak256(
            secp.recoverPublicKey(hashMessage(message), signature, recoveryBit).slice(1)
        ).slice(-20)
    )}`;
};

module.exports = recoverKey;
