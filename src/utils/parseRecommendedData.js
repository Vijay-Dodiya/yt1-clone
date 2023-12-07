import React from "react";
import axios from "axios";
import { parseVideoDuration } from "./parseVideoDuration";
import { convertRawtoString } from "./convertRawtoString";
import { timeSince } from "./timeSince";

const API_KEY = import.meta.env.VITE_REACT_APP_YOUTUBE_DATA_API_KEY;

export const parseRecommendedData = async (items, videoId) => {
  try {
    const videoIds = [];
    const channelIds = [];
    const newItems = [];
    items.forEach((item) => {
      channelIds.push(item.snippet.channelId);
      // videoIds.push(item.id.videoId);
      // newItems.push(item);

      if (item.contentDetails?.upload?.videoId) {
        videoIds.push(item.contentDetails.upload.videoId);
        newItems.push(item);
      }
    });

    // const {
    //   data: { items: channelsData },
    // } = await axios.get(
    //   `https://youtube.googleapis.com/youtube/v3/videos?part=contentDetails,statistics&id=${channelIds.join(
    //     ","
    //   )}&key=${API_KEY}`
    // );

    // const parsedChannelsData = [];
    // channelsData.forEach((channel) =>
    //   parsedChannelsData.push({
    //     id: channel.id,
    //     image: channel.snippet.thumbnails.default.url,
    //   })
    // );

    const {
      data: { items: videosData },
    } = await axios.get(
      `https://youtube.googleapis.com/youtube/v3/videos?part=contentDetails,statistics&id=${videoIds.join(
        ","
      )}&key=${API_KEY}`
    );

    const parseData = [];
    newItems.forEach((item, index) => {
      // const { image: channelImage } = parsedChannelsData.find(
      //   (data) => data.id === item.snippet.channelId
      // );
      if (index >= videosData.length) return;
      if (videoId === item?.contentDetails?.upload?.videoId) return;

        parseData.push({
          videoId: item.contentDetails.upload.videoId,
          videoTitle: item.snippet.title,
          videoDescription: item.snippet.description,
          videoThumbnail: item.snippet.thumbnails.medium.url,
          videoDuration: parseVideoDuration(
            videosData[index].contentDetails.duration
          ),
          videoLink: `https://www.youtube.com/watch?v=${item.id.videoId}`,
          videoViews: convertRawtoString(
            videosData[index].statistics.viewCount
          ),
          videoAge: timeSince(new Date(item.snippet.publishedAt)),
          channelInfo: {
            id: item.snippet.channelId,
            name: item.snippet.channelTitle,
          },
        });
      
    });
    return parseData;
  } catch (err) {
    console.log(err);
  }
};
