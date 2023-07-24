import { ApolloServer, gql } from 'apollo-server-express';
import { getTicketsForEvent } from './services/TicketService';
import { Ticket } from './models/Ticket';

const typeDefs = gql`
  type Ticket {
    section: String
    row: String
    seatNumber: String
    price: Float
  }

  type Query {
    tickets(eventId: String!): [Ticket]
  }
`;

const resolvers = {
	Query: {
		tickets: async (_: any, { eventId }: { eventId: string }): Promise<Ticket[]> => {
			const tickets = await getTicketsForEvent(eventId);
			return tickets;
		},
	},
};

const server = new ApolloServer({ typeDefs, resolvers });

export default server;