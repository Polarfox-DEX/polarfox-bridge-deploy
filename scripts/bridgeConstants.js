const ethers = require('ethers');

const SRC_GATEWAY = 'https://rinkeby-light.eth.linkpool.io';
const DST_GATEWAY = 'https://api.avax-test.network/ext/bc/C/rpc';

const SRC_ADDR = '0x211550Ac42f0E8E82dda7CBC7B0CfCB0C710f954';
const SRC_PK = '';
const DST_ADDR = '0x211550Ac42f0E8E82dda7CBC7B0CfCB0C710f954';
const DST_PK = '';

// AKITA
const AKITA_TOKEN = '0x6838d7704445f9FD4161dEEFC78dA3D29bC58Ee5';
const AKITA_RESOURCE_ID = '0x0000000000000000000000006838d7704445f9FD4161dEEFC78dA3D29bC58Ee5';
const WAKITA_TOKEN = '';

const SRC_BRIDGE = '';
const SRC_HANDLER = '';
const SRC_BRIDGE_FEE = ethers.utils.parseEther('0.01') // Fee in ETH, uint256

const DST_BRIDGE = '';
const DST_HANDLER = '';
const DST_BRIDGE_FEE = ethers.utils.parseEther('5') // Fee in AVAX, uint256

// Export
module.exports = {
    SRC_GATEWAY,
    DST_GATEWAY,
    SRC_ADDR,
    SRC_PK,
    DST_ADDR,
    DST_PK,
    AKITA_TOKEN,
    AKITA_RESOURCE_ID,
    SRC_BRIDGE,
    SRC_HANDLER,
    SRC_BRIDGE_FEE,
    DST_BRIDGE,
    DST_HANDLER,
    WAKITA_TOKEN,
    DST_BRIDGE_FEE
};