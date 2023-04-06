const { ethers } = require('hardhat');

async function main() {
    const [owner] = await ethers.getSigners();
    console.log('owner address=', owner.address);
    //0x88B9D45616c632ee60350684E505239802321Eb7
    const transactionCount = await owner.getTransactionCount();

    // gets the address of the token before it is deployed
    const futureAddress = ethers.utils.getContractAddress({
        from: owner.address,
        nonce: transactionCount + 1,
    });

    const MyGovernor = await ethers.getContractFactory('MyGovernor');
    const governor = await MyGovernor.deploy(futureAddress);

    const MyToken = await ethers.getContractFactory('MyToken');
    const token = await MyToken.deploy(governor.address);

    console.log(`Governor deployed to ${governor.address}`, `Token deployed to ${token.address}`);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
