import express from 'express';
import dotenv from 'dotenv';
import { router } from './routes';

dotenv.config();

// Check that SUI_RPC_URL is set in .env file
// This is important for the backend to communicate with the Sui network
// and should be set to a valid RPC URL.
// You can set this in your .env file like:
// SUI_RPC_URL=https://fullnode.devnet.sui.io:443
// or any other valid Sui RPC URL.
if (!process.env.SUI_RPC_URL) {
  console.error('Error: SUI_RPC_URL is not set in .env');
  process.exit(1);
}

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Routes
app.use('/api', router);

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
