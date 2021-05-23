const HDWalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require('web3');

const { rinkebyProvider, devMnemonicPath, safeReadFile } = require('./const');
const { WAKITA_TOKEN, DST_HANDLER } = require('./bridgeConstants');

const compiledERC20 = require('../cb-sol-cli/chainbridge-solidity/build/contracts/ERC20PresetMinterPauser.json');

const devMnemonic = safeReadFile(devMnemonicPath);
console.log("Dev mnemonic OK:", devMnemonic ? true : false);

const provider = new HDWalletProvider(
    devMnemonic,
    rinkebyProvider
);
    
const web3 = new Web3(provider);

const erc20 = new web3.eth.Contract(
    compiledERC20.abi,
    WAKITA_TOKEN
);

const approveDepositDst = async () => {
    try {
        const accounts = await web3.eth.getAccounts();
    
        console.log('Attempting to approve deposit from the account', accounts[0]);

        await erc20.methods.approve(
                DST_HANDLER, // Recipient, address
                100000000000000000000 // Amount, uint256
            )
            .send({
                from: accounts[0]
            });
        
        console.log('Done!');
    }
    catch(error) {
        console.error("An error occurred in approveDepositDst():\n", error);
    }
};

approveDepositDst();