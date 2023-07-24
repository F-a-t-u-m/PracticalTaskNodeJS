import { Ticket } from '../models/Ticket';
import { fetchTickets } from '../TicketFetcher';

export async function getTicketsForEvent(eventId: string): Promise<Ticket[]> {
  const tickets = await fetchTickets(eventId);

  tickets.sort((a, b) => a.price - b.price);

  return tickets;
}