# NFT Minting DApp

**1. This project uses hardhat as the dev environment**

       - npm init -y

       - npm add hardhat -D

       - npx hardhat

       - npx hardhat test

**2. Connect Metamask & Alchemy**

- Download and create a Metamask account.

- Once you have an account, make sure to switch to the "Sepolia Test Network".

- Acquire some SepoliaETH from a faucet.

On Alchemy's dashboard:

    1. Hover over the Apps drop-down menu and choose Create App.

    2. Provide a Name and Description for your app.

    3. For Chain, select Ethereum, Network select Sepolia.

    4. Click the Create App button.

    5. Click on app's View Key button in the dashboard and save the API KEY.

**3. Update .env file in the root directory**

      ALCHEMY_API_KEY = "<your-api-key>"

      METAMASK_PRIVATE_KEY = "0x<your-metamask-private-key>"

**4. Deployment script**

scripts/deploy.js

- Provide baseTokenURI - the link of the image that is stored on IPFS

- Pinata used for storing the image.

**5. Compile and Deploy**

       - cd to your root directory

       - npx hardhat compile

       - npx hardhat run scripts/deploy.js --network sepolia

       - make note of the contract deployment address which will be added to App.js

OR

       - Compile and deploy via Remix IDE.

**6. Frontend Implementation**

         - npx create-react-app nft_mint_frontend

         - cd nft_mint_frontend

         - npm start

**7. Getting contract ABI and address**

- To find your ABI file, go to your hardhat project and navigate to

      artifacts\contracts\nftMint.sol\nftMint.json
      
      copy into src/contracts

      Change the contract address in App.js - this is displayed to the console after running step 5

**8. Update src\App.js**

- Modify the UI as desired

- In mintNftHandler - update the mint function - same as your contract mint
  function

**9. Update App.css**

- Style your webpage in src\App.css

**10. Start the development server**

         - cd nft_mint_frontend

         - npm start
