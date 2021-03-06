import HDWalletProvider from '@truffle/hdwallet-provider'
import Web3 from 'web3'

import { IS_PRODUCTION, PROVIDER, MNEMONIC, safeReadFile } from './const'
import { CHAIN_ID, BRIDGE } from './bridgeConstants'

import erc20Handler from '../../build/ERC20Handler.json'

import tokenList from './tokenList.json'
import testTokenList from './testTokenList.json'

const chainId = IS_PRODUCTION ? CHAIN_ID.AVALANCHE : CHAIN_ID.FUJI
const tokens = IS_PRODUCTION ? tokenList : testTokenList

const devMnemonic = safeReadFile(MNEMONIC)
console.log('Dev mnemonic OK:', devMnemonic != undefined)


const provider = new HDWalletProvider(devMnemonic, PROVIDER[chainId])

const web3 = new Web3(provider)

const deployERC20HandlerAvax = async () => {
    try {
        const accounts = await web3.eth.getAccounts()

        console.log('Attempting to deploy an ERC20 handler from the account', accounts[0])

        const deployedERC20Handler = await new web3.eth.Contract(erc20Handler.abi)
            .deploy({
                data: erc20Handler.bytecode,
                arguments: [
                    BRIDGE[chainId], // Bridge address, address
                    tokens.map((tkn) => tkn.ResourceId), // Initial resource IDs, bytes32[] memory
                    tokens.map((tkn) => tkn.AvalancheTokenAddress), // Initial contract addresses, address[] memory
                    tokens.map((tkn) => tkn.AvalancheTokenAddress) // Burnable contract addresses, address[] memory
                ]
            })
            .send({
                from: accounts[0]
            })

        console.log('ERC20 handler deployed to', deployedERC20Handler.options.address)
    } catch (error) {
        console.error('An error occurred in deployERC20HandlerAvax():\n', error)
    }
}

deployERC20HandlerAvax()
