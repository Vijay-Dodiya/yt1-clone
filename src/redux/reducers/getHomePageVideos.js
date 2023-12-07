import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { parseData } from "../../utils/parseData";

const API_KEY = import.meta.env.VITE_REACT_APP_YOUTUBE_DATA_API_KEY;

export const getHomePageVideos = createAsyncThunk(
    "youtube/App/searchPageVideos",
    
    async(isNext,{getState}) => {
        const {
            youtubeApp : {nextPageToken : nextPageTokenFromState,videos},
        } = getState();

        const {
            data: { items, nextPageToken },
          } = await axios.get(`https://youtube.googleapis.com/youtube/v3/search?maxResults=20&q="reactjs Projects"&key=${API_KEY}&part=snippet&type=video&${
            isNext ? `pageToken=${nextPageTokenFromState}` : ""
              }`);
              console.log({ items, nextPageTokenFromState, nextPageToken });
       
        const parsedData = await parseData(items);
        
        return { parsedData: [...videos, ...parsedData], nextPageToken };
    }
)