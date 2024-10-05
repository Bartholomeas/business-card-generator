'use client';
import React, { useRef } from "react";


import Image from "next/image";

import { motion, useScroll, useTransform } from 'framer-motion';


import Image1 from "./../../../../../public/images/landing/img1.jpg";
// import Image10 from "./../../../../../public/images/landing/img10.jpg";
import Image2 from "./../../../../../public/images/landing/img2.jpg";
import Image3 from "./../../../../../public/images/landing/img3.jpg";
// import Image4 from "./../../../../../public/images/landing/img4.jpg";
// import Image5 from "./../../../../../public/images/landing/img5.jpg";
// import Image6 from "./../../../../../public/images/landing/img6.jpg";
// import Image7 from "./../../../../../public/images/landing/img7.jpg";
// import Image8 from "./../../../../../public/images/landing/img8.jpg";
// import Image9 from "./../../../../../public/images/landing/img9.jpg";


// const images = [Image1, Image2, Image3, Image4, Image5, Image6, Image7, Image8, Image9, Image10];
export const ImgShowcaseSection = () => {
  const container = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: container, offset: ['start end', 'end start']
  });

  const sm = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const md = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const lg = useTransform(scrollYProgress, [0, 1], [0, -250]);

  const images = [
    {
      src: Image1,
      y: sm
    },
    {
      src: Image2,
      y: lg
    },
    {
      src: Image3,
      y: md
    }
  ];

  return (
    <div
      ref={container}
      className="mt-[10vh] min-h-screen"
    >
      <div
        className="images relative mt-[5vh] flex w-full justify-center"
      >
        {images.slice(0, 3).map((image, index) => {
          return (
            <motion.div
              style={{ y: image.y }}
              key={`imageParallaxItem-${index}`}
              className={`imageContainer absolute ${index === 0
                ? 'z-[1] h-[60vh] w-[50vh]'
                : index === 1
                  ? 'left-[55vw] top-[15vh] z-[2] h-[40vh] w-[30vh]'
                  : 'left-[27.5vw] top-[40vh] z-[3] h-[25vh] w-[20vh]'
                }`}
            >
              <Image
                src={image.src}
                placeholder="blur"
                alt={`image-${index}`}
                fill
                className="object-cover"
              />
            </motion.div>
          );
        })}
      </div>
    </div >
  );
};
