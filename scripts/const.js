const fs = require('fs');

// AVAX providers
const avalancheProvider = ''; // TODO: Add
const fujiProvider = 'https://avalanche--fuji--rpc.datahub.figment.io/apikey/9dbc9db32d2aa223eec796262c6339b6/ext/bc/C/rpc';
// const fujiProvider = 'https://api.avax-test.network/ext/bc/C/rpc';

// ETH providers
const ethereumProvider = 'https://mainnet.infura.io/v3/418e2ad2a59645cab005c2a1712a1873';
const ropstenProvider = 'https://ropsten.infura.io/v3/418e2ad2a59645cab005c2a1712a1873';
const rinkebyProvider = 'https://rinkeby.infura.io/v3/418e2ad2a59645cab005c2a1712a1873';
const goerliProvider = 'https://goerli.infura.io/v3/418e2ad2a59645cab005c2a1712a1873';

// Danger zone
const devMnemonicPath = 'C:/Polarfox/mnemonic';
const avaxDevMnemonicPath = '';
const privateKeyPath = '';

// Utilities
function safeReadFile(path) {
    try {
        return fs.readFileSync(path,'utf8');
    }
    catch(error) {
        console.error("An error occurred in safeReadFile(\"" + path + "\"):\n", error);
    }
}

// Export
module.exports = {
    avalancheProvider,
    fujiProvider,
    ethereumProvider,
    ropstenProvider,
    rinkebyProvider,
    goerliProvider,
    devMnemonicPath,
    avaxDevMnemonicPath,
    safeReadFile
};