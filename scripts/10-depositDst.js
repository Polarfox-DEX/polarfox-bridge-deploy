const HDWalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require('web3');
const ethers = require('ethers');

const { rinkebyProvider, devMnemonicPath, safeReadFile } = require('./const');
const { DST_BRIDGE, SRC_ADDR, AKITA_RESOURCE_ID, DST_BRIDGE_FEE } = require('./bridgeConstants');

const compiledBridge = require('../cb-sol-cli/chainbridge-solidity/build/contracts/Bridge.json');

const devMnemonic = safeReadFile(devMnemonicPath);
console.log("Dev mnemonic OK:", devMnemonic != undefined);

const provider = new HDWalletProvider(
    devMnemonic,
    rinkebyProvider
);
    
const web3 = new Web3(provider);

const bridge = new web3.eth.Contract(
    compiledBridge.abi,
    DST_BRIDGE
);

const depositDst = async () => {
    const amount = '100000000000000000000'
    const targetChainId = 0 // 0 is the source chain, 1 is the destination chain, 2+ are other future destination chains

    // Create the data
    const data = '0x' +
        ethers.utils.hexZeroPad(ethers.BigNumber.from(amount).toHexString(), 32).substr(2) + // Deposit Amount (32 bytes)
        ethers.utils.hexZeroPad(ethers.utils.hexlify((SRC_ADDR.length - 2)/2), 32).substr(2) + // len(recipientAddress) (32 bytes)
        SRC_ADDR.substr(2); // TODO: Update the SRC_ADDR here. What changes when there are multiple relayers?

    console.log('Data:', data)
    console.log('Data length:', data.length-2)

    try {
        const accounts = await web3.eth.getAccounts();
    
        console.log('Attempting to deposit from the account', accounts[0]);
    
        const tx = await bridge.methods.deposit(
                targetChainId, // destinationChainID, uint8
                AKITA_RESOURCE_ID, // resourceID, bytes32
                data, // data, bytes calldata
            )
            .send({
                from: accounts[0],
                value: DST_BRIDGE_FEE
            });
        
        console.log('Tx block number:', tx.blockNumber);
        console.log('Tx transaction hash:', tx.transactionHash);

        console.log('Done!');
    }
    catch(error) {
        console.error("An error occurred in depositDst():\n", error);
    }
};

depositDst();