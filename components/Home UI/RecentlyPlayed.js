import React from 'react';

export default function RecentlyPlayed({pl, image, preview}) {

  const playSound = (url) =>{
    if(preview == true){
      let a = new Audio(url);
      const audio1 = new Audio();
      audio1.src = url
      setupAudioElement(audio1);
      audioElements.push(audio1);

      audio1.play()
    }
  }

  const audioElements = [];

  const  setupAudioElement = (audioElement) => {
  audioElement.onplay = function() {
    audioElements.forEach(otherAudioElement => {
      if (otherAudioElement !== audioElement) {
        otherAudioElement.pause();
        otherAudioElement.currentTime = 0;
      }
    });
  };

}
  return (
    <div className="relative bg-[#1f1f1f] lg:w-64 w-32 rounded-lg overflow-hidden shadow-lg cursor-pointer ">
      <img onClick={()=>{playSound(pl?.preview_url)}} src={image} className="lg:w-64 lg:h-64  w-32 h-32  object-cover object-center hover:scale-105 transition duration-500" />
      <a href={pl?.external_urls?.spotify}>
      <div className="px-4 py-4">
        <div className="font-bold text-lg text-left mb-2 text-white truncate">{pl?.name}</div>
        <p className='text-left  truncate text-gray-100'>{pl?.description? pl.description : pl?.artists[0]?.name}</p>
      </div>
      </a>
    </div>
    
  );
}

