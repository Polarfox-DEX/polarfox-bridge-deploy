const HDWalletProvider = require('@truffle/hdwallet-provider');
const ethers = require('ethers');
const Web3 = require('web3');

const { goerliProvider, devMnemonicPath, safeReadFile } = require('./const');
const { SRC_ADDR } = require('./bridgeConstants');

const bridge = require('../cb-sol-cli/chainbridge-solidity/build/contracts/Bridge.json');

const devMnemonic = safeReadFile(devMnemonicPath);
console.log("Dev mnemonic OK:", devMnemonic != undefined);

const provider = new HDWalletProvider(
    devMnemonic,
    goerliProvider
);
    
const web3 = new Web3(provider);

const deployBridgeSrc = async () => {
    try {
        const accounts = await web3.eth.getAccounts();
    
        console.log('Attempting to deploy a bridge from the account', accounts[0]);
    
        const deployedBridge = await new web3.eth.Contract(bridge.abi)
            .deploy({
                data: '0x' + bridge.evm.bytecode.object,
                arguments: [
                    0, // Chain ID, uint8
                    [ SRC_ADDR ], // Initial relayers, address[] memory
                    1, // Initial relayer threshold, uint256
                    ethers.utils.parseEther(
                        0.01 // Fee in ETH, uint256
                    .toString()),
                    100 // Expiry, uint256
                ]
            })
            .send({
                from: accounts[0]
            });
        
        console.log('Bridge deployed to', deployedBridge.options.address);
    }
    catch(error) {
        console.error("An error occurred in deployBridgeSrc():\n", error);
    }
};

deployBridgeSrc();