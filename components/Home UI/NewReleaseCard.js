export default function NewRelease({pl}){
    return(
        <a href={pl?.external_urls?.spotify}>
        <div className="card lg:w-72 lg:h-40 md:w-56 md:h-32 w-36 h-20 bg-gray-300 shadow-xl image-full cursor-pointer">
            <figure><img src={pl?.images[0]?.url}/></figure>
            <div className="card-body">
                <h2 className="md:text-xl text-xs font-bold text-left overflow-ellipsis lg:w-60 md:w-40 ">{pl?.name.replace("(Original Motion Picture Soundtrack)", "(OST)")}</h2>
                <p className="text-left md:text-lg text-xs md:visible invisible">{pl?.artists[0]?.name}</p>
            </div>
        </div>
        </a>
    )
}