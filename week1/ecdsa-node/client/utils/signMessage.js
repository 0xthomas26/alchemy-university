import * as secp from 'ethereum-cryptography/secp256k1';
import { hashMessage } from './hashMessage';

export const signMessage = async (msg, PRIVATE_KEY) => {
    const hash = hashMessage(msg);
    const signature = await secp.sign(hash, PRIVATE_KEY, { recovered: true });
    return signature;
};
