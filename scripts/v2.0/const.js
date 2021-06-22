import fs from 'fs'
import { CHAIN_ID } from './bridgeConstants.js'

// Is production
export const IS_PRODUCTION = false

// Providers
export const PROVIDER = {
    [CHAIN_ID.ETHEREUM]: 'https://mainnet.infura.io/v3/418e2ad2a59645cab005c2a1712a1873',
    [CHAIN_ID.RINKEBY]: 'https://rinkeby.infura.io/v3/418e2ad2a59645cab005c2a1712a1873',
    [CHAIN_ID.AVALANCHE]: 'https://api.avax.network/ext/bc/C/rpc',
    [CHAIN_ID.FUJI]: 'https://api.avax-test.network/ext/bc/C/rpc'
}

// Danger zone
export const MNEMONIC = 'C:/Polarfox/mnemonic'

// Utilities
export function safeReadFile(path) {
    try {
        return fs.readFileSync(path, 'utf8').trim()
    } catch (error) {
        console.error('An error occurred in safeReadFile("' + path + '"):\n', error)
    }
}
