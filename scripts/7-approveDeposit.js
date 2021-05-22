const HDWalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require('web3');

const { goerliProvider, devMnemonicPath, safeReadFile } = require('./const');
const { AKITA_TOKEN, SRC_HANDLER } = require('./bridgeConstants');

// TODO: Might not work for AKITA
const compiledERC20 = require('../cb-sol-cli/chainbridge-solidity/build/contracts/ERC20.json');

const devMnemonic = safeReadFile(devMnemonicPath);
console.log("Dev mnemonic OK:", devMnemonic != undefined);

const provider = new HDWalletProvider(
    devMnemonic,
    goerliProvider
);
    
const web3 = new Web3(provider);

const erc20 = new web3.eth.Contract(
    compiledERC20.abi,
    AKITA_TOKEN
);

const approveDeposit = async () => {``
    try {
        const accounts = await web3.eth.getAccounts();
    
        console.log('Attempting to approve deposit from the account', accounts[0]);

        await erc20.methods.approve(
                SRC_HANDLER, // Recipient, address
                100000000000 // Amount, uint256
            )
            .send({
                from: accounts[0]
            });
        
        console.log('Done! Success:', success);
    }
    catch(error) {
        console.error("An error occurred in approveDeposit():\n", error);
    }
};

approveDeposit();