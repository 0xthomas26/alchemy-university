import { Alchemy, Network } from 'alchemy-sdk';
import { useEffect, useState } from 'react';

import moment from 'moment';
import TransactionDetails from '../components/TransactionDetails';
import Layout from '../components/Layout';

const settings = {
    apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
    network: Network.ETH_MAINNET,
};

const alchemy = new Alchemy(settings);

const Block = () => {
    const [blockNumber, setBlockNumber] = useState();
    const [blockDetails, setBlockDetails] = useState();
    const [blockTx, setBlockTx] = useState();

    useEffect(() => {
        async function getBlockNumber() {
            const bNumber = await alchemy.core.getBlockNumber();
            setBlockNumber(bNumber);
            const bDetail = await alchemy.core.getBlock(bNumber);
            setBlockDetails(bDetail);
            const bTx = await alchemy.core.getBlockWithTransactions(bNumber);
            setBlockTx(bTx);
        }

        getBlockNumber();
    }, []);

    return (
        <Layout>
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                <h1>Blockchain explorer</h1>
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'flex-start',
                    }}>
                    {blockNumber && blockDetails && (
                        <div>
                            <h2>Latest Block</h2>
                            <p>
                                Block Number <b>#{blockNumber}</b> mined{' '}
                                <b>{moment.unix(blockDetails?.timestamp).fromNow()}</b>
                            </p>
                            <p>
                                Nb of Tx in the block: <b>{blockTx?.transactions?.length}</b>
                            </p>
                        </div>
                    )}
                    <div style={{ marginTop: '10px' }}>
                        <p>
                            👇 <b>10</b> transactions details of the block 👇
                        </p>
                        {blockTx &&
                            blockTx?.transactions?.slice(0, 10).map((elem, key) => {
                                return <TransactionDetails tx={elem.hash} key={key} />;
                            })}
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Block;
