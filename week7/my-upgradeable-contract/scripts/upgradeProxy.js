const { ethers, upgrades } = require('hardhat');

// TO DO: Place the address of your proxy here!
const proxyAddress = '0xB272bD3D3177B1728FA46EDd13a02c5b5d5578be';

async function main() {
    const VendingMachineV2 = await ethers.getContractFactory('VendingMachineV2');
    const upgraded = await upgrades.upgradeProxy(proxyAddress, VendingMachineV2);

    const implementationAddress = await upgrades.erc1967.getImplementationAddress(proxyAddress);

    console.log('The current contract owner is: ' + (await upgraded.owner()));
    console.log('Implementation contract address: ' + implementationAddress);
}
// published on Goerli testnet 0xa07d3B3879167EEe3FAC266eA7688B357ED0d97C
main();
