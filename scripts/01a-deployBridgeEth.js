const HDWalletProvider = require('@truffle/hdwallet-provider')
const Web3 = require('web3')

const { rinkebyProvider, devMnemonicPath, safeReadFile } = require('./const')
const { ETH_CHAINID, RELAYERS_ADDR, RELAYER_THRESHOLD, ETH_BRIDGE_FEE, ETH_EXPIRY } = require('./bridgeConstants')

const bridge = require('../cb-sol-cli/chainbridge-solidity/build/contracts/Bridge.json')

const devMnemonic = safeReadFile(devMnemonicPath)
console.log('Dev mnemonic OK:', devMnemonic != undefined)

const provider = new HDWalletProvider(devMnemonic, rinkebyProvider)

const web3 = new Web3(provider)

const deployBridgeSrc = async () => {
  try {
    const accounts = await web3.eth.getAccounts()

    console.log('Attempting to deploy a bridge from the account', accounts[0])

    const deployedBridge = await new web3.eth.Contract(bridge.abi)
      .deploy({
        data: bridge.bytecode,
        arguments: [
          ETH_CHAINID, // Chain ID, uint8
          RELAYERS_ADDR, // Initial relayers, address[] memory
          RELAYER_THRESHOLD, // Number of votes needed for a deposit proposal to be considered passed, uint256
          ETH_BRIDGE_FEE, // Fee in ETH, uint256
          ETH_EXPIRY, // Expiry, uint256
        ],
      })
      .send({
        from: accounts[0],
      })

    console.log('Bridge deployed to', deployedBridge.options.address)
  } catch (error) {
    console.error('An error occurred in deployBridgeSrc():\n', error)
  }
}

deployBridgeSrc()
