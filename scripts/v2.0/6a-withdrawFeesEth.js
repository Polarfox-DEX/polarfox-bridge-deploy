import HDWalletProvider from '@truffle/hdwallet-provider'
import ethers from 'ethers'
import Web3 from 'web3'

import { IS_PRODUCTION, PROVIDER, MNEMONIC, safeReadFile } from './const'
import { CHAIN_ID, BRIDGE, ADMIN_ADDR } from './bridgeConstants'

import compiledBridge from '../../build/Bridge.json'

const chainId = IS_PRODUCTION ? CHAIN_ID.ETHEREUM : CHAIN_ID.RINKEBY

const devMnemonic = safeReadFile(MNEMONIC)
console.log('Dev mnemonic OK:', devMnemonic != undefined)

const provider = new HDWalletProvider(devMnemonic, PROVIDER[chainId])

const web3 = new Web3(provider)

const bridge = new web3.eth.Contract(compiledBridge.abi, BRIDGE[chainId])

const recipients = [ADMIN_ADDR]
const amounts = [ethers.utils.parseEther('0.05')]

const withdrawFeesEth = async () => {
    try {
        const accounts = await web3.eth.getAccounts()

        console.log('Attempting to withdraw fees...')

        const tx = await bridge.methods
            .transferFunds(
                recipients, // Recipients, address payable[] calldata
                amounts // Amounts, uint[] calldata
            )
            .send({
                from: accounts[0]
            })

        console.log('Tx transaction hash:', tx.transactionHash)

        console.log('Done!')
    } catch (error) {
        console.error('An error occurred in withdrawFeesEth():\n', error)
    }
}

withdrawFeesEth()
