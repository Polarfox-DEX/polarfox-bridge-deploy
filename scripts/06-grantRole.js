const HDWalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require('web3');

const { fujiProvider, devMnemonicPath, safeReadFile } = require('./const');
const { AVAX_HANDLER, WAKITA_TOKEN } = require('./bridgeConstants');

const compiledERC20 = require('../cb-sol-cli/chainbridge-solidity/build/contracts/ERC20PresetMinterPauser.json');

const devMnemonic = safeReadFile(devMnemonicPath);
console.log("Dev mnemonic OK:", devMnemonic != undefined);

const provider = new HDWalletProvider(
    devMnemonic,
    fujiProvider
);
    
const web3 = new Web3(provider);

const erc20 = new web3.eth.Contract(
    compiledERC20.abi,
    WAKITA_TOKEN
);

const grantRole = async () => {
    try {
        const accounts = await web3.eth.getAccounts();
    
        console.log('Attempting to grant role from the account', accounts[0]);

        let MINTER_ROLE = await erc20.methods.MINTER_ROLE().call();

        console.log('Minter role:', MINTER_ROLE)
    
        await erc20.methods.grantRole(
                MINTER_ROLE, // Role, bytes32
                AVAX_HANDLER // Minter, address
            )
            .send({
                from: accounts[0]
            });
        
        console.log('Done!');
    }
    catch(error) {
        console.error("An error occurred in grantRole():\n", error);
    }
};

grantRole();