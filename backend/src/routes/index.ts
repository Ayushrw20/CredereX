import { Router, Request, Response } from 'express';
import axios from 'axios';

export const router = Router();

router.get('/ping', (_req: Request, res: Response) => {
  res.json({ message: 'pong' });
});

// To get a account balance
router.get('/balance/:address', async (req: Request, res: Response): Promise<void> => {
  const { address } = req.params;
  
  const EXTERNAL_API_URL = process.env.SUI_RPC_URL;

  if (!EXTERNAL_API_URL) {
    res.status(500).json({ error: 'External API URL not configured' });
    return;
  }

  try {
    // Prepare the request body with the address
    const requestBody = {
      jsonrpc: "2.0",
      id: 1,
      method: "suix_getAllBalances",
      params: [address]
    };

    // Make the API call using the constructed request body
    const apiResponse = await axios.post(EXTERNAL_API_URL, requestBody);
    res.status(apiResponse.status).json(apiResponse.data);
  } catch (error: any) {
    console.error('Error fetching balance from external API:', error.message);
    res.status(500).json({ error: 'Failed to fetch balance from external API' });
  }
});

// To get coin data
router.get('/coin/:coinType', async (req: Request, res: Response): Promise<void> => {
  const { coinType } = req.params;
  
  const EXTERNAL_API_URL = process.env.SUI_RPC_URL;

  if (!EXTERNAL_API_URL) {
    res.status(500).json({ error: 'External API URL not configured' });
    return;
  }

  try {
    // Prepare the request body with the address
    const requestBody = {
      jsonrpc: "2.0",
      id: 1,
      method: "suix_getCoinMetadata",
      params: [coinType]
    };

    // Make the API call using the constructed request body
    const apiResponse = await axios.post(EXTERNAL_API_URL, requestBody);
    res.status(apiResponse.status).json(apiResponse.data);
  } catch (error: any) {
    console.error('Error fetching coin data from external API:', error.message);
    res.status(500).json({ error: 'Failed to fetch coin data from external API' });
  }
});