export default function Category({category}){
    return(
        <div className="card lg:w-60 lg:h-64 md:w-40 md:h-56 w-28 h-32 image-full hover:cursor-pointer hover:scale-105 duration-300 ">
            <figure><img className="object-cover" src={category?.icons[0]?.url}/></figure>
            <div className="card-body">
                <h2 className="md:text-xl text-md font-bold text-left overflow-ellipsis w-full ">{category?.name}</h2>
            </div>
        </div>
    )
}