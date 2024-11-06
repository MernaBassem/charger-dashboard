export type ChargerStatus =
  | "AVAILABLE"
  | "CHARGING"
  | "OUT_OF_SERVICE"
  | "STOPPED";
export type ChargerPowerType = "AC" | "DC";
export type ConnectorType = "CCS 2" | "CHADEMO" | "Type 2" | "GB/T";

export interface ChargerModel {
  _id: string;
  id: string;
  owner: string;
  capacity: number;
  longitude: number;
  latitude: number;
  connectors: [
    {
      connectorId: number;
      name: string;
      type: string;
      _id: string;
    }
  ];
  street: string;
  city: string;
  monthSessions: number;
  totalSessions: number;
  revenue: {
    thisMonthRevenue: number;
  };
}
