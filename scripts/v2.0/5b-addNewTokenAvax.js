import HDWalletProvider from '@truffle/hdwallet-provider'
import Web3 from 'web3'

import { IS_PRODUCTION, PROVIDER, MNEMONIC, safeReadFile } from './const'
import { CHAIN_ID, BRIDGE, ERC20_HANDLER } from './bridgeConstants'

import compiledBridge from '../../build/Bridge.json'
import compiledErc20 from '../../build/ERC20PresetMinterPauser.json'

// The token to add
const tokenResourceId = '0x000000000000000000000000B7C3EadD882CeD8a511Ec7A891D94d46d24c8e1A'
const tokenAvalancheAddress = '0xC000c59e2EEF1997ba4E1Fd7c5690924D33fDBD7'

const chainId = IS_PRODUCTION ? CHAIN_ID.AVALANCHE : CHAIN_ID.FUJI

const devMnemonic = safeReadFile(MNEMONIC)
console.log('Dev mnemonic OK:', devMnemonic != undefined)

const provider = new HDWalletProvider(devMnemonic, PROVIDER[chainId])

const web3 = new Web3(provider)

const bridge = new web3.eth.Contract(compiledBridge.abi, BRIDGE[chainId])
const erc20Pmp = new web3.eth.Contract(compiledErc20.abi, tokenAvalancheAddress)

const addNewTokenAvax = async () => {
    try {
        const accounts = await web3.eth.getAccounts()

        console.log('Second adminSetResource() call')

        const tx2 = await bridge.methods
            .adminSetResource(
                ERC20_HANDLER[chainId], // Handler address, address
                tokenResourceId, // Resource ID, bytes32
                tokenAvalancheAddress // Token address, address[]
            )
            .send({
                from: accounts[0]
            })

        console.log('Tx transaction hash:', tx2.transactionHash)

        console.log('adminSetBurnable() call')

        const tx3 = await bridge.methods
            .adminSetBurnable(
                ERC20_HANDLER[chainId], // Handler address, address
                tokenAvalancheAddress // Token address, address[]
            )
            .send({
                from: accounts[0]
            })

        console.log('Tx transaction hash:', tx3.transactionHash)

        let MINTER_ROLE = await erc20Pmp.methods.MINTER_ROLE().call()

        console.log('grantRole() call')

        const tx4 = await erc20Pmp.methods
            .grantRole(
                MINTER_ROLE, // Role, bytes32
                ERC20_HANDLER[chainId] // Minter, address
            )
            .send({
                from: accounts[0]
            })

        console.log('Tx transaction hash:', tx4.transactionHash)

        console.log('Done!')
    } catch (error) {
        console.error('An error occurred in addNewTokenAvax():\n', error)
    }
}

addNewTokenAvax()
