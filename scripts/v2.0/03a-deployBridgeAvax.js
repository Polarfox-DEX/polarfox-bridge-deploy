import HDWalletProvider from '@truffle/hdwallet-provider'
import Web3 from 'web3'

import { IS_PRODUCTION, PROVIDER, MNEMONIC, safeReadFile } from './const'
import { CHAIN_ID, BRIDGE_CHAIN_ID, RELAYERS_ADDR, RELAYER_THRESHOLD, EXPIRY, BRIDGE_FEE } from './bridgeConstants'

import bridge from '../../cb-sol-cli/chainbridge-solidity/build/contracts/Bridge.json'

const devMnemonic = safeReadFile(MNEMONIC)
console.log('Dev mnemonic OK:', devMnemonic != undefined)

const chainId = IS_PRODUCTION ? CHAIN_ID.AVALANCHE : CHAIN_ID.FUJI

const provider = new HDWalletProvider(devMnemonic, PROVIDER[chainId])

const web3 = new Web3(provider)

const deployBridgeDst = async () => {
  try {
    const accounts = await web3.eth.getAccounts()

    console.log('Attempting to deploy a bridge from the account', accounts[0])

    const deployedBridge = await new web3.eth.Contract(bridge.abi)
      .deploy({
        data: bridge.bytecode,
        arguments: [
          BRIDGE_CHAIN_ID[chainId], // Chain ID, uint8
          RELAYERS_ADDR, // Initial relayers, address[] memory
          RELAYER_THRESHOLD, // Initial relayer threshold, uint256
          BRIDGE_FEE[chainId], // Fee in AVAX, uint256
          EXPIRY[chainId] // Expiry, uint256
        ]
      })
      .send({
        from: accounts[0]
      })

    console.log('Bridge deployed to', deployedBridge.options.address)
  } catch (error) {
    console.error('An error occurred in deployBridgeDst():\n', error)
  }
}

deployBridgeDst()
