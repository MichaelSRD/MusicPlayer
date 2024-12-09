'use client'
import { useState } from "react";
import Reproductor from "./components/reproductor";

 const canciones = [
  { imagen: '/cover-1.png', cancion:'lost-in-city-lights-145038.mp3', author: 'Cosmo Sheldrake', name: 'Lost in the City Lights' },
  { imagen: '/cover-2.png', cancion:'forest-lullaby-110624.mp3', author: 'Lesfm', name: 'Forest Lullaby' }
]
export default function Home() {
  const [nextC, setNextC] = useState(0)
  const handleNextSong = ()=>{
    if (canciones && nextC < canciones.length-1) {
       setNextC(nextC+1)
    }
  }
  const handlePrevSong = ()=>{
    if (canciones && nextC > 0) {
       setNextC(nextC-1)
    }
  }
  return (
   
    <Reproductor musicSrc={canciones[nextC] } nextSong={handleNextSong} PrevSong={handlePrevSong} />
   
  );
}
