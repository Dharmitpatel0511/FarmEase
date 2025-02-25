import React, { useState, useEffect } from "react";

function Carousel() {
  const sliders = [
    {
      src: "https://ik.imagekit.io/44y3v51cp/kisankonnect/Images/BannerImage/20241210112748Hurda%20Combo%20Story%20Web.jpg?tr=f-webp",
      alt: "img 1",
    },
    {
      src: "https://ik.imagekit.io/44y3v51cp/kisankonnect/Images/BannerImage/20241219162537Story%20Banner%20Web%20%201920px%20%20600px.png?tr=f-webp",
      alt: "img 2",
    },
    {
      src: "https://ik.imagekit.io/44y3v51cp/kisankonnect/Images/BannerImage/20250120092708Gajar%20Halwa%20Web%20Story.jpg?tr=f-webp",
      alt: "img 3",
    },
  ];

  // temp testing 

  const [slide, setSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSlide((prevSlide) => (prevSlide + 1) % sliders.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [sliders.length]); // Depend on sliders.length, not sliders itself.

  return (
    <div className="carousel-slide flex justify-center align-middle relative w-full">
      <img src={sliders[slide].src} alt={sliders[slide].alt} className="w-full h-auto" />
    </div>
  );
}

export default Carousel;