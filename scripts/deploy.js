const { utils } = require('ethers');

async function main() {

	// Get contract deployer's wallet address
	const [owner] = await ethers.getSigners();

	const contractFactory = await ethers.getContractFactory('MintNFT');

	const myContract = await contractFactory.deploy(owner.address);

	await myContract.deployed();

	console.log('Contract deployed to address:', myContract.address);

}

main()
	.then(() => process.exit(0))
	.catch((error) => {
		console.error(error);
		process.exit(1);
	});
