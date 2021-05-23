const ethers = require('ethers');

const SRC_GATEWAY = 'https://rinkeby.infura.io/v3/418e2ad2a59645cab005c2a1712a1873';
const DST_GATEWAY = 'https://avalanche--fuji--rpc.datahub.figment.io/apikey/a3ba277065924a5c20d03c4afac67be8/ext/bc/C/rpc';

const SRC_ADDR = '0x211550Ac42f0E8E82dda7CBC7B0CfCB0C710f954';
const SRC_PK = '';
const DST_ADDR = '0x211550Ac42f0E8E82dda7CBC7B0CfCB0C710f954';
const DST_PK = '';

// AKITA
const AKITA_TOKEN = '0x6838d7704445f9FD4161dEEFC78dA3D29bC58Ee5';
const AKITA_RESOURCE_ID = '0x0000000000000000000000006838d7704445f9FD4161dEEFC78dA3D29bC58Ee5';

const SRC_BRIDGE = '0x5CF90C96142E2d1efd300A687ee6259c59fA3503';
const SRC_HANDLER = '0x1D6e213bEB84f351eAA3354AE2F63Dc87A205953';
const SRC_BRIDGE_FEE = 0 // Fee in ETH, uint256
// const SRC_BRIDGE_FEE = ethers.utils.parseEther(0.01.toString()) // Fee in ETH, uint256

const DST_BRIDGE = '0x0E9bBbF5abD2b44d0219206056Eb675A0Eb26cda';
const DST_HANDLER = '0x019f846ACe85a1b806Ae2764E823fB0E0405B505';
const WAKITA_TOKEN = '0x152176B0076e68172C8bCB73b9754673D565C35e';
const DST_BRIDGE_FEE = 0 // Fee in AVAX, uint256
// const DST_BRIDGE_FEE = ethers.utils.parseEther(0.05.toString()) // Fee in AVAX, uint256

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