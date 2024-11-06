
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";




export interface ChargerModel {
    _id:string;
    id: string;
    owner: string;
   capacity:number, 
longitude:number;
latitude:number;
    connectors:[
        {
            "connectorId":number,
            "name": string,
            
            "type": string,
            "_id": string
        }
    ]
    street: string;
    city: string;
    monthSessions: number;
    totalSessions: number;
    revenue:{
        thisMonthRevenue:number
    }

}

export interface ChargersData {
    chargers: ChargerModel[];
}

interface ChargersState {
    loading: boolean;
    data: ChargersData;
}

const initialState: ChargersState = {
    loading: false,
    data: {
        chargers: [],
    }
}


export const chargerAction = createAsyncThunk<ChargersData, void>(
    "Chargers/getChargers",
    async (): Promise<ChargersData> => {
        const res = await axios.get('https://nu1emw0jb3.execute-api.eu-central-1.amazonaws.com/dashboard/chargers');
        return res.data.data;
    }
);

export const chargersData = createSlice({
    name: "chargers",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(chargerAction.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(chargerAction.fulfilled, (state, action: PayloadAction<ChargersData>) => {
            state.data = action.payload;
            state.loading = false;
        });
        builder.addCase(chargerAction.rejected, (state) => {
            state.loading = false;
        });
    },
});

export default chargersData.reducer;








//   const fetchChargerData=async()=>{
//   await axios.get('https://gvxflxvc1h.execute-api.eu-central-1.amazonaws.com/dashboard/chargers').then((res)=>{
// console.log("res",res);
// console.log("data",res.data);
// console.log("data",res.data.data.chargers);
//   })
//   }
// useEffect(()=>{
//   fetchChargerData()
// })