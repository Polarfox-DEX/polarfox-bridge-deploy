import ethers from 'ethers'

export const CHAIN_ID = {
    ETHEREUM: 1,
    RINKEBY: 4,
    AVALANCHE: 43114,
    FUJI: 43113
}

export const BRIDGE_CHAIN_ID = {
    [CHAIN_ID.ETHEREUM]: 0,
    [CHAIN_ID.RINKEBY]: 0,
    [CHAIN_ID.AVALANCHE]: 1,
    [CHAIN_ID.FUJI]: 1
}

export const CHAIN_NAME = {
    [CHAIN_ID.ETHEREUM]: 'Ethereum',
    [CHAIN_ID.RINKEBY]: 'Rinkeby',
    [CHAIN_ID.AVALANCHE]: 'Avalanche',
    [CHAIN_ID.FUJI]: 'Fuji'
}

export const GATEWAY = {
    [CHAIN_ID.ETHEREUM]: 'https://main-light.eth.linkpool.io',
    [CHAIN_ID.RINKEBY]: 'https://rinkeby-light.eth.linkpool.io',
    [CHAIN_ID.AVALANCHE]: 'https://api.avax.network/ext/bc/C/rpc',
    [CHAIN_ID.FUJI]: 'https://api.avax-test.network/ext/bc/C/rpc'
}

// Admin address
export const ADMIN_ADDR = '0x211550Ac42f0E8E82dda7CBC7B0CfCB0C710f954'

// Recipient address
export const RECIPIENT_ADDR = '0x211550Ac42f0E8E82dda7CBC7B0CfCB0C710f954'

// Relayers
export const RELAYERS_ADDR = [
    '0x54e478fe12699206BD5a7a70725847eFe9A540a9',
    '0x5CDa111B9eF48d2ef6D4d7eBf03FE693165230a2',
    '0x774258F08049cA19A5Cd9693625445Bcd5763c30'
]

export const RELAYER_THRESHOLD = 2 // Number of votes needed for a deposit proposal to be considered passed, uint256

// Bridge contracts
export const BRIDGE = {
    [CHAIN_ID.ETHEREUM]: '',
    [CHAIN_ID.RINKEBY]: '0x30a99b1332401DD17f2d6965cD6F67528fEeF6db',
    [CHAIN_ID.AVALANCHE]: '',
    [CHAIN_ID.FUJI]: '0x3D2B58724E59820b3A21164461a70542E56B1D34'
}

export const ERC20_HANDLER = {
    [CHAIN_ID.ETHEREUM]: '',
    [CHAIN_ID.RINKEBY]: '0x9f3196Be8B03bA5818e9B25A51ec2dc99655403b',
    [CHAIN_ID.AVALANCHE]: '',
    [CHAIN_ID.FUJI]: '0xEd9019862407d9311c99d9C7a364fA5387209524'
}

export const ERC721_HANDLER = {
    [CHAIN_ID.ETHEREUM]: '',
    [CHAIN_ID.RINKEBY]: '',
    [CHAIN_ID.AVALANCHE]: '',
    [CHAIN_ID.FUJI]: ''
}

export const BRIDGE_FEE = {
    [CHAIN_ID.ETHEREUM]: ethers.utils.parseEther('0.025'),
    [CHAIN_ID.RINKEBY]: ethers.utils.parseEther('0.01'),
    [CHAIN_ID.AVALANCHE]: ethers.utils.parseEther('4'),
    [CHAIN_ID.FUJI]: ethers.utils.parseEther('0.5')
}

export const EXPIRY = {
    [CHAIN_ID.ETHEREUM]: 100,
    [CHAIN_ID.RINKEBY]: 100,
    [CHAIN_ID.AVALANCHE]: 100,
    [CHAIN_ID.FUJI]: 100
}
