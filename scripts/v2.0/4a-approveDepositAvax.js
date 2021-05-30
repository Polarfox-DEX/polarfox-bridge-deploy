import HDWalletProvider from '@truffle/hdwallet-provider'
import Web3 from 'web3'

import { IS_PRODUCTION, PROVIDER, MNEMONIC, safeReadFile } from './const'
import { CHAIN_ID, ERC20_HANDLER } from './bridgeConstants'

import compiledERC20 from '../../build/ERC20.json'

import tokenList from './tokenList.json'
import testTokenList from './testTokenList.json'

const tokens = IS_PRODUCTION ? tokenList : testTokenList
const chainId = IS_PRODUCTION ? CHAIN_ID.AVALANCHE : CHAIN_ID.FUJI

const devMnemonic = safeReadFile(MNEMONIC)
console.log('Dev mnemonic OK:', devMnemonic != undefined)

const provider = new HDWalletProvider(devMnemonic, PROVIDER[chainId])

const web3 = new Web3(provider)

const approveDepositAvax = async () => {
    try {
        const accounts = await web3.eth.getAccounts()

        console.log('Attempting to approve deposit from the account', accounts[0])

        tokens.map(async (tkn) => await approveDeposit(tkn, accounts))
    } catch (error) {
        console.error('An error occurred in approveDepositAvax():\n', error)
    }
}

async function approveDeposit(token, accounts) {
    const erc20 = new web3.eth.Contract(compiledERC20.abi, token.AvalancheTokenAddress)

    const tx = await erc20.methods
        .approve(
            ERC20_HANDLER[chainId], // Recipient, address
            '1000000000000000000000' // Amount, uint256
        )
        .send({
            from: accounts[0]
        })

    console.log(token.AvalancheTokenName, '- tx transaction hash:', tx.transactionHash)
    console.log('')
}

approveDepositAvax()
