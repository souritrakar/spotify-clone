import { useRecoilState } from "recoil"
import { playlistIdState } from "../atoms/stateAtom"
import { useRouter } from 'next/router'

export default function PlaylistTab({pl}){

    const [playlistId, setPlaylistId] = useRecoilState(playlistIdState)
    const router = useRouter()
    const changePlaylist = (id) =>{
        router.push("/").then(()=>{
            setPlaylistId(id)
        })
    } 
    return(

        <button onClick={()=>{changePlaylist(pl?.id)}} className="text-white w-full">
        
            <span className="flex flex-row gap-4 lg:text-md text-sm ml-4 mr-2 mt-4 hover:text-green-500 transition duration-300 p-2.5 rounded-md">
            {pl?.name}
            </span>

        </button>
    )
}