export type Customer = {
  idTag: string;
  _id: string;
  paid: number;
  id: string;
  email: string;
  energy: number;
  sessions: number;
  payment: {
    amount: number;
    currency: string;
  };
};
