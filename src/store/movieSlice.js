import { createSlice} from "@reduxjs/toolkit"

const initialState={
    bannerData:[],
    imageURL:"",
}

export const movieSlice=createSlice({
    name:"movFlix",
    initialState,
    reducers:{
        setBannerData:(state,actions)=>{
            state.bannerData=actions.payload
        },
        setImageURL:(state,actions)=>{
            state.imageURL=actions.payload
        }
    }
})
export const {setBannerData,setImageURL}=  movieSlice.actions;

export default movieSlice.reducer