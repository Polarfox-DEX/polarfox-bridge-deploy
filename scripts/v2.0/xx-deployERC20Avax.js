import HDWalletProvider from '@truffle/hdwallet-provider'
import Web3 from 'web3'

import { PROVIDER, MNEMONIC, safeReadFile } from './const'
import { CHAIN_ID } from './bridgeConstants'

import erc20 from '../../build/ERC20PresetMinterPauser.json'

const devMnemonic = safeReadFile(MNEMONIC)
console.log('Dev mnemonic OK:', MNEMONIC != undefined)

const provider = new HDWalletProvider(devMnemonic, PROVIDER[CHAIN_ID.FUJI])

const web3 = new Web3(provider)

const deployERC20Avax = async () => {
    try {
        const accounts = await web3.eth.getAccounts()

        console.log('Attempting to deploy ERC20s from the account', accounts[0])

        const deployedAkita = await new web3.eth.Contract(erc20.abi)
            .deploy({
                data: erc20.bytecode,
                arguments: [
                    'Akita Inu', // Name, string memory
                    'AKITA' // Symbol, string memory
                ]
            })
            .send({
                from: accounts[0]
            })

        const deployedTest1 = await new web3.eth.Contract(erc20.abi)
            .deploy({
                data: erc20.bytecode,
                arguments: [
                    'Test 1', // Name, string memory
                    'TEST1' // Symbol, string memory
                ]
            })
            .send({
                from: accounts[0]
            })

        const deployedTest2 = await new web3.eth.Contract(erc20.abi)
            .deploy({
                data: erc20.bytecode,
                arguments: [
                    'Test 2', // Name, string memory
                    'TEST2' // Symbol, string memory
                ]
            })
            .send({
                from: accounts[0]
            })

        const deployedTest3 = await new web3.eth.Contract(erc20.abi)
            .deploy({
                data: erc20.bytecode,
                arguments: [
                    'Test 3', // Name, string memory
                    'TEST3' // Symbol, string memory
                ]
            })
            .send({
                from: accounts[0]
            })

        const deployedTest4 = await new web3.eth.Contract(erc20.abi)
            .deploy({
                data: erc20.bytecode,
                arguments: [
                    'Test 4', // Name, string memory
                    'TEST4' // Symbol, string memory
                ]
            })
            .send({
                from: accounts[0]
            })

        const deployedTest5 = await new web3.eth.Contract(erc20.abi)
            .deploy({
                data: erc20.bytecode,
                arguments: [
                    'Test 5', // Name, string memory
                    'TEST5' // Symbol, string memory
                ]
            })
            .send({
                from: accounts[0]
            })

        console.log('AKITA deployed to', deployedAkita.options.address)
        console.log('TEST1 deployed to', deployedTest1.options.address)
        console.log('TEST2 deployed to', deployedTest2.options.address)
        console.log('TEST3 deployed to', deployedTest3.options.address)
        console.log('TEST4 deployed to', deployedTest4.options.address)
        console.log('TEST5 deployed to', deployedTest5.options.address)
    } catch (error) {
        console.error('An error occurred in deployERC20Avax():\n', error)
    }
}

deployERC20Avax()
