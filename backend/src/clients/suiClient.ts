import { SuiClient } from '@mysten/sui/client';


// create a new SuiClient object pointing to the network you want to use
const rpcUrl = process.env.SUI_RPC_URL
if (!rpcUrl) {
    throw new Error('SUI_RPC_URL is not set in .env');
}
export const suiClient = new SuiClient({ url: rpcUrl });
