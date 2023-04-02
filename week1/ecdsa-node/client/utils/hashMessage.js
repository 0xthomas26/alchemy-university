import { keccak256 } from 'ethereum-cryptography/keccak';
import { utf8ToBytes } from 'ethereum-cryptography/utils';

export const hashMessage = (message) => {
    const messageBytes = utf8ToBytes(message);
    return keccak256(messageBytes);
};
