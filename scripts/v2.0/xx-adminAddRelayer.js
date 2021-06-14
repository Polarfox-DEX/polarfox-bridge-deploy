import HDWalletProvider from '@truffle/hdwallet-provider'
import Web3 from 'web3'

import { IS_PRODUCTION, PROVIDER, MNEMONIC, safeReadFile } from './const'
import { CHAIN_ID, BRIDGE } from './bridgeConstants'

import compiledBridge from '../../build/Bridge.json'

const chainId = IS_PRODUCTION ? CHAIN_ID.AVALANCHE : CHAIN_ID.FUJI

const devMnemonic = safeReadFile(MNEMONIC)
console.log('Dev mnemonic OK:', devMnemonic != undefined)

const provider = new HDWalletProvider(devMnemonic, PROVIDER[chainId])

const web3 = new Web3(provider)

const bridge = new web3.eth.Contract(compiledBridge.abi, BRIDGE[chainId])

const addressesToAdd = [
    '0x7f0345b0Cb645bD4D69664912C4d849B91Ac9Db9',
    '0x7f1329093Efc5f6a0137E181f9dA024282DCa728',
    '0x6E54D1de72b304ffCA758681d6e900Ac94FCe3B5',
    '0x50dAC3109FCa304F95801D7d31C97f353519E214'
]

const adminAddRelayer = async () => {
    try {
        const accounts = await web3.eth.getAccounts()

        console.log('Attempting to call adminAddRelayer() from the account', accounts[0])

        addressesToAdd.map(async (address) => {
            const tx = await bridge.methods
                .adminAddRelayer(
                    address // Address to add, address
                )
                .send({
                    from: accounts[0]
                })

            console.log('Relayer', address, '- Tx transaction hash:', tx.transactionHash)
        })

        console.log('Done!')
    } catch (error) {
        if (!error.contains('addr already has relayer role')) {
            console.error('An error occurred in adminAddRelayer():\n', error)
        }
    }
}

adminAddRelayer()
