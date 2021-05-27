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
  [CHAIN_ID.RINKEBY]: '0xA7852b21B7CBB9efe5183FeAFDA4Adb2296Ba425',
  [CHAIN_ID.AVALANCHE]: '',
  [CHAIN_ID.FUJI]: '0xe80003f874a75FB7DB801CFA9ca71b3d5Fa1c3C5'
}

export const ERC20_HANDLER = {
  [CHAIN_ID.ETHEREUM]: '',
  [CHAIN_ID.RINKEBY]: '0x19683A8503d48D2882C2fF6c475b91706e41d1CC',
  [CHAIN_ID.AVALANCHE]: '',
  [CHAIN_ID.FUJI]: '0xE60Fe820b4ce42d400f842f2b1eE4c7dd89085a5'
}

export const ERC721_HANDLER = {
  [CHAIN_ID.ETHEREUM]: '',
  [CHAIN_ID.RINKEBY]: '',
  [CHAIN_ID.AVALANCHE]: '',
  [CHAIN_ID.FUJI]: ''
}

export const BRIDGE_FEE = {
  [CHAIN_ID.ETHEREUM]: ethers.utils.parseEther('0'),
  [CHAIN_ID.RINKEBY]: ethers.utils.parseEther('0.01'),
  [CHAIN_ID.AVALANCHE]: ethers.utils.parseEther('0.5'),
  [CHAIN_ID.FUJI]: ethers.utils.parseEther('0')
}

// TODO: What is this number?
export const EXPIRY = {
  [CHAIN_ID.ETHEREUM]: 100,
  [CHAIN_ID.RINKEBY]: 100,
  [CHAIN_ID.AVALANCHE]: 100,
  [CHAIN_ID.FUJI]: 100
}
