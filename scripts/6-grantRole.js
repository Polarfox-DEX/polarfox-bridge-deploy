const HDWalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require('web3');

const { fujiProvider, devMnemonicPath, safeReadFile } = require('./const');
const { DST_HANDLER, DST_TOKEN } = require('./bridgeConstants');

const compiledERC20 = require('../cb-sol-cli/chainbridge-solidity/build2/contracts/ERC20PresetMinterPauser.json');

const devMnemonic = safeReadFile(devMnemonicPath);
console.log("Dev mnemonic OK:", devMnemonic != undefined);

const provider = new HDWalletProvider(
    devMnemonic,
    fujiProvider
);
    
const web3 = new Web3(provider);

const erc20 = new web3.eth.Contract(
    compiledERC20.abi,
    DST_TOKEN
);

const grantRole = async () => {
    try {
        const accounts = await web3.eth.getAccounts();
    
        console.log('Attempting to grant role from the account', accounts[0]);

        let MINTER_ROLE = await erc20.methods.MINTER_ROLE().call();

        console.log('Minter role:', MINTER_ROLE)
    
        await erc20.methods.grantRole(
                MINTER_ROLE, // Role, bytes32
                DST_HANDLER // Minter, address
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