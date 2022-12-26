import timeConversion from "../../hooks/timeConversion"

export default function PlaylistCard({pl}){

    let durationT = 0
     pl?.tracks?.items.map(song=>{
       durationT+= song?.track.duration_ms
      })

    return(
        <tr>
           <div className="flex ml-2">
            <img src={pl?.images?.[0]?.url} className='w-10 h-10 rounded-lg'/>
            <div>
            <a href={pl?.external_urls?.spotify} className='hover:underline'  target="_blank" rel="noreferrer">
                <h1 className="ml-4 font-semibold">{pl?.name}</h1>
            </a>
            
            <h1 className="ml-4 text-sm">{track?.tracks?.items?.length}</h1>

            </div>
            </div>

            <td>{timeConversion(durationT)}</td>
        </tr>
    )
}