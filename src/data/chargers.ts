import {  ChargerPowerType, ChargerStatus, ConnectorType } from "../types/charger";


export const cities = [
  "Cairo",
  "Alexandria",
  "Giza",
  "Port Said",
  "Suez",
  "Luxor",
  "Mansoura",
  "El-Mahalla El-Kubra",
  "Tanta",
  "Asyut",
  "Zagazig",
  "Aswan",
  "Faiyum",
  "10th of Ramadan City",
  "Minya",
  "Banha",
  "Shebeen El-Kom",
  "Damanhour",
  "Damietta",
  "Qena",
  "Beni Suef",
  "Shubra Al Khaymah",
  "Ismailia",
  "Hurghada",
  "Arish",
  "Sohag",
  "Kafr El-Shaikh",
  "Mallawi",
  "Akhmim",
  "Desouk",
  "Qalyub",
  "Girga",
  "Marsa Matruh",
  "Abu Kibir",
  "6th of October City",
  "Bilbeis",
  "Kafr El-Dawar",
  "Edfu",
  "Mit Ghamr",
  "Al-Hawamidiyya",
  "Rasheed",
  "Juhaynah",
  "Fayed",
  "Natrn Valley",
  "Al Obour City",
  "Al Jamaliyah",
  "Fuka",
  "Al List",
  "Abnub",
  "Al Badari",
  "Faqus"
]

  
export const connectorTypes: ConnectorType[] = ["CCS 2", "CHADEMO", "Type 2","GB/T"];
export const powerTypes: ChargerPowerType[] = ["AC","DC"];

// i will delete it after end traffis page only  this
// import { Charger, ChargerPowerType, ChargerStatus, ConnectorType } from "../types/charger";

const chargersSample = [
  {
    id: "1",
    connectors: [
      {
        id: "1",
        format: "CABLE",
        standard: "Type 2",
        power_type: "AC",
        voltage: 7.4,
      },
      {
        id: "2",
        format: "SOCKET",
        standard: "Type 2",
        power_type: "AC",
        voltage: 7.4,
      },
    ],
    location: {
      address: {
        city: "Red Sea",
        country: "Egypt",
        street: "2CXR+QHM",
      },
      coordinates: {
        latitude: 27.256751492163396,
        longitude: 33.830528036087344,
      },
    },
    manufacturer: "HNE Futures",
    owner: "Hilton Hurghada Plaza",
    status: "AVAILABLE",
    sessions: 120,
    revenue: 120 * 20 * 3.75,
  },
  {
    id: "2",
    connectors: [
      {
        id: "1",
        format: "CABLE",
        standard: "CHAdeMO",
        power_type: "DC",
        voltage: 50,
      },
    ],
    location: {
      address: {
        city: "South Sinai",
        country: "Egypt",
        street: "X8GR+Q87",
      },
      coordinates: {
        latitude: 27.97687300000002,
        longitude: 34.34118299999999,
      },
    },
    manufacturer: "Infinity",
    owner: "Misr Sharm",
    status: "CHARGING",
    sessions: 60,
    revenue: 60 * 20 * 1.89,
  },
  {
    id: "3",
    connectors: [
      {
        id: "1",
        format: "CABLE",
        standard: "CHAdeMO",
        power_type: "DC",
        voltage: 50,
      },
    ],
    location: {
      address: {
        city: "South Sinai",
        country: "Egypt",
        street: "El-Salam",
      },
      coordinates: {
        latitude: 27.92509499999999,
        longitude: 34.34361200000001,
      },
    },
    manufacturer: "Infinity",
    owner: "Sharm Sunny Lakes",
    status: "AVAILABLE",
    sessions: 70,
    revenue: 70 * 20 * 3.75,
  },
  {
    id: "4",
    connectors: [
      {
        id: "1",
        format: "CABLE",
        standard: "Type 2",
        power_type: "AC",
        voltage: 7.6,
      },
    ],
    location: {
      address: {
        city: "Cairo",
        country: "Egypt",
        street: "RV4W+8P5",
      },
      coordinates: {
        latitude: 30.051210721486964,
        longitude: 31.23304447939417,
      },
    },
    manufacturer: "Ikarus",
    owner: "Ramsis Parking 1",
    status: "OUT_OF_SERVICE",
    sessions: 50,
    revenue: 50 * 20 * 3.75,
  },
  {
    id: "5",
    connectors: [
      {
        id: "1",
        format: "CABLE",
        standard: "CHAdeMO",
        power_type: "DC",
        voltage: 50,
      },
    ],
    location: {
      address: {
        city: "Cairo",
        country: "Egypt",
        street: "RV4W+8P5",
      },
      coordinates: {
        latitude: 29.805307000000024,
        longitude: 31.89686199999998,
      },
    },
    manufacturer: "Infinity",
    owner: "Chillout El Wahaa",
    status: "AVAILABLE",
    sessions: 50,
    revenue: 50 * 20 * 1.89,
  },
];

export const chargers = [
  ...chargersSample,
  ...chargersSample,
  ...chargersSample,
  ...chargersSample,
  ...chargersSample,
  ...chargersSample,
  ...chargersSample,
  ...chargersSample,
].map((c, i) => ({ ...c, id: String(i + 1) }));

const citiesObj: Record<string, boolean> = {};
chargers.forEach((c) => (citiesObj[c.location.address.city] = true));
// export const cities = Object.keys(citiesObj);
export const chargerStatuses: ChargerStatus[] = ["AVAILABLE", "CHARGING", "OUT_OF_SERVICE", "STOPPED"];
// export const connectorTypes: ConnectorType[] = ["CCS 2", "CHAdeMO", "Type 2"];
// export const powerTypes: ChargerPowerType[] = ["AC", "DC"];
export const manufacturers = [...new Set(chargers.map((c) => c.manufacturer))];
export const owners = [...new Set(chargers.map((c) => c.owner))];

export const chargerStatusUiMapping: Record<ChargerStatus, { label: string; color: string }> = {
  AVAILABLE: { label: "Available", color: "green" },
  CHARGING: { label: "Charging", color: "blue" },
  OUT_OF_SERVICE: { label: "Out Of Service", color: "red" },
  STOPPED: { label: "Stopped", color: "orange" },
};
