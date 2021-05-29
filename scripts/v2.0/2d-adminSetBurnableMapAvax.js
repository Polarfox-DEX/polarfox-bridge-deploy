import HDWalletProvider from '@truffle/hdwallet-provider'
import Web3 from 'web3'

import { IS_PRODUCTION, PROVIDER, MNEMONIC, safeReadFile } from './const'
import { CHAIN_ID, BRIDGE, ERC20_HANDLER } from './bridgeConstants'

import compiledBridge from '../../build/Bridge.json'

import tokenList from './tokenList.json'
import testTokenList from './testTokenList.json'

const chainId = IS_PRODUCTION ? CHAIN_ID.AVALANCHE : CHAIN_ID.FUJI
const tokens = IS_PRODUCTION ? tokenList : testTokenList

const devMnemonic = safeReadFile(MNEMONIC)
console.log('Dev mnemonic OK:', devMnemonic != undefined)

const provider = new HDWalletProvider(devMnemonic, PROVIDER[chainId])

const web3 = new Web3(provider)

const bridge = new web3.eth.Contract(compiledBridge.abi, BRIDGE[chainId])

const adminSetResourceMapAvax = async () => {
    try {
        const accounts = await web3.eth.getAccounts()

        console.log('Attempting to call adminSetResourceMap() from the account', accounts[0])

        const tx = await bridge.methods
            .adminSetBurnableMap(
                ERC20_HANDLER[chainId], // Handler address, address
                tokens.map((tkn) => tkn.AvalancheTokenAddress) // Token addresses, address[] memory
            )
            .send({
                from: accounts[0]
            })

        console.log('Tx transaction hash:', tx.transactionHash)

        console.log('Done!')
    } catch (error) {
        console.error('An error occurred in adminSetResourceMapAvax():\n', error)
    }
}

adminSetResourceMapAvax()
