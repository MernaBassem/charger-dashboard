export type chargers = {
  id: string;
  owner: string;
  connectors: {
    connectorId: number;
    name: string;
    voltage: number;
    type: string;
  }[];
  latitude: number;
  longitude: number;
  city: string;
};
