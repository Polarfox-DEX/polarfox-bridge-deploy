import HDWalletProvider from '@truffle/hdwallet-provider'
import Web3 from 'web3'

import { IS_PRODUCTION, PROVIDER, MNEMONIC, safeReadFile } from './const'
import { CHAIN_ID, BRIDGE_CHAIN_ID, RELAYERS_ADDR, RELAYER_THRESHOLD, BRIDGE_FEE, EXPIRY } from './bridgeConstants'

import bridge from '../../build/Bridge.json'

const devMnemonic = safeReadFile(MNEMONIC)
console.log('Dev mnemonic OK:', devMnemonic != undefined)

const chainId = IS_PRODUCTION ? CHAIN_ID.ETHEREUM : CHAIN_ID.RINKEBY

const provider = new HDWalletProvider(devMnemonic, PROVIDER[chainId])

const web3 = new Web3(provider)

const deployBridgeEth = async () => {
    try {
        const accounts = await web3.eth.getAccounts()

        console.log('Attempting to deploy a bridge from the account', accounts[0])

        const deployedBridge = await new web3.eth.Contract(bridge.abi)
            .deploy({
                data: bridge.bytecode,
                arguments: [
                    BRIDGE_CHAIN_ID[chainId], // Chain ID, uint8
                    RELAYERS_ADDR, // Initial relayers, address[] memory
                    RELAYER_THRESHOLD, // Number of votes needed for a deposit proposal to be considered passed, uint256
                    BRIDGE_FEE[chainId], // Fee in ETH, uint256
                    EXPIRY[chainId] // Expiry, uint256
                ]
            })
            .send({
                from: accounts[0]
            })

        console.log('Bridge deployed to', deployedBridge.options.address)
    } catch (error) {
        console.error('An error occurred in deployBridgeEth():\n', error)
    }
}

deployBridgeEth()
