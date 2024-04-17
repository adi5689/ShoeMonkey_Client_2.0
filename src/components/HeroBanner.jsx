import React from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import { BiArrowFromBottom } from 'react-icons/bi';
import { BiArrowFromTop } from 'react-icons/bi';

const HeroBanner = () => {
  return (
    <div className='relative text-white text-[20px] w-full h-full mx-auto rounded-md'>
        <Carousel 
            autoPlay={true}
            axis={'vertical'}
            infiniteLoop={true}
            showThumbs={false}
            showIndicators={false}
            showStatus={false}
            renderArrowPrev={(clickHandler, hasPrev) => (
                <div
                    onClick={clickHandler}
                    className='absolute right-[31px] md:right-[51px] bottom-0 w-[30px] md:w-[50px] 
                    h-[30px] md:h-[50px] bg-black z-10 flex items-center justify-center cursor-pointer hover:opacity-90'
                >
                    <BiArrowFromTop className='text-sm md:text-lg'/>
                </div>
            )}
            renderArrowNext={(clickHandler, hasNext) => (
                <div
                    onClick={clickHandler}
                    className='absolute right-0 bottom-0 w-[30px] md:w-[50px] 
                    h-[30px] md:h-[50px] bg-white z-10 flex items-center justify-center border-[2px] cursor-pointer hover:opacity-90'
                >
                    <BiArrowFromBottom className='text-sm text-black bg-white md:text-lg'/>
                </div>
            )}

        >
                <div>
                    <img src="/slide-1.png" className='aspect-[16/10] md:aspect-auto object-cover'/>
                    <div className='px-[15px] md:px-[40px] py-[10px] md:py-[25px] font-oswald bg-white 
                    absolute bottom-[25px] md:bottom-[75px] left-0 text-black/[0.9] text-[15px] md:text-[30px]
                    uppercase font-medium cursor-pointer hover:opacity-90'>
                        Shop Now
                    </div>
                </div>
                <div>
                    <img src="/slide-5.jpg" className='aspect-[16/10] md:aspect-auto'/>
                    <div className='px-[15px] md:px-[40px] py-[10px] md:py-[25px] font-oswald bg-white 
                    absolute bottom-[25px] md:bottom-[75px] left-0 text-black/[0.9] text-[15px] md:text-[30px]
                    uppercase font-medium cursor-pointer hover:opacity-90'>
                        Shop Now
                    </div>
                </div>
                <div>
                    <img src="/slide-2.png" className='aspect-[16/10] md:aspect-auto'/>
                    <div className='px-[15px] md:px-[40px] py-[10px] md:py-[25px] font-oswald bg-white 
                    absolute bottom-[25px] md:bottom-[75px] left-0 text-black/[0.9] text-[15px] md:text-[30px]
                    uppercase font-medium cursor-pointer hover:opacity-90'>
                        Shop Now
                    </div>                
                </div>
                <div>
                    <img src="/slide-6.jpg" className='aspect-[16/10] md:aspect-auto'/>
                    <div className='px-[15px] md:px-[40px] py-[10px] md:py-[25px] font-oswald bg-white 
                    absolute bottom-[25px] md:bottom-[75px] left-0 text-black/[0.9] text-[15px] md:text-[30px]
                    uppercase font-medium cursor-pointer hover:opacity-90'>
                        Shop Now
                    </div>
                </div>
                <div>
                    <img src="/slide-3.png" className='aspect-[16/10] md:aspect-auto'/>
                    <div className='px-[15px] md:px-[40px] py-[10px] md:py-[25px] font-oswald bg-white 
                    absolute bottom-[25px] md:bottom-[75px] left-0 text-black/[0.9] text-[15px] md:text-[30px]
                    uppercase font-medium cursor-pointer hover:opacity-90'>
                        Shop Now
                    </div>
                </div>
                <div>
                    <img src="/slide-7.jpg" className='aspect-[16/10] md:aspect-auto'/>
                    <div className='px-[15px] md:px-[40px] py-[10px] md:py-[25px] font-oswald bg-white 
                    absolute bottom-[25px] md:bottom-[75px] left-0 text-black/[0.9] text-[15px] md:text-[30px]
                    uppercase font-medium cursor-pointer hover:opacity-90'>
                        Shop Now
                    </div>
                </div>
                <div>
                    <img src="/slide-4.png" className='aspect-[16/10] md:aspect-auto'/>
                    <div className='px-[15px] md:px-[40px] py-[10px] md:py-[25px] font-oswald bg-white 
                    absolute bottom-[25px] md:bottom-[75px] left-0 text-black/[0.9] text-[15px] md:text-[30px]
                    uppercase font-medium cursor-pointer hover:opacity-90'>
                        Shop Now
                    </div>
                </div>
            </Carousel>
    </div>
  )
}

export default HeroBanner;