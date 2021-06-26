import HDWalletProvider from '@truffle/hdwallet-provider'
import Web3 from 'web3'

import { IS_PRODUCTION, PROVIDER, MNEMONIC, safeReadFile } from './const'
import { CHAIN_ID, BRIDGE } from './bridgeConstants'

import compiledBridge from '../../build/Bridge.json'

// const chainId = IS_PRODUCTION ? CHAIN_ID.ETHEREUM : CHAIN_ID.RINKEBY
const chainId = IS_PRODUCTION ? CHAIN_ID.AVALANCHE : CHAIN_ID.FUJI

const devMnemonic = safeReadFile(MNEMONIC)
console.log('Dev mnemonic OK:', devMnemonic != undefined)

const provider = new HDWalletProvider(devMnemonic, PROVIDER[chainId])

const web3 = new Web3(provider)

const bridge = new web3.eth.Contract(compiledBridge.abi, BRIDGE[chainId])

const adminChangeRelayerThreshold = async () => {
    try {
        const accounts = await web3.eth.getAccounts()

        console.log('Attempting to call adminChangeRelayerThreshold() from the account', accounts[0])

        await bridge.methods
            .adminChangeRelayerThreshold(
                1 // New threshold
            )
            .send({
                from: accounts[0]
            })

        console.log('Done!')
    } catch (error) {
        if (!error.contains('addr already has relayer role')) {
            console.error('An error occurred in adminChangeRelayerThreshold():\n', error)
        }
    }
}

adminChangeRelayerThreshold()
