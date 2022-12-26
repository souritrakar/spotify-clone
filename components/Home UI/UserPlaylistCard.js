import { useRecoilState } from "recoil"
import { playlistIdState } from "../../atoms/stateAtom"
import { useRouter } from 'next/router'

export default function UserPlaylistCard(pl){

    const [playlistId, setPlaylistId] = useRecoilState(playlistIdState)
    const router = useRouter()
    const changePlaylist = (id) =>{
        router.push("/").then(()=>{
            setPlaylistId(id)
        })
    } 
    return(
        <div 
        onClick={()=>{changePlaylist(pl?.pl?.id)}} 
        className="flex items-center rounded-md shadow-md glass w-full cursor-pointer opacity-90 hover:opacity-100">
            <img src={pl?.pl?.images[0].url} className="h-20 w-20 rounded-md mr-4" />
            <div className="text-base font-semibold leading-6 text-white">{pl?.pl?.name}</div>
        </div>
    )
}