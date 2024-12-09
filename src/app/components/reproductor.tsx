'use client'
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";

interface ReproductorProps  {
    imagen:string,
    cancion:string,
    author:string,
    name:string,
  } 

  interface musica {
    musicSrc: ReproductorProps;
    nextSong: ()=> void,
    PrevSong: ()=> void,
  }

export default function Reproductor({ musicSrc,nextSong,PrevSong }:musica) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const progresBarRef = useRef<HTMLDivElement>(null);
  const [duration, setDuration]= useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  
 
  useEffect(() => {
    console.log(isPlaying);
    const audio = audioRef.current;
    if (!audio) return
      
    const setAudioData = () => {
      setDuration(audio.duration)
      setCurrentTime(audio.currentTime)
    }
    

    const setAudioTime = () => setCurrentTime(audio.currentTime)

    audio.addEventListener('loadedmetadata', setAudioData)
    audio.addEventListener('timeupdate', setAudioTime)
    audio.load(); 
    if (isPlaying) {
      audio.play()
    }
      // Remove event listeners on cleanup
      return () => {
        audio.removeEventListener('loadedmetadata', setAudioData);
        audio.removeEventListener('timeupdate', setAudioTime);
      };
  }, [musicSrc.cancion]);

  const handleProgressClick = (event: React.MouseEvent<HTMLDivElement> )=>{
    const audio = audioRef.current;
    if(!audio) return
    const progressBar = progresBarRef.current;
    const bounds = progressBar?.getBoundingClientRect();
    if (!bounds) return 
    const x  = event.clientX - bounds.left;
    const percent = x / bounds.width;
    const newtime = percent * duration;

    audio.currentTime = newtime;
    setCurrentTime(newtime);
}

  const formattime = (time: number)=>{
     const minutes = Math.floor(time/60);
     const seconds = Math.floor(time%60);
     return `${minutes.toString().padStart(2,'0')}:${seconds.toString().padStart(2,'0')}`
  
  }
  const togglePlayPause =()=>{
     const current = audioRef.current;
     setIsPlaying(!isPlaying);
     if (current) {
      if (isPlaying) {
        current.pause();
      } else {
        current.play();
      }
      
    }
  }
  return (
    <main className=" text-center flex w-full h-screen m-auto justify-center items-center ">
    <section className="space-y-7 bg-[#212936] rounded-2xl p-4  ">
      <figure className=" space-y-3 ">
       <Image className=" rounded-3xl " src={musicSrc.imagen} alt={""} width={300} height={300} />
       <figcaption>
         <p className="text-[#E5E7EB] font-bold">{musicSrc.name}</p>
         <p className="text-[#4D5562] text-[12px] " >{musicSrc.author}</p>
       </figcaption>
      </figure>
      <section>
         <div className="flex justify-between text-[10px] text-[#4D5562] " >
          <div><p></p>{ formattime(currentTime) }</div>
          <div><p>{ formattime(duration) }</p></div>
         </div>
         <div ref={progresBarRef}  onClick={handleProgressClick} className="cursor-pointer w-full h-1 rounded-xl bg-[#E5E7EB] ">
          <div className="bg-[#C93B76]  h-full shadow-custom-shadow "
          style={{ width: `${(currentTime / duration) * 100}%` }}
          >
          </div>
         </div>
      </section>
      <audio ref={audioRef} src={musicSrc.cancion}  preload="metadata" ></audio>
      <section className="flex items-center justify-center space-x-4">
       <button onClick={PrevSong}>
        <Image src={"/Stop_and_play_fill-1.svg"} alt="" width={40} height={40}/>
       </button>
       <button onClick={togglePlayPause} className="p-1 shadow-custom-shadow rounded-full bg-[#C93B76]" >
        <Image src={isPlaying ? "/pausa.png" : "/play_fill.svg"} alt="" width={40} height={40}/>
       </button>
       <button onClick={nextSong} >
        <Image src={"/Stop_and_play_fill.svg"} alt="" width={40} height={40}/>
       </button>
      </section>
    </section>
    </main>
  );
}
