import React, { useEffect } from 'react'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import {useAppDispatch,useAppSelector} from "../hooks/useApp";
// import { getHomePageVideos } from '../store/reducers/getHomePageVideos';
import Spinner from '../components/Spinner';
import InfiniteScroll from 'react-infinite-scroll-component';
import Card from '../components/Card';
import { getHomePageVideos } from '../redux/reducers/getHomePageVideos';
const API_KEY = import.meta.env.VITE_REACT_APP_YOUTUBE_DATA_API_KEY;
import  axios  from 'axios';

export default function Home() {

  const dispatch = useAppDispatch();
  const videos = useAppSelector((state)=> state.youtubeApp.videos);

  useEffect(()=>{
    dispatch(getHomePageVideos(false));
  },[dispatch])


  return (
    <div className='max-h-screen overflow-hidden'>
      <div>
      {
        videos.length ? (
          <InfiniteScroll 
          dataLength={videos.length} 
          next={()=> dispatch(getHomePageVideos(true))}
          hasMore={videos.length<500}
          loader={<Spinner/>}
          height={650}
          >
              <div className='grid gap-y-14 gap-x-12 grid-cols-1 md:grid-cols-2 lg:grid-cols-4  p-8'>
                {videos.map((item) => {
                  return <Card data={item} key={item.videoId}/>
                })}
              </div>
          </InfiniteScroll>
        ):(
          <Spinner/>
        )
      }
      </div>
    </div>
  )
}