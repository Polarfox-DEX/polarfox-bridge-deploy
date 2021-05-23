const HDWalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require('web3');

const { fujiProvider, devMnemonicPath, safeReadFile } = require('./const');
const { DST_BRIDGE, DST_HANDLER, WAKITA_TOKEN } = require('./bridgeConstants');

const compiledBridge = require('../cb-sol-cli/chainbridge-solidity/build/contracts/Bridge.json');

const devMnemonic = safeReadFile(devMnemonicPath);
console.log("Dev mnemonic OK:", devMnemonic != undefined);

const provider = new HDWalletProvider(
    devMnemonic,
    fujiProvider
);
    
const web3 = new Web3(provider);

const bridge = new web3.eth.Contract(
    compiledBridge.abi,
    DST_BRIDGE
);

const adminSetBurnable = async () => {
    try {
        const accounts = await web3.eth.getAccounts();
    
        console.log('Attempting to call admitSetBurnable() from the account', accounts[0]);
    
        await bridge.methods.adminSetBurnable(
                DST_HANDLER, // Handler address, address
                WAKITA_TOKEN // Token address, address
            )
            .send({
                from: accounts[0]
            });
        
        console.log('Done!');
    }
    catch(error) {
        console.error("An error occurred in admitSetBurnable():\n", error);
    }
};

adminSetBurnable();