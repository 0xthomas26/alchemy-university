const { loadFixture } = require('@nomicfoundation/hardhat-network-helpers');
const { expect } = require('chai');

describe('Faucet', function () {
    // We define a fixture to reuse the same setup in every test.
    // We use loadFixture to run this setup once, snapshot that state,
    // and reset Hardhat Network to that snapshot in every test.
    async function deployContractAndSetVariables() {
        const Faucet = await ethers.getContractFactory('Faucet');
        const faucet = await Faucet.deploy();

        const [owner, testUser] = await ethers.getSigners();

        let withdrawAmount = ethers.utils.parseUnits('1', 'ether');

        console.log('Signer 1 address: ', owner.address);
        console.log('Signer 2 address: ', testUser.address);
        return { faucet, owner, withdrawAmount, testUser };
    }

    it('should deploy and set the owner correctly', async function () {
        const { faucet, owner } = await loadFixture(deployContractAndSetVariables);

        expect(await faucet.owner()).to.equal(owner.address);
    });

    it('should not allow withdrawals above .1 ETH at a time', async function () {
        const { faucet, withdrawAmount } = await loadFixture(deployContractAndSetVariables);

        await expect(faucet.withdraw(withdrawAmount)).to.be.reverted;
    });

    it('should not allow other users to withdrawAll and destroy the faucet', async function () {
        const { faucet, testUser } = await loadFixture(deployContractAndSetVariables);

        await expect(faucet.connect(testUser).withdrawAll()).to.be.reverted;
        await expect(faucet.connect(testUser).destroyFaucet()).to.be.reverted;
    });

    it('should allow only the owner', async function () {
        const { faucet, owner } = await loadFixture(deployContractAndSetVariables);

        await expect(faucet.connect(owner).withdrawAll()).not.to.be.reverted;
        await expect(faucet.connect(owner).destroyFaucet()).not.to.be.reverted;
    });
});
