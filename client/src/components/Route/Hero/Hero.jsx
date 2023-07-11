import React from "react";
import { Link } from "react-router-dom";
import styles from "../../../styles/styles";
// import { heroSlider } from "../../../static/data";
import { useState } from "react";
import Slider1 from "../../../Assests/img/BANNERS-01.jpg";
import Slider2 from "../../../Assests/img/BANNERS-02.jpg";
import Slider3 from "../../../Assests/img/BANNERS-03.jpg";
import { useEffect } from "react";
const Hero = () => {
  const [heroSlider, setHeroSlider] = useState([Slider1, Slider2, Slider3]);
  const [current, setCurrent] = useState(0);

  const changeImage = (index) => {
    setCurrent(index);
  };

  useEffect(() => {
    setTimeout(() => {
      if (current + 1 > 2) {
        setCurrent(0);
      } else {
        setCurrent(current + 1);
      }
    }, 5000);
  });
  return (
    <div
      className={`relative min-h-[70vh] 800px:min-h-[80vh]  bg-center bg-cover   w-full bg-no-repeat ${styles.noramlFlex} flex justify-end flex-col`}
      style={
        {
          // backgroundImage: `url(${heroSlider[current]})`,
        }
      }
    >
      <img src={heroSlider[current]} alt="slider" className="w-full h-full" />
      {/* <div className={`${styles.section} w-[90%] 800px:w-[60%]`}>
        <h1
          className={`text-[35px] leading-[1.2] 800px:text-[60px] text-[#3d3a3a] font-[600] capitalize`}
        >
          Best Collection for <br /> home Decoration
        </h1>
        <p className="pt-5 text-[16px] font-[Poppins] font-[400] text-[#000000ba]">
          Introducing our Best Collection for Home Decoration, where style meets
          comfort to create a haven you'll love coming home to. Discover an
          array of carefully curated items that will transform your living
          spaces into a reflection of your unique personality. From exquisite
          wall art that adds a pop of color and character to tasteful throw
          pillows that invite relaxation, our collection encompasses a wide
          range of themes and styles to suit any design preference. Our
          selection includes contemporary pieces with clean lines and sleek
          finishes, vintage-inspired treasures that evoke nostalgia and charm,
          minimalist accents for a streamlined aesthetic, and bohemian elements
          that infuse a sense of wanderlust and creativity. With our Best
          Collection for Home Decoration, you can effortlessly create focal
          points with striking centerpieces, such as decorative vases,
          sculptures, and candle holders, or add a touch of luxury and comfort
          with our premium rugs and carpets. Transform your home into a
          sanctuary with our thoughtfully curated selection and embrace the
          beauty of impeccable design.
        </p>
        <Link to="/products" className="inline-block">
          <div className={`${styles.button} mt-5`}>
            <span className="text-[#fff] font-[Poppins] text-[18px]">
              Shop Now
            </span>
          </div>
        </Link>
      </div> */}

      <div className="flex gap-4 justify-center p-8">
        {heroSlider.map((img, index) => {
          return (
            <div
              className={`w-[15px] h-[15px] border-blue-700 ${
                index === current && " bg-black  "
              } border-2 rounded-full cursor-pointer`}
              key={index}
              onClick={(e) => changeImage(index)}
            ></div>
          );
        })}
      </div>
    </div>
  );
};

export default Hero;
