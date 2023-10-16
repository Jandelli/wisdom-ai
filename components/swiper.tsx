import React, { useState, useEffect } from 'react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Pagination } from 'swiper';
import { Companion } from '@prisma/client';
import prismadb from '@/lib/prismadb';


SwiperCore.use([Navigation, Pagination]);

interface CompanionSliderProps {
  searchParams: {
    categoryId: string;
    name: string;
  };
}

const Swiper: React.FC<CompanionSliderProps> = ({ searchParams }) => {
  const [data, setData] = useState<Companion[]>([]);

  // Fetch data from the database when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await prismadb.companion.findMany({
          where: {
            isDefault: true,
          },
        });
        setData(result);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [searchParams]); // Make sure to include searchParams in the dependency array

  return (
    <div>
      <Swiper
        navigation
        pagination={{ clickable: true }}
        loop={true}
        spaceBetween={10} // Adjust as needed
        slidesPerView={1} // Number of slides per view
      >
        {data.map((item) => (
          <SwiperSlide key={item.id}>
            <img src={item.imageURL} alt={item.name} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Swiper;