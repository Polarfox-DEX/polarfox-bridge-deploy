const HDWalletProvider = require('@truffle/hdwallet-provider')
const Web3 = require('web3')
const ethers = require('ethers')

const { rinkebyProvider, devMnemonicPath, safeReadFile } = require('./const')
const { ETH_BRIDGE, RECIPIENT_ADDR, AKITA_RESOURCE_ID, ETH_BRIDGE_FEE, AVAX_CHAINID } = require('./bridgeConstants')

const compiledBridge = require('../../build/Bridge.json')

const devMnemonic = safeReadFile(devMnemonicPath)
console.log('Dev mnemonic OK:', devMnemonic != undefined)

const provider = new HDWalletProvider(devMnemonic, rinkebyProvider)

const web3 = new Web3(provider)

const bridge = new web3.eth.Contract(compiledBridge.abi, ETH_BRIDGE)

const depositEth = async () => {
  const amount = '10000000000000000000000'

  // Create the data
  const data =
    '0x' +
    ethers.utils.hexZeroPad(ethers.BigNumber.from(amount).toHexString(), 32).substr(2) + // Deposit Amount (32 bytes)
    ethers.utils.hexZeroPad(ethers.utils.hexlify((RECIPIENT_ADDR.length - 2) / 2), 32).substr(2) + // len(recipientAddress) (32 bytes)
    RECIPIENT_ADDR.substr(2)

  console.log('Data:', data)
  console.log('Data length:', data.length - 2)

  try {
    const accounts = await web3.eth.getAccounts()

    console.log('Attempting to deposit from the account', accounts[0])

    const tx = await bridge.methods
      .deposit(
        AVAX_CHAINID, // destinationChainID, uint8
        AKITA_RESOURCE_ID, // resourceID, bytes32
        data // data, bytes calldata
      )
      .send({
        from: accounts[0],
        value: ETH_BRIDGE_FEE,
      })

    console.log('Tx block number:', tx.blockNumber)
    console.log('Tx transaction hash:', tx.transactionHash)

    console.log('Done!')
  } catch (error) {
    console.error('An error occurred in depositEth():\n', error)
  }
}

depositEth()
