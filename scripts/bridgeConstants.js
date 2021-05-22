const ethers = require('ethers');

const SRC_GATEWAY = 'https://goerli-light.eth.linkpool.io/';
const DST_GATEWAY = 'https://avalanche--fuji--rpc.datahub.figment.io/apikey/a3ba277065924a5c20d03c4afac67be8/ext/bc/C/rpc';

const SRC_ADDR = '0x211550Ac42f0E8E82dda7CBC7B0CfCB0C710f954';
const SRC_PK = '';
const DST_ADDR = '0x211550Ac42f0E8E82dda7CBC7B0CfCB0C710f954';
const DST_PK = '';

// AKITA
const AKITA_TOKEN = '0x4cfbaE28B870F5f1F1BCbe6337a2BF67573a72ec';
const AKITA_RESOURCE_ID = '0x0000000000000000000000004cfbaE28B870F5f1F1BCbe6337a2BF67573a72ec';

const SRC_BRIDGE = '';
const SRC_HANDLER = '';
const SRC_BRIDGE_FEE = ethers.utils.parseEther(0.01.toString()) // Fee in ETH, uint256

const DST_BRIDGE = '';
const DST_HANDLER = '';
const DST_TOKEN = '';
const DST_BRIDGE_FEE = ethers.utils.parseEther(0.05.toString()) // Fee in AVAX, uint256

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
    DST_TOKEN,
    DST_BRIDGE_FEE
};