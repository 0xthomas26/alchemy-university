const { keccak256 } = require('ethereum-cryptography/keccak');
const { utf8ToBytes } = require('ethereum-cryptography/utils');

const hashMessage = (message) => {
    const messageBytes = utf8ToBytes(message);
    return keccak256(messageBytes);
};

module.exports = hashMessage;
