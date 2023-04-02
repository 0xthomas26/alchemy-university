import Wallet from './Wallet';
import Transfer from './Transfer';
import './App.scss';
import { useState } from 'react';

function App() {
    const [balance, setBalance] = useState(0);
    const [address, setAddress] = useState('');
    const [pKey, setPKey] = useState('');

    return (
        <div className='app'>
            <Wallet
                balance={balance}
                pKey={pKey}
                setPkey={setPKey}
                setBalance={setBalance}
                address={address}
                setAddress={setAddress}
            />
            <Transfer setBalance={setBalance} address={address} pKey={pKey} />
        </div>
    );
}

export default App;
