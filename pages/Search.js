import Header from "../components/Header"
import Sidebar from "../components/Sidebar"
import Head from "next/head"
import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"
import useSpotify from "../hooks/useSpotify"
import Category from "../components/Search UI/Category"
import { useRecoilState } from "recoil"
import { searchQueryState } from "../atoms/stateAtom"
import TopResultCard from "../components/Search UI/TopResultCard"
import SongRowCard from "../components/Search UI/SongRowCard"
import PlaylistCard from "../components/Search UI/PlaylistCard"

export default function Search(){

    const {data:session, status} = useSession()
    const [categories, setCategories] = useState([])
    const [searchQuery, setSearchQuery] = useRecoilState(searchQueryState)
    const [data, setData] = useState([])
    const spotifyAPI = useSpotify()

    useEffect(()=>{
        if(spotifyAPI?.getAccessToken()){
            spotifyAPI?.getCategories().then(data=>{
                setCategories(data?.body?.categories?.items)
            })

            if(searchQuery){
                spotifyAPI.search(searchQuery, ['track', 'playlist', 'artist']).then(data=>{
                    setData(data?.body)
                })
            }
        }


    }, [ spotifyAPI, searchQuery])
    return(
        <center>

            <Head>
                <title>Search | Spotify Miniclone</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>

            <div className="bg-[#121212] w-full h-screen">

                <div className="flex flex-row">
                    <Sidebar/>
                    <div className="flex flex-col w-full h-screen overflow-y-auto">
                        <Header/>

                        {
                            searchQuery ? (
                                <>
                                {
                                    data?.tracks?.items?.length == 0 ? (
                                        <>
                                        <h1 className="text-white font-semibold text-center mt-auto mb-auto text-xl">No results found.</h1>
                                        </>
                                    ): (
                                        <>
                                        <div className="flex lg:flex-row flex-col lg:mt-12 ml-4">
                                
                                        <section>
                                        <h1 className="text-white font-bold text-3xl text-left ml-8">Top result</h1>
                                        <div className="mt-6 ml-8 mr-auto text-left">
                                        <TopResultCard result={data?.artists?.items?.[0]}/>
                                        </div>
                                        </section>
                                        
                                        <section className="lg:ml-16 ml-10 w-full mr-10">
                                        <h1 className="text-white font-bold text-3xl text-left">Songs</h1>
                                        <div className="overflow-x-auto bg-black  mr-auto lg:w-full w-84 text-left mt-6 rounded-xl ">
                                            <table className="table-normal rounded-xl bg-black w-full text-white">
        
                                                <tbody>
                                                    {data?.tracks?.items?.length >= 4 ? data?.tracks?.items?.slice(0,4).map((track, id)=>{
                                                        return(
                                                            <SongRowCard track={track} key={id} />
                                                        )
                                                    }) : data?.tracks?.items.map((track,id)=>{
                                                        return(
                                                            <SongRowCard track={track} key={id} />
                                                        )
                                                    })
                                                    }
                                                </tbody>
                                            </table>
                                            </div>
                                        </section>
                                    </div>

                                    <section className="mt-8 ml-8">
                                    <h1 className="text-white font-bold text-3xl text-left md:mt-0 ml-6 mt-8">Playlists</h1>
                                            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 mr-8 mt-8">
                                                {
                                                    data?.playlists?.items?.length>5 ? data?.playlists?.items?.slice(0,5).map(playlist=>{
                                                    
                                                        return(
                                                            <>
                                                            <PlaylistCard key={playlist?.id} pl={playlist} image={playlist?.images[0]?.url}/>
                                                            </>
                                                        )
                                                    }) : data?.playlists?.items?.map(playlist=>{
                                                        return(
                                                            <>
                                                            <PlaylistCard key={playlist?.id} pl={playlist} image={playlist?.images[0]?.url}/>
                                                            </>
                                                        )
                                                    })
                                                }
                                            </div>
                                        </section>
                                        <br/>

                                        </>
                                    )
                                }
                                </>
                            ) : (
                                <>
                                <h1 className="text-white text-left font-bold lg:text-2xl text-xl ml-10 mt-10">Browse all</h1>

                                <div className="grid grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 ml-6 mt-8 mr-6">
                                    {
                                        categories?.map(category=>{
                                            return(
                                                <Category category={category} key={category?.id}/>
                                            )
                                        })
                                    }
                                </div>
                                <br/>
                                </>
                            )
                        }
                    </div>
                </div>
            </div>
        </center>
    )
}