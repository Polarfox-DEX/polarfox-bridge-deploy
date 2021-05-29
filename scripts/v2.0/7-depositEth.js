import HDWalletProvider from '@truffle/hdwallet-provider'
import Web3 from 'web3'
import ethers from 'ethers'

import { IS_PRODUCTION, PROVIDER, MNEMONIC, safeReadFile } from './const'
import { CHAIN_ID, BRIDGE_CHAIN_ID, BRIDGE, RECIPIENT_ADDR, BRIDGE_FEE } from './bridgeConstants'

import compiledBridge from '../../build/Bridge.json'

import tokenList from './tokenList.json'
import testTokenList from './testTokenList.json'

const tokens = IS_PRODUCTION ? tokenList : testTokenList
const chainId = IS_PRODUCTION ? CHAIN_ID.ETHEREUM : CHAIN_ID.RINKEBY
const targetChainId = IS_PRODUCTION ? CHAIN_ID.AVALANCHE : CHAIN_ID.FUJI

const devMnemonic = safeReadFile(MNEMONIC)
console.log('Dev mnemonic OK:', devMnemonic != undefined)

const provider = new HDWalletProvider(devMnemonic, PROVIDER[chainId])

const web3 = new Web3(provider)

const bridge = new web3.eth.Contract(compiledBridge.abi, BRIDGE[chainId])

const depositEth = async () => {
    const amount = '10000000000000000000000'

    // Create the data
    const data =
        '0x' +
        ethers.utils.hexZeroPad(ethers.BigNumber.from(amount).toHexString(), 32).substr(2) + // Deposit Amount (32 bytes)
        ethers.utils.hexZeroPad(ethers.utils.hexlify((RECIPIENT_ADDR.length - 2) / 2), 32).substr(2) + // len(recipientAddress) (32 bytes)
        RECIPIENT_ADDR.substr(2)

    console.log('Data:', data)
    console.log('Data length:', data.length - 2)

    try {
        const accounts = await web3.eth.getAccounts()

        console.log('Attempting to deposit from the account', accounts[0])

        tokens.map(async (tkn) => await deposit(tkn, accounts, data))

        console.log('Done!')
    } catch (error) {
        console.error('An error occurred in depositEth():\n', error)
    }
}

async function deposit(token, accounts, data) {
    const tx = await bridge.methods
        .deposit(
            BRIDGE_CHAIN_ID[targetChainId], // destinationChainID, uint8
            token.ResourceId, // resourceID, bytes32
            data // data, bytes calldata
        )
        .send({
            from: accounts[0],
            value: BRIDGE_FEE[chainId]
        })

    console.log('-', token.EthereumTokenName, '-')
    console.log('Tx block number:', tx.blockNumber)
    console.log('Tx transaction hash:', tx.transactionHash)
    console.log('')
}

depositEth()
