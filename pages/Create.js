import Head from "next/head"
import Header from "../components/Header"
import { useSession } from "next-auth/react"
import Sidebar from "../components/Sidebar"
import useSpotify from "../hooks/useSpotify"
import { useState } from "react"

export default function Create(){

    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const spotifyAPI = useSpotify()

    const createPlaylist = (title, description) =>{
        if(spotifyAPI.getAccessToken()){
            spotifyAPI.createPlaylist(title, {
                description:description,
            }).then(()=>{
                alert(`New playlist '${title}' created successfully!`)
                setTitle("")
                setDescription("")
            }).catch(err=>{
                alert(err)
            })
            
        }
    }
    return(
        <center>

            <Head>
                <title>Create Playlist</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>

            <div className="bg-[#121212] w-full h-screen">

                <div className="flex flex-row">
                    <Sidebar/>
                    <div className="flex flex-col w-full h-screen overflow-y-auto">
                        <Header/>

                        <section className="text-left mr-6">
                            <h1 className="lg:text-3xl text-xl font-bold text-white md:ml-10 ml-4 mt-12">Create playlists</h1>

                            <div className="form-control w-full max-w-xs  md:ml-10 ml-4 mt-6 ">
                                <label className="label">
                                    <span className="label-text text-white">Playlist title</span>
                                </label>
                                <input type="text" value={title} placeholder="Enter title" onChange={(e)=>{setTitle(e.target.value)}} className="input bg-gray-800 text-white focus:border-gray-600 input-bordered w-full max-w-xs" />
                            </div>

                            <div className="form-control w-full md:max-w-md max-w-xs md:ml-10 ml-4 mt-6">
                                <label className="label">
                                    <span className="label-text text-white">Playlist description</span>
                                </label>
                                <textarea onChange={(e)=>{setDescription(e.target.value)}} value={description} className="textarea bg-gray-800 text-white focus:border-gray-600 resize-none" placeholder="Enter playlist description"/>
                                <button onClick={()=>{createPlaylist(title, description)}} className="btn btn-block btn-success text-white hover:bg-green-400 mt-8">Create new Playlist</button>
                            </div>
                           
                            

                        </section>
                    </div>
                </div>
            </div>
        </center>
    )
}