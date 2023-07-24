import express, { Request, Response } from 'express';
import { getTicketsForEvent } from './services/TicketService';

const app = express();
const port = 5000;

app.get('/tickets/:eventId', async (req: Request, res: Response) => {
  try {
    const eventId = req.params.eventId;
    const tickets = await getTicketsForEvent(eventId);
    res.json(tickets);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});