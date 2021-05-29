import HDWalletProvider from '@truffle/hdwallet-provider'
import Web3 from 'web3'

import { IS_PRODUCTION, PROVIDER, MNEMONIC, safeReadFile } from './const'
import { ERC20_HANDLER, CHAIN_ID } from './bridgeConstants'

import compiledErc20 from '../../build/ERC20PresetMinterPauser.json'

import tokenList from './tokenList.json'
import testTokenList from './testTokenList.json'

const devMnemonic = safeReadFile(MNEMONIC)
console.log('Dev mnemonic OK:', devMnemonic != undefined)

const tokens = IS_PRODUCTION ? tokenList : testTokenList
const chainId = IS_PRODUCTION ? CHAIN_ID.AVALANCHE : CHAIN_ID.FUJI

const provider = new HDWalletProvider(devMnemonic, PROVIDER[chainId])

const web3 = new Web3(provider)

const grantRoleAvax = async () => {
    try {
        const accounts = await web3.eth.getAccounts()

        console.log('Attempting to grant role from the account', accounts[0])

        tokens.map(async (tkn) => await grantRoleErc20Pmp(tkn, accounts))

        console.log('Done!')
    } catch (error) {
        console.error('An error occurred in grantRoleAvax():\n', error)
    }
}

async function grantRoleErc20Pmp(token, accounts) {
    console.log('Handling token', token.AvalancheTokenAddress)

    const erc20Pmp = new web3.eth.Contract(compiledErc20.abi, token.AvalancheTokenAddress)

    let MINTER_ROLE = await erc20Pmp.methods.MINTER_ROLE().call()

    const tx = await erc20Pmp.methods
        .grantRole(
            MINTER_ROLE, // Role, bytes32
            ERC20_HANDLER[chainId] // Minter, address
        )
        .send({
            from: accounts[0]
        })

    console.log('Tx transaction hash:', tx.transactionHash)
    console.log('')
}

grantRoleAvax()
