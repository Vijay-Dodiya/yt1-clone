import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { parseRecommendedData } from "../../utils/parseRecommendedData";


const API_KEY = import.meta.env.VITE_REACT_APP_YOUTUBE_DATA_API_KEY;

export const getRecommendedVideos = createAsyncThunk(
    "youtube/App/getRecommendedVideos",
    async(videoId,{getState}) => {
        const {
            youtubeApp : {currentPlaying:{
                channelInfo:{id:channelId}
            }},
        } = getState();

         const {
      data: { items },
    } = await axios.get(`https://youtube.googleapis.com/youtube/v3/activities?&key=${API_KEY}&channelId=${channelId}&part=snippet,contentDetails&maxResults=20&type=videoId=${videoId}`);
       
        const parsedData = await parseRecommendedData(items,videoId);

        return {parsedData};
    }
)