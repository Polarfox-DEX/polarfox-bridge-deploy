const HDWalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require('web3');

const { fujiProvider, devMnemonicPath, safeReadFile } = require('./const');
const { WAKITA_TOKEN, AVAX_HANDLER } = require('./bridgeConstants');

const compiledERC20 = require('../../build/ERC20PresetMinterPauser.json');

const devMnemonic = safeReadFile(devMnemonicPath);
console.log("Dev mnemonic OK:", devMnemonic ? true : false);

const provider = new HDWalletProvider(
    devMnemonic,
    fujiProvider
);
    
const web3 = new Web3(provider);

const erc20 = new web3.eth.Contract(
    compiledERC20.abi,
    WAKITA_TOKEN
);

const approveDepositAvax = async () => {
    try {
        const accounts = await web3.eth.getAccounts();
    
        console.log('Attempting to approve deposit from the account', accounts[0]);

        const tx = await erc20.methods.approve(
                AVAX_HANDLER, // Recipient, address
                '1000000000000000000000' // Amount, uint256
            )
            .send({
                from: accounts[0]
            });

        console.log('Tx block number:', tx.blockNumber);
        console.log('Tx transaction hash:', tx.transactionHash);

        console.log('Done!');
    }
    catch(error) {
        console.error("An error occurred in approveDepositAvax():\n", error);
    }
};

approveDepositAvax();