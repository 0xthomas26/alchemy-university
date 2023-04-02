import { Alchemy, Network, Utils } from 'alchemy-sdk';
import { useEffect, useState } from 'react';
import * as ethers from 'ethers';
import FloorPrice from './FloorPrice';

const settings = {
    apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
    network: Network.ETH_MAINNET,
};

const alchemy = new Alchemy(settings);

const AddressDetails = ({ address }) => {
    const [balance, setBalance] = useState('');
    const [nfts, setNfts] = useState(null);

    useEffect(() => {
        async function getAddressDetails() {
            try {
                if (ethers.isAddress(address) || Utils.isValidName(address)) {
                    const balanceData = await alchemy.core.getBalance(address, 'latest');
                    setBalance(parseFloat(ethers.formatEther(balanceData._hex)).toFixed(6));
                    const nfts = await alchemy.nft.getNftsForOwner(address);
                    setNfts(nfts);
                } else {
                    setBalance('wrong address');
                    setNfts(null);
                }
            } catch (err) {
                console.log(err);
            }
        }
        getAddressDetails();
    }, [address]);

    return (
        <div>
            <p>
                Balance:{' '}
                <b style={{ color: balance !== 'wrong address' ? 'black' : 'red' }}>{`${balance} ${
                    balance !== 'wrong address' ? 'ETH' : ''
                }`}</b>
            </p>
            {nfts && (
                <div>
                    <p>
                        Total NFTs owned: <b>{nfts.totalCount}</b>
                    </p>
                    <div
                        style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(3, 1fr)',
                            gap: '10px',
                        }}>
                        {nfts?.ownedNfts?.map((elem, key) => {
                            if (!elem?.spamInfo?.isSpam)
                                return (
                                    <div key={key}>
                                        {elem?.media[0]?.gateway ? (
                                            <img
                                                src={elem?.media[0]?.gateway}
                                                width={300}
                                                height={300}
                                                alt={elem.title}
                                                style={{ objectFit: 'cover' }}
                                            />
                                        ) : (
                                            <p>Content not available</p>
                                        )}
                                        <p style={{ marginBlockEnd: 0 }}>
                                            <b>Token ID:</b> #{elem.tokenId.slice(0, 10)}
                                            {elem.tokenId?.length > 10 ? '...' : ''}
                                        </p>
                                        <p style={{ marginBlockStart: 0 }}>
                                            <b>Name:</b> {elem.title}
                                        </p>
                                        <FloorPrice contract={elem?.contract?.address} />
                                    </div>
                                );
                            return <div key={key} />;
                        })}
                    </div>
                </div>
            )}
        </div>
    );
};

export default AddressDetails;
