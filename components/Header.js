import { useSession } from "next-auth/react"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { useRecoilState } from "recoil"
import { searchQueryState } from "../atoms/stateAtom"
import useSpotify from "../hooks/useSpotify"

export default function Header(){

    const {data:session} = useSession()
    const [img, setImg] = useState()
    const [query, setQuery] = useState("")
    const router = useRouter()
    const [searchQuery, setSearchQuery] = useRecoilState(searchQueryState)
    const spotifyAPI = useSpotify()

    const search = (ip) =>{
        if(query?.length>0){
            router.push('/search')
            setSearchQuery(query)
        }
        
    }

    useEffect(()=>{
        spotifyAPI?.getMe().then(data=>{
            setImg(data?.body?.images?.[0]?.url)
        })
    }, [session, spotifyAPI])

    return(
        <div className={`flex flex-row w-full justify-between`}>

        <div className="input-group lg:ml-8 ml-4 mt-4 ">
        <input onChange={(e)=>{setQuery(e.target.value)}}
              type="text" placeholder="Search for track, playlist or artist" 
              value={query}
              className="input focus:border-white glass w-full max-w-xl rounded-xl text-white placeholder-white" 
        />

        {
            !searchQuery ? (
                <button onClick={()=>{search()}} className="btn btn-square btn-success">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="white"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                </button>
            ) : (
                <button onClick={()=>{
                    setQuery("")
                    setSearchQuery("")
                }} 
                className="btn btn-square btn-success">
                   <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
            )
        }
        
        </div>

        <div className=" mt-6 lg:mr-12 mr-2 flex lg:flex-row flex-col lg:ml-0 ml-8 lg:bg-gray-100 lg:h-10 lg:pr-4 lg:w-40 w-30 lg:pl-2 rounded-full">
        <div className="avatar mr-2 lg:mt-1">
            <div className="w-8 rounded-full h-8">
                <img src={img ? img : `https://ui-avatars.com/api/?name=${session?.user?.name}`} alt="User Image" />
            </div>
        </div>

        <h1 className="lg:text-black text-white font-semibold mt-1 lg:mt-2" >{session?.user?.name}</h1>
        </div>

        </div>
    )
}