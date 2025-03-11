 
import { useSelector } from 'react-redux'
import Banner from '../components/banner';
import Card from '../components/card';
import HorizontalCard from '../components/horizontalCard';
import useFetch from '../hooks/useFetch';
import Loading from '../components/loading';


const Home = () => {

  const trendingData=useSelector(state=>state.movieData.bannerData);

  const {data:nowPlaying}=useFetch('3/movie/now_playing')
  const {data:topRated}=useFetch('3/movie/top_rated')
  const {data:popularTvShows}=useFetch('3/tv/popular')
  const {data:onTheAir}=useFetch('3/tv/on_the_air')
 
  if(!trendingData)return <Loading/>
  return (
    <div>
      <Banner/>

  <HorizontalCard  data={trendingData} heading={"trending"} trending={true}/>
  <HorizontalCard  data={nowPlaying} heading={"now playing"} media_type={'movie'}/>
  <HorizontalCard  data={topRated} heading={"top rated movies"} media_type={"movie"}/>
  <HorizontalCard  data={popularTvShows} heading={"popular tv"} media_type={"tv"}/>
  <HorizontalCard  data={onTheAir} heading={"On the air"} media_type={"tv"} />
     

    </div>
  )
}

export default Home