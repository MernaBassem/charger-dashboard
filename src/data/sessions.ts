// // import { Session, SessionStatus } from "../types/session";
// // export const sessionsSample: Session[] = [
// //   {
// //     id: "1",
// //     charger: {
// //       id: "1",
// //       connectors: [
// //         {
// //           id: "1",
// //           // format: "CABLE",
// //           standard: "Type 2",
// //           power_type: "AC",
// //           voltage: 7.4,
// //         },
// //         {
// //           id: "2",
// //           // format: "SOCKET",
// //           standard: "Type 2",
// //           power_type: "AC",
// //           voltage: 7.4,
// //         },
// //       ],
// //       location: {
// //         address: {
// //           city: "Red Sea",
// //           country: "Egypt",
// //           street: "2CXR+QHM",
// //         },
// //         coordinates: {
// //           latitude: 27.256751492163396,
// //           longitude: 33.830528036087344,
// //         },
// //       },
// //       manufacturer: "HNE Futures",
// //       owner: "Hilton Hurghada Plaza",
// //       status: "AVAILABLE",
// //       sessions: 120,
// //       revenue: 120 * 20 * 3.75,
// //     },
// //     start: {
// //       date: "1699533900917",
// //     },
// //     end: {
// //       date: "1699548300917",
// //     },
// //     status: "COMPLETED",
// //     energy: 50,
// //     revenue: {
// //       amount: 50 * 1.89,
// //       currency: "EGP",
// //     },
// //   },
// //   {
// //     id: "2",
// //     charger: {
// //       id: "2",
// //       connectors: [
// //         {
// //           id: "1",
// //           // format: "CABLE",
// //           standard: "CHAdeMO",
// //           power_type: "DC",
// //           voltage: 50,
// //         },
// //       ],
// //       location: {
// //         address: {
// //           city: "South Sinai",
// //           country: "Egypt",
// //           street: "X8GR+Q87",
// //         },
// //         coordinates: {
// //           latitude: 27.97687300000002,
// //           longitude: 34.34118299999999,
// //         },
// //       },
// //       manufacturer: "Infinity",
// //       owner: "Misr Sharm",
// //       status: "CHARGING",
// //       sessions: 60,
// //       revenue: 60 * 20 * 1.89,
// //     },
// //     start: {
// //       date: "1699533900917",
// //     },
// //     end: {
// //       date: "1699548300917",
// //     },
// //     status: "COMPLETED",
// //     energy: 50,
// //     revenue: {
// //       amount: 50 * 1.89,
// //       currency: "EGP",
// //     },
// //   },
// //   {
// //     id: "3",
// //     charger: {
// //       id: "3",
// //       connectors: [
// //         {
// //           id: "1",
// //           // format: "CABLE",
// //           standard: "CHAdeMO",
// //           power_type: "DC",
// //           voltage: 50,
// //         },
// //       ],
// //       location: {
// //         address: {
// //           city: "South Sinai",
// //           country: "Egypt",
// //           street: "El-Salam",
// //         },
// //         coordinates: {
// //           latitude: 27.92509499999999,
// //           longitude: 34.34361200000001,
// //         },
// //       },
// //       manufacturer: "Infinity",
// //       owner: "Sharm Sunny Lakes",
// //       status: "AVAILABLE",
// //       sessions: 70,
// //       revenue: 70 * 20 * 3.75,
// //     },
// //     start: {
// //       date: "1699533900917",
// //     },
// //     end: {
// //       date: "1699548300917",
// //     },
// //     status: "CHARGING",
// //     energy: 50,
// //     revenue: {
// //       amount: 50 * 1.89,
// //       currency: "EGP",
// //     },
// //   },
// //   {
// //     id: "4",
// //     charger: {
// //       id: "4",
// //       connectors: [
// //         {
// //           id: "1",
// //           // format: "CABLE",
// //           standard: "Type 2",
// //           power_type: "AC",
// //           voltage: 7.6,
// //         },
// //       ],
// //       location: {
// //         address: {
// //           city: "Cairo",
// //           country: "Egypt",
// //           street: "RV4W+8P5",
// //         },
// //         coordinates: {
// //           latitude: 30.051210721486964,
// //           longitude: 31.23304447939417,
// //         },
// //       },
// //       manufacturer: "Ikarus",
// //       owner: "Ramsis Parking 1",
// //       status: "OUT_OF_SERVICE",
// //       sessions: 50,
// //       revenue: 50 * 20 * 3.75,
// //     },
// //     start: {
// //       date: "1699533900917",
// //     },
// //     end: {
// //       date: "1699533900917",
// //     },
// //     status: "CANCELED",
// //     energy: 0,
// //     revenue: {
// //       amount: 0,
// //       currency: "EGP",
// //     },
// //   },
// // ];

// // export const sessions: Session[] = [
// //   ...sessionsSample,
// //   ...sessionsSample,
// //   ...sessionsSample,
// //   ...sessionsSample,
// //   ...sessionsSample,
// //   ...sessionsSample,
// //   ...sessionsSample,
// //   ...sessionsSample,
// // ].map((s, i) => ({ ...s, id: String(i + 1) }));

// //  export const sessionStatuses = [...new Set(sessions.map((s) => s.status))];

