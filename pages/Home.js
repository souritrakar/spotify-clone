import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"
import Sidebar from "../components/Sidebar"
import useSpotify from "../hooks/useSpotify"
import Header from "../components/Header"
import UserPlaylistCard from "../components/Home UI/UserPlaylistCard"
import { useRecoilState } from "recoil"
import { userPlaylists } from "../atoms/stateAtom"
import LargeCarousel from "../components/carousels/LargeCarousel"
import SmallCarousel from "../components/carousels/SmallCarousel"
import MediumCarousel from "../components/carousels/MediumCarousel"
import RecentlyPlayed from "../components/Home UI/RecentlyPlayed"
import Head from "next/head"

export default function Home(){

    const spotifyAPI = useSpotify()
    const {data:session, status} = useSession()
    const [userPlaylistArray, setUserPlaylists] = useRecoilState(userPlaylists)
    const [recentlyPlayed, setRecentlyPlayed] = useState([])
    const [featuredPlaylists, setFeaturedPlaylists] = useState([])
    const [newReleases, setNewReleases] = useState([])
    
    useEffect(()=>{
 
        if(spotifyAPI?.getAccessToken()){
           spotifyAPI.getMyRecentlyPlayedTracks().then(data=>{
                setRecentlyPlayed(data?.body?.items)
           }).then(()=>{
            spotifyAPI?.getFeaturedPlaylists().then(data=>{
                setFeaturedPlaylists(data?.body?.playlists?.items)
                
            }).then(()=>{
                spotifyAPI?.getNewReleases().then(data=>{
                    setNewReleases(data?.body?.albums?.items)
                })
            })}).catch(err=>{alert(err)})
        }

    }, [session, spotifyAPI])

    return(
        <center>

            <Head>
                <title>Home | Spotify Clone</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>

           <div className="bg-[#121212] w-full h-screen">

                <div className="flex flex-row">
                    <Sidebar/>
                    <div className="flex flex-col w-full h-screen overflow-y-auto">
                        <Header/>

                        <h1 className="text-white font-bold lg:text-3xl text-2xl text-left ml-10 mt-10">Good afternoon, {session?.user?.name.split(" ")[0]}!</h1>

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 ml-10 mt-8 mr-6">
                            {
                                userPlaylistArray?.map(playlist=>{

                                    return(
                                        <>
                                        <UserPlaylistCard key={playlist?.id} pl={playlist}/>
                                        </>
                                    )
                                })
                            }
                        </div>

                        <h2 className="text-white font-semibold lg:text-2xl text-xl text-left ml-10 mt-16">Recently played</h2>

                        <div className=" mx-2 mt-6">
                        <LargeCarousel playlists={recentlyPlayed} type={0}/>
                        <MediumCarousel playlists={recentlyPlayed} type={0}/>
                        <SmallCarousel playlists={recentlyPlayed} type={0}/>
                        </div>

                        <h2 className="text-white font-semibold lg:text-2xl text-xl text-left ml-10 mt-16">Featured playlists</h2>
                        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 ml-6 mt-8 mr-6">
                            {
                                featuredPlaylists?.length>5 ? featuredPlaylists?.slice(0,5).map(playlist=>{
                                
                                    return(
                                        <>
                                        <RecentlyPlayed key={playlist?.id} pl={playlist} image={playlist?.images[0].url}/>
                                        </>
                                    )
                                }) : featuredPlaylists.map(playlist=>{
                                    return(
                                        <>
                                        <RecentlyPlayed key={playlist?.id} pl={playlist} image={playlist?.images[0].url}/>
                                        </>
                                    )
                                })
                            }
                        </div>
                        
                        <h2 className="text-white font-semibold lg:text-2xl text-xl text-left ml-10 mt-16">New releases</h2>
                        <div className=" mx-2 mt-6">
                            <LargeCarousel playlists={newReleases} type={1}/>
                            <MediumCarousel playlists={newReleases} type={1}/>
                            <SmallCarousel playlists={newReleases} type={1}/>
                        </div> 
                        <br/>
                        <br/>  
                    </div>
                </div>
            </div>
        </center>
    )
}