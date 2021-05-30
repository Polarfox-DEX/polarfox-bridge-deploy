import HDWalletProvider from '@truffle/hdwallet-provider'
import Web3 from 'web3'

import { IS_PRODUCTION, PROVIDER, MNEMONIC, safeReadFile } from './const'
import { CHAIN_ID, BRIDGE, ERC20_HANDLER } from './bridgeConstants'

import compiledBridge from '../../build/Bridge.json'

const chainId = IS_PRODUCTION ? CHAIN_ID.ETHEREUM : CHAIN_ID.RINKEBY

const devMnemonic = safeReadFile(MNEMONIC)
console.log('Dev mnemonic OK:', devMnemonic != undefined)

const provider = new HDWalletProvider(devMnemonic, PROVIDER[chainId])

const web3 = new Web3(provider)

const bridge = new web3.eth.Contract(compiledBridge.abi, BRIDGE[chainId])

// The token to add
const tokenResourceId = '0x000000000000000000000000B7C3EadD882CeD8a511Ec7A891D94d46d24c8e1A'
const tokenEthereumAddress = '0xB7C3EadD882CeD8a511Ec7A891D94d46d24c8e1A'

const addNewTokenEth = async () => {
    try {
        const accounts = await web3.eth.getAccounts()

        console.log('First adminSetResource() call')

        const tx1 = await bridge.methods
            .adminSetResource(
                ERC20_HANDLER[chainId], // Handler address, address
                tokenResourceId, // Resource ID, bytes32
                tokenEthereumAddress // Token address, address[]
            )
            .send({
                from: accounts[0]
            })

        console.log('Tx transaction hash:', tx1.transactionHash)

        console.log('Done!')
    } catch (error) {
        console.error('An error occurred in addNewTokenEth():\n', error)
    }
}

addNewTokenEth()
