import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper/modules';
// import 'swiper/swiper-bundle.css'; // Import Swiper styles
// import 'swiper/components/autoplay/autoplay.scss'; // Import Swiper Autoplay styles

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/autoplay';
import 'swiper/css/pagination';

// Initialize Swiper core components
// SwiperCore.use([Autoplay]);

// import required modules
import { FreeMode, Pagination, Autoplay } from 'swiper/modules';
import CourseCard from './CourseCard';

const CourseSlider = ({Courses}) => {
    return (
      <>
      {Courses?.length ? (
        <Swiper
          slidesPerView={1}
          spaceBetween={25}
          loop={true}
          className="mySwiper"
          autoplay={{
            delay: 2000, // Change slides every 2 seconds
            disableOnInteraction: false // Enable autoplay even if user interacts with slides
        }}
          modules={[FreeMode, Pagination, Autoplay]}
          pagination={{
            clickable:true
          }}
          breakpoints={{
            1024: {
              slidesPerView: 3,
            },
          }}
          
        >
          {Courses?.map((course, i) => (
            <SwiperSlide key={i}>
              <CourseCard course={course} Height={"h-[250px]"} />
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <p className="text-xl text-richblack-5">No Course Found</p>
      )}
    </>
    );
};

export default CourseSlider;