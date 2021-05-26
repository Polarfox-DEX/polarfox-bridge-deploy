const HDWalletProvider = require('@truffle/hdwallet-provider')
const Web3 = require('web3')

const { fujiProvider, devMnemonicPath, safeReadFile } = require('./const')
const { WAKITA_NAME, WAKITA_SYMBOL } = require('./bridgeConstants')

const erc20 = require('../cb-sol-cli/chainbridge-solidity/build/contracts/ERC20PresetMinterPauser.json')

const devMnemonic = safeReadFile(devMnemonicPath)
console.log('Dev mnemonic OK:', devMnemonic != undefined)

const provider = new HDWalletProvider(devMnemonic, fujiProvider)

const web3 = new Web3(provider)

const deployERC20Avax = async () => {
  try {
    const accounts = await web3.eth.getAccounts()

    console.log('Attempting to deploy an ERC20 from the account', accounts[0])

    const deployedERC20 = await new web3.eth.Contract(erc20.abi)
      .deploy({
        data: erc20.bytecode,
        arguments: [
          WAKITA_NAME, // Name, string memory
          WAKITA_SYMBOL, // Symbol, string memory
        ],
      })
      .send({
        from: accounts[0],
      })

    console.log('ERC20 deployed to', deployedERC20.options.address)
  } catch (error) {
    console.error('An error occurred in deployERC20Avax():\n', error)
  }
}

deployERC20Avax()
