import { Alchemy, Network } from 'alchemy-sdk';
import { useEffect, useState } from 'react';

const settings = {
    apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
    network: Network.ETH_MAINNET,
};

const alchemy = new Alchemy(settings);

const FloorPrice = ({ contract }) => {
    const [floor, setFloor] = useState(0);

    useEffect(() => {
        async function getAddressDetails() {
            try {
                const floorData = await alchemy.nft.getFloorPrice(contract);
                setFloor(floorData);
            } catch (err) {
                console.log(err);
            }
        }
        getAddressDetails();
    }, [contract]);

    return (
        <div>
            <p>
                <b>Floor price:</b>{' '}
                {`${floor?.openSea?.floorPrice} ${floor?.openSea?.priceCurrency}`}
            </p>
            <button
                style={{
                    backgroundColor: 'black',
                    color: 'white',
                    border: 'none',
                    padding: '5px 12px',
                    borderRadius: '6px',
                    fontSize: '18px',
                    cursor: 'pointer',
                }}
                onClick={() => window.open(floor?.openSea?.collectionUrl, '_blank')}>
                View Collection
            </button>
        </div>
    );
};

export default FloorPrice;
