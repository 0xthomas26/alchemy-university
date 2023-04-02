import React, { useState } from 'react';
import AddressDetails from '../components/AddressDetails';
import Layout from '../components/Layout';

const Home = () => {
    const [address, setAddress] = useState('vitalik.eth');

    return (
        <Layout>
            <div
                style={{
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    padding: '40px',
                }}>
                <h1>Blockchain explorer</h1>
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginBottom: '40px',
                    }}>
                    <label
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            marginBottom: '10px',
                            fontWeight: 'bold',
                            fontSize: '24px',
                        }}>
                        Wallet address:
                        <input
                            placeholder='Type a wallet address'
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            style={{
                                width: '350px',
                                marginTop: '10px',
                                height: '40px',
                                fontSize: '14px',
                            }}
                        />
                    </label>
                    <AddressDetails address={address} />
                </div>
            </div>
        </Layout>
    );
};

export default Home;
