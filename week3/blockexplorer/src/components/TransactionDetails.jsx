import { Alchemy, Network } from 'alchemy-sdk';
import { useEffect, useState } from 'react';
import * as ethers from 'ethers';

const settings = {
    apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
    network: Network.ETH_MAINNET,
};

const alchemy = new Alchemy(settings);

const TransactionDetails = ({ tx }) => {
    const [txDetails, setTxDetails] = useState('');

    useEffect(() => {
        async function getAddressDetails() {
            try {
                const txData = await alchemy.core.getTransactionReceipt(tx);
                setTxDetails(txData);
            } catch (err) {
                console.log(err);
            }
        }
        getAddressDetails();
    }, [tx]);

    return (
        <>
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    marginBottom: '20px',
                }}>
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'flex-start',
                    }}>
                    <b style={{ marginRight: '10px', marginBlockStart: 0 }}>Transaction:</b>
                    <p style={{ marginBlockStart: 0 }}>{tx}</p>
                </div>
                {txDetails && (
                    <div
                        style={{
                            width: '100%',
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                        }}>
                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'center',
                            }}>
                            <p style={{ marginBlockStart: 0, marginRight: '10px' }}>
                                <b>From:</b>{' '}
                                {`${txDetails.from?.substring(0, 6)}...${txDetails.from?.substring(
                                    txDetails.from?.length - 4
                                )}`}
                            </p>
                            <p style={{ marginBlockStart: 0 }}>
                                <b>To:</b>{' '}
                                {`${txDetails.to?.substring(0, 6)}...${txDetails.to?.substring(
                                    txDetails.to?.length - 4
                                )}`}
                            </p>
                        </div>
                        <p style={{ marginBlockStart: 0 }}>
                            {`${ethers.formatUnits(txDetails?.effectiveGasPrice?._hex, 'gwei')} `}
                            <b>Gwei</b>
                        </p>
                    </div>
                )}
            </div>
        </>
    );
};

export default TransactionDetails;
