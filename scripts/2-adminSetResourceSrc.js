const HDWalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require('web3');

const { ropstenProvider, devMnemonicPath, safeReadFile } = require('./const');
const { SRC_BRIDGE, SRC_HANDLER, AKITA_TOKEN, AKITA_RESOURCE_ID } = require('./bridgeConstants');

const compiledBridge = require('../cb-sol-cli/chainbridge-solidity/build/contracts/Bridge.json');

const devMnemonic = safeReadFile(devMnemonicPath);
console.log("Dev mnemonic OK:", devMnemonic != undefined);

const provider = new HDWalletProvider(
    devMnemonic,
    ropstenProvider
);
    
const web3 = new Web3(provider);

const bridge = new web3.eth.Contract(
    compiledBridge.abi,
    SRC_BRIDGE
);

const adminSetResource = async () => {
    try {
        const accounts = await web3.eth.getAccounts();
    
        console.log('Attempting to call admitSetResource() from the account', accounts[0]);
    
        await bridge.methods.adminSetResource(
                SRC_HANDLER, // Handler address, address
                AKITA_RESOURCE_ID, // Resource ID, bytes32
                AKITA_TOKEN // Token address, address
            )
            .send({
                from: accounts[0]
            });
        
        console.log('Done!');
    }
    catch(error) {
        console.error("An error occurred in admitSetResource():\n", error);
    }
};

adminSetResource();