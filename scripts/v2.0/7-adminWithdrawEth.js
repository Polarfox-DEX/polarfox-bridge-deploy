import HDWalletProvider from '@truffle/hdwallet-provider'
import ethers from 'ethers'
import Web3 from 'web3'

import { IS_PRODUCTION, PROVIDER, MNEMONIC, safeReadFile } from './const'
import { CHAIN_ID, BRIDGE, ERC20_HANDLER, ADMIN_ADDR } from './bridgeConstants'

import compiledBridge from '../../build/Bridge.json'

const chainId = IS_PRODUCTION ? CHAIN_ID.ETHEREUM : CHAIN_ID.RINKEBY

const devMnemonic = safeReadFile(MNEMONIC)
console.log('Dev mnemonic OK:', devMnemonic != undefined)

const provider = new HDWalletProvider(devMnemonic, PROVIDER[chainId])

const web3 = new Web3(provider)

const bridge = new web3.eth.Contract(compiledBridge.abi, BRIDGE[chainId])

const tokenAddress = '0x6838d7704445f9FD4161dEEFC78dA3D29bC58Ee5' // AKITA
const recipient = ADMIN_ADDR
const amount = '10000000000000000000000' // 10,000

const adminWithdrawEth = async () => {
    try {
        const accounts = await web3.eth.getAccounts()

        console.log('Attempting to call adminWithdraw()...')

        const tx = await bridge.methods
            .adminWithdraw(
                ERC20_HANDLER[chainId], // Handler address, address
                tokenAddress, // Token address, address
                recipient, // Recipient, address
                amount // Amount, uint256
            )
            .send({
                from: accounts[0]
            })

        console.log('Tx transaction hash:', tx.transactionHash)

        console.log('Done!')
    } catch (error) {
        console.error('An error occurred in adminWithdrawEth():\n', error)
    }
}

adminWithdrawEth()
