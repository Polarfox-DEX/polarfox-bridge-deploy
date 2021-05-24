const ethers = require('ethers')

const ETH_GATEWAY = 'https://rinkeby-light.eth.linkpool.io'
const AVAX_GATEWAY = 'https://api.avax-test.network/ext/bc/C/rpc'

// Relayers
const RELAYERS_ADDR = [
  '0x54e478fe12699206BD5a7a70725847eFe9A540a9',
  '0x5CDa111B9eF48d2ef6D4d7eBf03FE693165230a2',
  '0x774258F08049cA19A5Cd9693625445Bcd5763c30',
]
const RELAYER_THRESHOLD = 2 // Number of votes needed for a deposit proposal to be considered passed, uint256

// ETH bridge
const ETH_BRIDGE = ''
const ETH_HANDLER = ''
const ETH_BRIDGE_FEE = ethers.utils.parseEther('0.01') // Fee in ETH, uint256
const ETH_CHAINID = 0
const ETH_EXPIRY = 100 // TODO: What is this number?

// AVAX bridge
const AVAX_BRIDGE = ''
const AVAX_HANDLER = ''
const AVAX_BRIDGE_FEE = ethers.utils.parseEther('5') // Fee in AVAX, uint256
const AVAX_CHAINID = 1
const AVAX_EXPIRY = 100 // TODO: What is this number?

// AKITA
const AKITA_TOKEN = '0x6838d7704445f9FD4161dEEFC78dA3D29bC58Ee5'
const AKITA_RESOURCE_ID = '0x0000000000000000000000006838d7704445f9FD4161dEEFC78dA3D29bC58Ee5'
const WAKITA_TOKEN = ''

// ETH
// TODO: ETH might have a special status
// TODO: Check the address of WETH on Pangolin and Zero, see if it's the same

// Export
module.exports = {
    ETH_GATEWAY,
    AVAX_GATEWAY,
    RELAYERS_ADDR,
    RELAYER_THRESHOLD,
    ETH_BRIDGE,
    ETH_HANDLER,
    ETH_BRIDGE_FEE,
    ETH_CHAINID,
    ETH_EXPIRY,
    AVAX_BRIDGE,
    AVAX_HANDLER,
    AVAX_BRIDGE_FEE,
    AVAX_CHAINID,
    AVAX_EXPIRY,
    AKITA_TOKEN,
    AKITA_RESOURCE_ID,
    WAKITA_TOKEN
}
