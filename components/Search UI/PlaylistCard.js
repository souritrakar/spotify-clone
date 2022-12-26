export default function PlaylistCard({pl}){
    return(
        <div className="card w-50 bg-black shadow-xl hover:scale-95 transition duration-300 ">
        <figure className="px-6 pt-6">
            <img src={pl?.images[0]?.url} className="rounded-xl xl:h-40 xl:w-40" />
        </figure>
        <div className="card-body items-center text-center text-white">
        <a href={pl?.external_urls?.spotify} className='hover:underline'  target="_blank" rel="noreferrer">
            <h2 className="card-title text-ellipsis">{pl?.name}</h2>
        </a>
        <a href={pl?.owner?.external_urls?.spotify} className='hover:underline'  target="_blank" rel="noreferrer">
        <p className="text-ellipsis">{pl?.owner?.display_name}</p>
        </a>
        </div>
    </div>
    )
}