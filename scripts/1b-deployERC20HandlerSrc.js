const HDWalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require('web3');

const { goerliProvider, devMnemonicPath, safeReadFile } = require('./const');
const { SRC_BRIDGE } = require('./bridgeConstants');

const erc20Handler = require('../cb-sol-cli/chainbridge-solidity/build/contracts/ERC20Handler.json');

const devMnemonic = safeReadFile(devMnemonicPath);
console.log("Dev mnemonic OK:", devMnemonic != undefined);

const provider = new HDWalletProvider(
    devMnemonic,
    goerliProvider
);
    
const web3 = new Web3(provider);

const deployERC20HandlerSrc = async () => {
    try {
        const accounts = await web3.eth.getAccounts();
    
        console.log('Attempting to deploy an ERC20 handler from the account', accounts[0]);
    
        const deployedERC20Handler = await new web3.eth.Contract(erc20Handler.abi)
            .deploy({
                data: '0x' + erc20Handler.evm.bytecode.object,
                arguments: [
                    SRC_BRIDGE, // Bridge address, address
                    [], // Initial resource IDs, bytes32[] memory
                    [], // Initial contract addresses, address[] memory
                    [], // Burnable contract addresses, address[] memory
                ]
            })
            .send({
                from: accounts[0]
            });
        
        console.log('ERC20 handler deployed to', deployedERC20Handler.options.address);
    }
    catch(error) {
        console.error("An error occurred in deployERC20HandlerSrc():\n", error);
    }
};

deployERC20HandlerSrc();