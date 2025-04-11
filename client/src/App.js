import { useEffect, useState } from 'react';
import './App.css';
import contractNFT from './contracts/MintNFT.json';
import { ethers } from 'ethers';

// change the contract addresses after each deployment
const contractAddressNFT = '0x686118866Ef0361093E5427bC96Ab694a012a320';
const abi = contractNFT.abi;

function App() {
	const [message, setMessage] = useState('');
	const [currentAccount, setCurrentAccount] = useState(null);

	const checkWalletIsConnected = async () => {
		const { ethereum } = window;
		if (!ethereum) {
			console.log('🦊 Install the Metamask browser extension.');
			return;
		} else {
			setMessage('Wallet exists.');
		}
		const accounts = await ethereum.request({ method: 'eth_accounts' });
		if (accounts.length !== 0) {
			const account = accounts[0];
			setMessage('Using first account in wallet as default.');
			setCurrentAccount(account);
		} else {
			setMessage('❗ No authorized account found.');
		}
	};

	const connectWalletHandler = async () => {
		const { ethereum } = window;
		if (!ethereum) {
			setMessage('🦊 Install the Metamask browser extension.');
		}
		try {
			const accounts = await ethereum.request({
				method: 'eth_requestAccounts',
			});
			setMessage('Using first account in wallet as default.');
			setCurrentAccount(accounts[0]);
		} catch (err) {
			console.log(err);
		}
	};

	const mintNftHandler = async () => {
		try {
			const { ethereum } = window;
			if (ethereum) {
				const provider = new ethers.providers.Web3Provider(ethereum);
				const signer = provider.getSigner();
				const nftContract = new ethers.Contract(contractAddressNFT, abi, signer);
				setMessage('Authorize payment to mint NFT.');
				let nftTxn = await nftContract.mintNFT(currentAccount, 'https://amaranth-hidden-mastodon-476.mypinata.cloud/ipfs/bafkreic7jpftx6vpe4loa3ywivrzibw7eqdf3gsldqkqm3esc25fjvmexq');
				setMessage('Validating...');
				await nftTxn.wait();
				setMessage(`🔎 Etherscan tx: ${nftTxn.hash}`
				);
			} else {
				setMessage('🦊 Install the Metamask browser extension.');
			}
		} catch (err) {
			console.log(err);
		}
	};

	const connectWalletButton = () => {
		return (
			<div>
				<button
					onClick={connectWalletHandler}
					className='cta-button connect-wallet-button'>
					Connect Wallet
				</button>
			</div>
		);
	};

	const mintNftButton = () => {
		return (
			<div>
				<h3>🦊 Account Address: {currentAccount}</h3>
				<button onClick={mintNftHandler} className='cta-button mint-nft-button'>
					Mint NFT
				</button>
			</div>
		);
	};

	useEffect(() => {
		checkWalletIsConnected();
	}, []);

	return (
		<div className='card'>
			<div className='header'>
				<h3 className='text-color'>Sepolia NFT Minter</h3>
			</div>
			<hr></hr>
			<div className='container'>
				{currentAccount ? mintNftButton() : connectWalletButton()}
			</div>
			<div>
				<hr></hr>
				<h4>{message}</h4>
			</div>
		</div>
	);
}

export default App;
