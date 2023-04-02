import server from './server';
import * as secp from 'ethereum-cryptography/secp256k1';
import { toHex } from 'ethereum-cryptography/utils';
import { keccak256 } from 'ethereum-cryptography/keccak';

function Wallet({ address, setAddress, pKey, setPkey, balance, setBalance }) {
    async function onChange(evt) {
        const pKey = evt.target.value;
        setPkey(pKey);
        setAddress(`0x${toHex(keccak256(secp.getPublicKey(pKey).slice(1)).slice(-20))}`);
        if (address) {
            const {
                data: { balance },
            } = await server.get(`balance/${address}`);
            setBalance(balance);
        } else {
            setBalance(0);
        }
    }

    return (
        <div className='container wallet'>
            <h1>Your Wallet</h1>

            <label>{`Wallet Address: ${address}`}</label>

            <label>
                Private Key
                <input placeholder='Type a private key' value={pKey} onChange={onChange}></input>
            </label>

            <div className='balance'>Balance: {balance}</div>
        </div>
    );
}

export default Wallet;