// // export const sessionStatusUiMapping: Record<SessionStatus, { label: string; color: string }> = {
// //   Canceled: { label: "Cancelled", color: "red" },
// //   Charging: { label: "Charging", color: "green" },
// //   Completed: { label: "Completed", color: "blue" },
// // };

// import { Session, SessionStatus } from "../types/session";
// export const sessionsSample: Session[] = [
//   {
//     id: "1",
//     charger: {
//       id: "1",
//       connectors: [
//         {
//           id: "1",
//           format: "CABLE",
//           standard: "Type 2",
//           power_type: "AC",
//           voltage: 7.4,
//         },
//         {
//           id: "2",
//           format: "SOCKET",
//           standard: "Type 2",
//           power_type: "AC",
//           voltage: 7.4,
//         },
//       ],
//       location: {
//         address: {
//           city: "Red Sea",
//           country: "Egypt",
//           street: "2CXR+QHM",
//         },
//         coordinates: {
//           latitude: 27.256751492163396,
//           longitude: 33.830528036087344,
//         },
//       },
//       manufacturer: "HNE Futures",
//       owner: "Hilton Hurghada Plaza",
//       status: "AVAILABLE",
//       sessions: 120,
//       revenue: 120 * 20 * 3.75,
//     },
//     start: {
//       date: "1699533900917",
//     },
//     end: {
//       date: "1699548300917",
//     },
//     status: "COMPLETED",
//     energy: 50,
//     revenue: {
//       amount: 50 * 1.89,
//       currency: "EGP",
//     },
//   },
//   {
//     id: "2",
//     charger: {
//       id: "2",
//       connectors: [
//         {
//           id: "1",
//           format: "CABLE",
//           standard: "CHAdeMO",
//           power_type: "DC",
//           voltage: 50,
//         },
//       ],
//       location: {
//         address: {
//           city: "South Sinai",
//           country: "Egypt",
//           street: "X8GR+Q87",
//         },
//         coordinates: {
//           latitude: 27.97687300000002,
//           longitude: 34.34118299999999,
//         },
//       },
//       manufacturer: "Infinity",
//       owner: "Misr Sharm",
//       status: "CHARGING",
//       sessions: 60,
//       revenue: 60 * 20 * 1.89,
//     },
//     start: {
//       date: "1699533900917",
//     },
//     end: {
//       date: "1699548300917",
//     },
//     status: "COMPLETED",
//     energy: 50,
//     revenue: {
//       amount: 50 * 1.89,
//       currency: "EGP",
//     },
//   },
//   {
//     id: "3",
//     charger: {
//       id: "3",
//       connectors: [
//         {
//           id: "1",
//           format: "CABLE",
//           standard: "CHAdeMO",
//           power_type: "DC",
//           voltage: 50,
//         },
//       ],
//       location: {
//         address: {
//           city: "South Sinai",
//           country: "Egypt",
//           street: "El-Salam",
//         },
//         coordinates: {
//           latitude: 27.92509499999999,
//           longitude: 34.34361200000001,
//         },
//       },
//       manufacturer: "Infinity",
//       owner: "Sharm Sunny Lakes",
//       status: "AVAILABLE",
//       sessions: 70,
//       revenue: 70 * 20 * 3.75,
//     },
//     start: {
//       date: "1699533900917",
//     },
//     end: {
//       date: "1699548300917",
//     },
//     status: "CHARGING",
//     energy: 50,
//     revenue: {
//       amount: 50 * 1.89,
//       currency: "EGP",
//     },
//   },
//   {
//     id: "4",
//     charger: {
//       id: "4",
//       connectors: [
//         {
//           id: "1",
//           format: "CABLE",
//           standard: "Type 2",
//           power_type: "AC",
//           voltage: 7.6,
//         },
//       ],
//       location: {
//         address: {
//           city: "Cairo",
//           country: "Egypt",
//           street: "RV4W+8P5",
//         },
//         coordinates: {
//           latitude: 30.051210721486964,
//           longitude: 31.23304447939417,
//         },
//       },
//       manufacturer: "Ikarus",
//       owner: "Ramsis Parking 1",
//       status: "OUT_OF_SERVICE",
//       sessions: 50,
//       revenue: 50 * 20 * 3.75,
//     },
//     start: {
//       date: "1699533900917",
//     },
//     end: {
//       date: "1699533900917",
//     },
//     status: "CANCELED",
//     energy: 0,
//     revenue: {
//       amount: 0,
//       currency: "EGP",
//     },
//   },
// ];

// export const sessions: Session[] = [
//   ...sessionsSample,
//   ...sessionsSample,
//   ...sessionsSample,
//   ...sessionsSample,
//   ...sessionsSample,
//   ...sessionsSample,
//   ...sessionsSample,
//   ...sessionsSample,
// ].map((s, i) => ({ ...s, id: String(i + 1) }));

// export const sessionStatuses = [...new Set(sessions.map((s) => s.status))];

// export const sessionStatusUiMapping: Record<SessionStatus, { label: string; color: string }> = {
//   CANCELED: { label: "Cancelled", color: "red" },
//   CHARGING: { label: "Charging", color: "green" },
//   COMPLETED: { label: "Completed", color: "blue" },
// };

