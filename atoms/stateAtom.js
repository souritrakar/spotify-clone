import { atom } from "recoil";

export const playlistIdState = atom({
    key:"playlistIdState",
    default:null
})

export const playlistState = atom({
    key:"playlistState",
    default:null
})

export const trackIdState = atom({
    key:"trackIdState",
    default:null
})

export const playbackState = atom({
    key:"playbackState",
    default:false
})

export const userPlaylists = atom({
    key:"userPlaylists",
    default:null
})

export const searchQueryState = atom({
    key:"searchQueryState",
    default:""
})
