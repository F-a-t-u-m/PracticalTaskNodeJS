import axios from 'axios';
import cheerio from 'cheerio';
import { Ticket } from './models/Ticket';

const BASE_URL = 'https://my.laphil.com/en/syos2/package/1195';

export async function fetchTickets(eventId: string): Promise<Ticket[]> {
  try {
    const response = await axios.get(`${BASE_URL}/event/${eventId}`);
    const htmlContent = response.data;
    const tickets: Ticket[] = parseTickets(htmlContent);
    return tickets;
  } catch (error) {
    throw new Error('Failed to fetch tickets.');
  }
}

function parseTickets(htmlContent: string): Ticket[] {
  const $ = cheerio.load(htmlContent);
  const tickets: Ticket[] = [];

  $('.ticket-item').each((index, element) => {
    const section = $(element).find('.section').text().trim();
    const row = $(element).find('.row').text().trim();
    const seatNumber = $(element).find('.seat-number').text().trim();
    const priceString = $(element).find('.price').text().trim();
    const price = parseFloat(priceString.replace('$', ''));

    tickets.push({
      section,
      row,
      seatNumber,
      price,
    });
  });

  return tickets;
}