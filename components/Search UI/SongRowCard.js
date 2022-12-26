import timeConversion from "../../hooks/timeConversion";

export default function SongRowCard({track}){

    const playSound = (url) =>{
        
          let a = new Audio(url);
          let audio1 = new Audio();
          audio1.src = url
          setupAudioElement(audio1);
          audioElements.push(audio1);
          audio1.play()
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

    return(
        
        <tr>
           <div className="flex ml-2">
            <img onClick={()=>{playSound(track?.preview_url)}} src={track?.album?.images[0]?.url} className='w-10 h-10 rounded-lg cursor-pointer'/>
            <div>
            <a href={track?.external_urls?.spotify} className='hover:underline'  target="_blank" rel="noreferrer">
                <h1 className="ml-4 font-semibold">{track?.name}</h1>
            </a>
            
            <a href={track?.album?.artists?.[0]?.external_urls?.spotify} className='hover:underline'  target="_blank" rel="noreferrer">
                <h1 className="ml-4 text-sm">{track?.album?.artists?.[0]?.name}</h1>
            </a>
                
            </div>
            </div>

            <td>
                <a href={track?.album?.external_urls.spotify} className='hover:underline'  target="_blank" rel="noreferrer">
                    <h1 className="text-sm truncate text-ellipsis w-40">{track?.album?.name}</h1>
                </a>
            </td>

            <td>{timeConversion(track?.duration_ms)}</td>
        </tr>
    )
}