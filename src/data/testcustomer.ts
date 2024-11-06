// // pages/api/customers.ts

// import { NextApiRequest, NextApiResponse } from 'next';

// const customersSample: Customer[] = [
//   {
//     id: "1",
//     email: "ab*****@mailsac.com",
//     sessions: 15,
//     energy: 420,
//     payment: {
//       amount: 420 * 1.89,
//       currency: "EGP",
//     },
//   },
//   {
//     id: "2",
//     email: "dm*****@mailsac.com",
//     sessions: 20,
//     energy: 540,
//     payment: {
//       amount: 540 * 1.89,
//       currency: "EGP",
//     },
//   },
//   {
//     id: "3",
//     email: "lo*****@mailsac.com",
//     sessions: 5,
//     energy: 280,
//     payment: {
//       amount: 280 * 1.89,
//       currency: "EGP",
//     },
//   },
//   {
//     id: "4",
//     email: "id*****@mailsac.com",
//     sessions: 25,
//     energy: 620,
//     payment: {
//       amount: 610 * 1.89,
//       currency: "EGP",
//     },
//   },
// ];

// export default function handler(req: NextApiRequest, res: NextApiResponse) {
//   res.status(200).json(customersSample);
// }
// // components/CustomerList.tsx

// import React, { useEffect, useState } from 'react';

// type Payment = {
//   amount: number;
//   currency: string;
// };

// type Customer = {
//   id: string;
//   email: string;
//   sessions: number;
//   energy: number;
//   payment: Payment;
// };

// const CustomerList: React.FC = () => {
//   const [customers, setCustomers] = useState<Customer[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchCustomers = async () => {
//       try {
//         const response = await fetch('/api/customers');
//         if (!response.ok) {
//           throw new Error('Failed to fetch');
//         }
//         const data: Customer[] = await response.json();
//         setCustomers(data.map((c, i) => ({ ...c, id: String(i + 1) })));
//         setLoading(false);
//       } catch (error) {
//         setError(error.message);
//         setLoading(false);
//       }
//     };

//     fetchCustomers();
//   }, []);

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>Error: {error}</p>;

//   return (
//     <div>
//       <h1>Customer List</h1>
//       <ul>
//         {customers.map((customer) => (
//           <li key={customer.id}>
//             {customer.email} - {customer.payment.amount} {customer.payment.currency}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default CustomerList;
