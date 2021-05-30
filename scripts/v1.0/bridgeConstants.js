const ethers = require('ethers')

const ETH_GATEWAY = 'https://rinkeby-light.eth.linkpool.io'
const AVAX_GATEWAY = 'https://api.avax-test.network/ext/bc/C/rpc'

// Recipient address
const RECIPIENT_ADDR = '0x211550Ac42f0E8E82dda7CBC7B0CfCB0C710f954'

// Relayers
const RELAYERS_ADDR = [
  '0x54e478fe12699206BD5a7a70725847eFe9A540a9',
  '0x5CDa111B9eF48d2ef6D4d7eBf03FE693165230a2',
  '0x774258F08049cA19A5Cd9693625445Bcd5763c30',
]
const RELAYER_THRESHOLD = 2 // Number of votes needed for a deposit proposal to be considered passed, uint256

// ETH bridge
const ETH_BRIDGE = '0x9E612aB669D1DB19E22a66E2Ca89f2c238a256C8'
const ETH_HANDLER = '0x273C0A938c48CfACCfd915B809DB000B68dC2821'
const ETH_BRIDGE_FEE = ethers.utils.parseEther('0.01') // Fee in ETH, uint256
// const ETH_BRIDGE_FEE = ethers.utils.parseEther('0') // Fee in ETH, uint256
const ETH_CHAINID = 0
const ETH_EXPIRY = 100

// AVAX bridge
const AVAX_BRIDGE = '0x1A6B5000b5C36d9bC36Ce59B3Db0Abb92EFaCF3D'
const AVAX_HANDLER = '0xC02dA1813F0b8209659e244745F34f1644F93505'
const AVAX_BRIDGE_FEE = ethers.utils.parseEther('5') // Fee in AVAX, uint256
// const AVAX_BRIDGE_FEE = ethers.utils.parseEther('0') // Fee in AVAX, uint256
const AVAX_CHAINID = 1
const AVAX_EXPIRY = 100

// AKITA
const AKITA_TOKEN = '0x6838d7704445f9FD4161dEEFC78dA3D29bC58Ee5'
const AKITA_RESOURCE_ID = '0x0000000000000000000000006838d7704445f9FD4161dEEFC78dA3D29bC58Ee5'
const WAKITA_TOKEN = '0x5E644e0D733Ee7a33359E5C1dD207E534B097987'
const WAKITA_NAME = 'Wrapped Akita Inu'
const WAKITA_SYMBOL = 'wAKITA'

// Export
module.exports = {
    ETH_GATEWAY,
    AVAX_GATEWAY,
    RECIPIENT_ADDR,
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
    WAKITA_TOKEN,
    WAKITA_NAME,
    WAKITA_SYMBOL
}
