const HDWalletProvider = require('@truffle/hdwallet-provider')
const ethers = require('ethers')
const Web3 = require('web3')

const { fujiProvider, devMnemonicPath, safeReadFile } = require('./const')
const {
  RELAYERS_ADDR,
  RELAYER_THRESHOLD,
  AVAX_CHAINID,
  AVAX_EXPIRY,
  AVAX_BRIDGE_FEE,
} = require('./bridgeConstants')

const bridge = require('../../cb-sol-cli/chainbridge-solidity/build/contracts/Bridge.json')

const devMnemonic = safeReadFile(devMnemonicPath)
console.log('Dev mnemonic OK:', devMnemonic != undefined)

const provider = new HDWalletProvider(devMnemonic, fujiProvider)

const web3 = new Web3(provider)

const deployBridgeDst = async () => {
  try {
    const accounts = await web3.eth.getAccounts()

    console.log('Attempting to deploy a bridge from the account', accounts[0])

    const deployedBridge = await new web3.eth.Contract(bridge.abi)
      .deploy({
        data: bridge.bytecode,
        arguments: [
          AVAX_CHAINID, // Chain ID, uint8
          RELAYERS_ADDR, // Initial relayers, address[] memory
          RELAYER_THRESHOLD, // Initial relayer threshold, uint256
          AVAX_BRIDGE_FEE, // Fee in AVAX, uint256
          AVAX_EXPIRY, // Expiry, uint256
        ],
      })
      .send({
        from: accounts[0],
      })

    console.log('Bridge deployed to', deployedBridge.options.address)
  } catch (error) {
    console.error('An error occurred in deployBridgeDst():\n', error)
  }
}

deployBridgeDst()
