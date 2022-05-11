import React, { useState } from 'react';
import { ArrowCircleLeft, ArrowCircleRight } from '@mui/icons-material';


const ImageSlider = (imageUrls) => {
  const [current, setCurrent] = useState(0);
  if (!(imageUrls || Array.isArray(imageUrls) || imageUrls.imageUrls.length)) {
    return null;
  }

  const prevSlide = () => {
    setCurrent(current === 0 ? imageUrls.imageUrls.length - 1 : current - 1);
    console.log(current);
  };

  const nextSlide = () => {
    setCurrent(current === imageUrls.imageUrls.length - 1 ? 0 : current + 1);
    console.log(current);
  };

  return (
    <section className='slider'>
      <ArrowCircleLeft className='left-arrow' onClick={prevSlide}></ArrowCircleLeft>
      {
        imageUrls.imageUrls.map((slide, index) => {
          return (
            <div className={index === current ? 'slide active' : 'slide'} key={index}>
              {index === current && (
                <img src={slide} alt='Imagen' className='recipe-image' />
              )}
            </div>
          );
        })
      }
      <ArrowCircleRight className='right-arrow' onClick={nextSlide}></ArrowCircleRight>
    </section>
  );
}

export default ImageSlider;
