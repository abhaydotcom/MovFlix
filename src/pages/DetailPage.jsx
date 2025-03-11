import React, { useState } from "react";
import { useParams } from "react-router-dom";
import useFetchDetails from "../hooks/useFetchDetails";
import useFetch from "../hooks/useFetch";
import { useSelector } from "react-redux";
import Loading from "../components/loading";
import moment from "moment/moment";
import HorizontalCard from '../components/horizontalCard'
import VideoPlay from "../components/videoPlay";

const DetailPage = () => {
  const params = useParams();
  const imageURL = useSelector((state) => state.movieData.imageURL);
  const { data } = useFetchDetails(`3/${params?.explore}/${params?.id}`);
  const { data: castData } = useFetchDetails(
    `3/${params?.explore}/${params?.id}/credits`
  );
  const {data:recommendationsData}=useFetch(`3/${params.explore}/${params.id}}/recommendations`)
  const {data: similiarData}=useFetch(`3/${params.explore}/${params.id}/similar`)

  const duration = (data?.runtime / 60)?.toFixed(1)?.split(".");
  const writer = castData?.crew
    ?.filter((el) => el?.job === "Writer")
    ?.map((el) => el?.name)
    ?.join(", ");
  console.log(writer);


  const [playVideo,setPlayVideo] = useState(false)
  const [playVideoId,setPlayVideoId] = useState("")

  const handlePlayVideo=(data)=>{
    setPlayVideoId(data);
    setPlayVideo(true);
  }

  if (!imageURL) return <Loading />;
  if (!data) return <Loading />;
  return (
    <div>
      <div className="w-full h-[280px] relative hidden lg:block ">
        <div className="w-full h-full">
          <img
            src={imageURL + data?.backdrop_path}
            alt=""
            className="h-full w-full object-cover"
          />
        </div>
        <div className="absolute w-full h-full top-0 bg-gradient-to-t from-neutral-900/90 to-transparent"></div>
      </div>

      <div className=" container mx-auto px-3 py-16 lg:py-0  flex flex-col lg:flex-row gap-5 lg:gap-10">
        <div className="relative mx-auto lg:-mt-28 lg:mx-0 w-fit min-w-60">
          <img
            src={imageURL + data?.poster_path}
            alt=""
            className="lg:h-60 lg:w-40  h-80 w-60 rounded object-cover"
          />
          <button onClick={()=>handlePlayVideo(data)} className="mt-3 w-full py-2 px-4 text-center bg-white text-black rounded font-bold text-lg hover:bg-gradient-to-l from-red-500 to-orange-500 hover:scale-105 transition-all">
            Play Trailer
          </button>
        </div>

        <div>
          <h2 className="text-2xl lg:text-4xl font-bold text-white  capitalize">
            {data?.title || data?.name}
          </h2>
          <p className="text-neutral-100">{data?.tagline}</p>

          <div className="bg-neutral-700 p-[0.5px] rounded-full my-3"></div>

          <div className="flex items-center gap-3">
            <p>Rating: {Number(data?.vote_averae).toFixed(1)}+</p>
            <span>|</span>
            <p>Views: {Number(data?.vote_count)}</p>
            <span>|</span>
            <p>
              Duration: {duration[0]}h {duration[1]}m
            </p>
          </div>

          <div className="bg-neutral-700 p-[0.5px] rounded-full my-3"></div>

          <div className="mb-20">
            <h3 className="text-xl font-bold text-white mb-1">Overview</h3>
            <p>{data?.overview}</p>

            <div className="bg-neutral-700 p-[0.5px] rounded-full my-3"></div>

            <div className="flex items-center gap-3">
              <p>Status: {data?.status}</p>
              <span>|</span>
              <p>
                Release Date :{" "}
                {moment(data?.release_date).format("MMM Do YYYY")}
              </p>
              <span>|</span>
              <p>Revenue: {Number(data?.revenue)}</p>
            </div>
            <div className="bg-neutral-700 p-[0.5px] rounded-full my-3"></div>
          </div>

          
        </div>
      </div>

            <div>
              <HorizontalCard data={similiarData} heading={"Similar "+params?.explore} media_type={params?.explore}/>
              <HorizontalCard data={recommendationsData} heading={" recommendationsData "+params?.explore} media_type={params?.explore}/>
            </div>
            {
              playVideo &&  (
                <VideoPlay data={playVideoId}  close={()=>setPlayVideo(false)} media_type={params?.explore}/>
              )
            }
    </div>
  );
};

export default DetailPage;
