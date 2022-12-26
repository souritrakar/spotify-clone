import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from "pure-react-carousel";
import "pure-react-carousel/dist/react-carousel.es.css";import BackButton from "../../public/icons/BackButton";
import NextButton from "../../public/icons/NextButton";
import NewRelease from "../Home UI/NewReleaseCard";
import RecentlyPlayed from "../Home UI/RecentlyPlayed";

export default function LargeCarousel({playlists, type}){
    return (
        <CarouselProvider className="lg:block hidden" naturalSlideWidth={100} isIntrinsicHeight={true} totalSlides={playlists?.length} visibleSlides={4} step={1} infinite={true}>
                    <div className="w-full relative flex items-center ml-2 justify-center">
                        
                    <ButtonBack role="button" aria-label="slide backward" className="absolute z-30 left-0 ml-8 focus:outline-none p-4 rounded-full focus:bg-gray-400 cursor-pointer" id="prev">
                         <BackButton/>
                    </ButtonBack>

                        <div className="w-full h-full mx-auto overflow-x-hidden overflow-y-hidden">
                            <Slider>
                                <div id="slider" className="h-full w-full flex lg:gap-8 md:gap-6 gap-10 items-center justify-start transition ease-out duration-700">
                                   {
                                     playlists?.map((pl, i)=>{
                                         return (
                                            <Slide index={i}>
                                            {type == 0 ? (
                                                
                                                <RecentlyPlayed preview={pl?.track?.preview_url ? true : null} key={pl?.id} image={pl?.track?.album?.images[0].url} pl={pl?.track}/>
                                            ) : (
                                                <NewRelease key={pl?.id} pl={pl}/>
                                            )}
                                            
                                        </Slide>
                                         )
                                     })
                                   }
                                </div>
                            </Slider>
                        </div>
                        <ButtonNext role="button" aria-label="slide forward" className="absolute z-30 right-0 mr-8 focus:outline-none p-4 rounded-full focus:bg-gray-400" id="next">
                            <NextButton/>
                        </ButtonNext>
                    </div>
                </CarouselProvider>
    )
}