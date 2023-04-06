const { ethers, upgrades } = require('hardhat');

async function main() {
    const VendingMachineV1 = await ethers.getContractFactory('VendingMachineV1');
    const proxy = await upgrades.deployProxy(VendingMachineV1, [100]);
    await proxy.deployed();

    const implementationAddress = await upgrades.erc1967.getImplementationAddress(proxy.address);

    console.log('Proxy contract address: ' + proxy.address);

    console.log('Implementation contract address: ' + implementationAddress);
}
// Goerli testnet
// Proxy contract address: 0xB272bD3D3177B1728FA46EDd13a02c5b5d5578be
// Implementation contract address: 0xb01f08960351F5E9dC660230a638b86ee68dC29b

main();
