export default function TopResultCard({result}){

    return(
        <div className="relative rounded-xl lg:w-96 md:w-64 h-56 w-48 pt-4 shadow-xl bg-black">
        <img
          className="h-20 w-20 rounded-lg mr-auto ml-8 hover:scale-105 transition duration-300 cursor-pointer"
          src={result?.images[0]?.url}
        />
         <a href={result?.external_urls?.spotify} className='hover:underline'  target="_blank" rel="noreferrer">
        <div className="text-left ml-4 p-4">
          <h3 className="lg:text-2xl text-lg text-white font-bold leading-tight">{result?.name}</h3>
          <div className="text-sm text-white mt-4">
            {result?.followers?.total.toLocaleString("en-US")} followers
            <span className="ml-2 text-gray-900 text-ellipsis bg-gray-300 rounded-full px-2 py-1 text-xs font-semibold mr-3">
              {result?.genres[0]}
            </span>
          </div>
        </div>
        </a>
      </div>
    )
}