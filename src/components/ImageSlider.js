import React, { useEffect, useState } from 'react'
import { ArrowCircleLeft, ArrowCircleRight } from '@mui/icons-material';


const ImageSlider = (receivedImageUrls) => {
  const [current, setCurrent] = useState(0);
  const [imageUrls, setImageUrls] = useState([]);

  useEffect(() => {
    setImageUrls(receivedImageUrls ? receivedImageUrls : []);
  }, []);

  if (!(imageUrls || Array.isArray(imageUrls) || imageUrls.length)) {
    console.log("imageUrls not valid", imageUrls)
    return null;
  }

  const prevSlide = () => {
    setCurrent(current === 0 ? imageUrls.imageUrls.length - 1 : current - 1);
  };

  const nextSlide = () => {
    setCurrent(current === imageUrls.imageUrls.length - 1 ? 0 : current + 1);
  };

  return (
    <section className='slider'>
      <ArrowCircleLeft
        className='left-arrow'
        style={{display: imageUrls.imageUrls && imageUrls.imageUrls.length > 1 ? 'block' : 'none'}}
        onClick={prevSlide}>
      </ArrowCircleLeft>
      {
        imageUrls.imageUrls ? imageUrls.imageUrls.map((slide, index) => {
          return (
            <div className={index === current ? 'slide active' : 'slide'} key={index}>
              {index === current && (
                <img src={slide.url} alt='Imagen' className='recipe-image' />
              )}
            </div>
          );
        }) : <></>
      }
      <ArrowCircleRight
        className='right-arrow'
        style={{display: imageUrls.imageUrls && imageUrls.imageUrls.length > 1 ? 'block' : 'none'}}
        onClick={nextSlide}>
      </ArrowCircleRight>
    </section>
  );
}

export default ImageSlider;
