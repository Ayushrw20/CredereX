import { Router, Request, Response } from 'express';
import { suiClient } from '../clients/suiClient';

export const router = Router();

router.get('/ping', (_req: Request, res: Response) => {
  res.json({ message: 'pong' });
});

// To get a account balance
router.get('/balance/:address', async (req: Request, res: Response): Promise<void> => {
  const { address } = req.params;
  
  try {
    // Call the sdk
    const balances = await suiClient.getAllBalances({ owner: address });
    res.status(200).json(balances);
  } catch (error: any) {
    console.error('Error fetching balance from external API:', error.message);
    res.status(500).json({ error: 'Failed to fetch balance from external API' });
  }
});

// To get coin data
router.get('/coin/:coinType', async (req: Request, res: Response): Promise<void> => {
  const { coinType } = req.params;

  try {
    // Call the sdk
    const coins = await suiClient.getCoinMetadata({ coinType: coinType });
    res.status(200).json(coins);
  } catch (error: any) {
    console.error('Error fetching coin data from external API:', error.message);
    res.status(500).json({ error: 'Failed to fetch coin data from external API' });
  }
});