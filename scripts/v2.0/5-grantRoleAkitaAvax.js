import HDWalletProvider from '@truffle/hdwallet-provider'
import Web3 from 'web3'

import { IS_PRODUCTION, PROVIDER, MNEMONIC, safeReadFile } from './const'
import { ERC20_HANDLER, CHAIN_ID, AKITA } from './bridgeConstants'

import compiledErc20 from '../../cb-sol-cli/chainbridge-solidity/build/contracts/ERC20PresetMinterPauser.json'

const devMnemonic = safeReadFile(MNEMONIC)
console.log('Dev mnemonic OK:', devMnemonic != undefined)

const chainId = IS_PRODUCTION ? CHAIN_ID.AVALANCHE : CHAIN_ID.FUJI

const provider = new HDWalletProvider(devMnemonic, PROVIDER[chainId])

const web3 = new Web3(provider)

const erc20 = new web3.eth.Contract(compiledErc20.abi, AKITA[chainId])

const grantRoleAkitaAvax = async () => {
    try {
        const accounts = await web3.eth.getAccounts()

        console.log('Attempting to grant role from the account', accounts[0])

        let MINTER_ROLE = await erc20.methods.MINTER_ROLE().call()

        console.log('Minter role:', MINTER_ROLE)

        const tx = await erc20.methods
            .grantRole(
                MINTER_ROLE, // Role, bytes32
                ERC20_HANDLER[chainId] // Minter, address
            )
            .send({
                from: accounts[0]
            })

        console.log('Tx block number:', tx.blockNumber)
        console.log('Tx transaction hash:', tx.transactionHash)

        console.log('Done!')
    } catch (error) {
        console.error('An error occurred in grantRoleAkitaAvax():\n', error)
    }
}

grantRoleAkitaAvax()
