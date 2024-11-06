
export type SessionStatus = "Canceled" | "Charging" | "Completed";



export const sessionStatusUiMapping: Record<SessionStatus, { label: string; color: string }> = {
  Canceled: { label: "Cancelled", color: "red" },
  Charging: { label: "Charging", color: "green" },
  Completed: { label: "Completed", color: "blue" },
};

export type Session = {
  transactionId: number,
  chargePoint:{
    id:string,
    owner:string,
    city:string
  },
  status:SessionStatus,
  startTime:string,
  endTime:string,
  revenue:number,
  energyConsumed:number

};



