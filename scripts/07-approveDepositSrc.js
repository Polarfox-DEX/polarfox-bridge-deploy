const HDWalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require('web3');

const { ropstenProvider, devMnemonicPath, safeReadFile } = require('./const');
const { AKITA_TOKEN, SRC_HANDLER } = require('./bridgeConstants');

const compiledERC20 = require('../cb-sol-cli/chainbridge-solidity/build/contracts/ERC20.json');

const devMnemonic = safeReadFile(devMnemonicPath);
console.log("Dev mnemonic OK:", devMnemonic != undefined);

const provider = new HDWalletProvider(
    devMnemonic,
    ropstenProvider
);
    
const web3 = new Web3(provider);

const erc20 = new web3.eth.Contract(
    compiledERC20.abi,
    AKITA_TOKEN
);

const approveDepositSrc = async () => {
    try {
        const accounts = await web3.eth.getAccounts();
    
        console.log('Attempting to approve deposit from the account', accounts[0]);

        await erc20.methods.approve(
                SRC_HANDLER, // Recipient, address
                100000000000000000000 // Amount, uint256
            )
            .send({
                from: accounts[0]
            });
        
        console.log('Done!');
    }
    catch(error) {
        console.error("An error occurred in approveDepositSrc():\n", error);
    }
};

approveDepositSrc();