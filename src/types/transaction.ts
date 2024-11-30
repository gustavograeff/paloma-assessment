export const currencies = ["USD", "CAD", "EUR", "GBP", "AUD", "JPY"] as const;

export type Currency = (typeof currencies)[number];

export const transactionDirections = ["inflow", "outflow"] as const;

type TransactionDirection = (typeof transactionDirections)[number];

export type Transaction = {
  transactionId: string;
  direction: TransactionDirection;
  amount: number;
  currency: Currency;
  destinationId: string;
  destinationName: string;
  sourceId: string;
  sourceName: string;
  timestamp: string;
};

export const mockTransaction = {
  transactionId: "00c31497-a3a1-5f7d-893f-114431f0ba77",
  timestamp: "2024-07-29T23:39:29.636Z",
  direction: "outflow",
  amount: 2873,
  currency: "JPY",
  destinationId: "00c31497-a3a1-5f7d-893f-114431f0ba77",
  destinationName: "Kaleigh Crist",
  sourceId: "22d47378-a85d-5d75-a3a8-86cb61eb3a0e",
  sourceName: "Gunner Kassulke",
};
