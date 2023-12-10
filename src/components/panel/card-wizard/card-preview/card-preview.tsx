/* eslint-disable @typescript-eslint/no-unsafe-call */
"use client";

import { useRef, useState } from "react";
import { useSpring } from "framer-motion";

import { Button } from "~/components/ui";
import {
  type WithFlipProps,
  withFlip,
} from "~/components/common/special/with-flip";

const spring = {
  type: "spring",
  stiffness: 300,
  damping: 40,
};

const CardPreviewHandler = ({ variant = "front", ...props }: WithFlipProps) => {
  return (
    <div className="h-full w-full bg-rose-500" {...props}>
      TO JEST {variant}
    </div>
  );
};

const FlippedCard = withFlip(CardPreviewHandler);
export const CardPreview = () => {
  const [isFlipped, setIsFlipped] = useState(false);

  // const controls = useDragControls();

  const handleClick = () => {
    setIsFlipped((prev) => !prev);
  };

  // const startDrag = (e: any) => {
  //   console.log(e);
  //   controls.start(e);
  // };

  const [rotateXaxis, setRotateXaxis] = useState(0);
  const [rotateYaxis, setRotateYaxis] = useState(0);

  const ref = useRef<HTMLDivElement>(null);

  // const handleMouseEnd = () => {
  //   setRotateXaxis(0);
  //   setRotateYaxis(0);
  // };

  const dx = useSpring(0, spring);
  const dy = useSpring(0, spring);

  return (
    <>
      {/* {withFlip(<div className="h-full w-full bg-rose-500">TO JEST FRONT</div>)} */}
      <div className="relative h-[500px] w-[500px]">
        <FlippedCard />
      </div>
    </>

    // <motion.div
    //   onClick={handleClick}
    //   transition={spring}
    //   style={{
    //     transformStyle: "preserve-3d",
    //     perspective: "1200px",
    //     // transformStyle: "preserve-3d",
    //     // height: "500px",
    //     // width: "ful",
    //     // width: `${props.width}`,
    //     // height: `${props.height}`,
    //   }}
    //   className="aspect-cardOne h-auto w-full"
    // >
    //   <motion.div
    //     ref={ref}
    //     transition={spring}
    //     className="h-full w-full"
    //     style={{
    //       rotateX: dx,
    //       rotateY: dy,
    //     }}
    //   >
    //     <div
    //       className="preserve-3d perspective h-full w-full"
    //       // style={
    //       //   {
    //       //     // height: "100%",
    //       //     // width: "100%",
    //       //     // perspective: "1200px",
    //       //     // transformStyle: "preserve-3d",
    //       //   }
    //       // }
    //     >
    //       <motion.div
    //         animate={{ rotateY: isFlipped ? -180 : 0 }}
    //         transition={spring}
    //         className={cn("backface-hidden absolute z-0 h-full w-full", {
    //           "z-1": isFlipped,
    //         })}
    //       >
    //         <div className="h-full w-full bg-rose-500">TO JEST FRONT</div>
    //       </motion.div>
    //       <motion.div
    //         initial={{ rotateY: 180 }}
    //         animate={{ rotateY: isFlipped ? 0 : 180 }}
    //         transition={spring}
    //         className={cn("backface-hidden z-1 absolute h-full w-full", {
    //           "z-0": isFlipped,
    //         })}
    //         // style={{
    //         //   width: "100%",
    //         //   height: "100%",
    //         //   zIndex: isFlipped ? 1 : 0,
    //         //   backfaceVisibility: "hidden",
    //         //   position: "absolute",
    //         // }}
    //       >
    //         <div className="h-full w-full bg-lime-500">TO JEST TYL</div>
    //       </motion.div>
    //     </div>
    //   </motion.div>
    // </motion.div>
  );
};
// <div className="flex h-full w-full flex-col gap-8">
//   <div
//     // ref={ref}
//     // onClick={handleFlip}
//     className={cn(
//       "flip-card aspect-cardOne w-full rounded border-border",
//       // classes.innerBox,
//       // { [`${classes.innerBoxFlip}`]: isFlipped },
//     )}
//     // style={{
//     //   perspective: "100px",
//     // }}
//   >
//     <motion.div
//       className="flip-card-inner h-full w-full"
//       initial={false}
//       // animate={{ rotateY: isFlipped ? 180 : 360 }}
//       // transition={{ duration: 0.6, animationDirection: "normal" }}
//       onAnimationComplete={() => setIsAnimating(false)}
//       variants={cardVariants}
//     >
//       <div className="flip-card-front h-full w-full bg-lime-400 bg-cover">
//         <p>tekst jakistam pierwszy czy ktorys</p>
//       </div>
//       <div className="flip-card-back h-full w-full bg-purple-400 bg-cover">
//         <p>
//           Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo
//           nobis adipisci rerum, eveniet dolorem corrupti mollitia harum
//           quibusdam delectus dignissimos esse soluta iusto, hic, repellendus
//           ipsam aut. Incidunt, labore ex?
//         </p>
//       </div>

//       {/* <div className={cn({ [`${classes.innerBoxFlip}`]: isFlipped })}></div> */}
//       {/* <div onPointerDown={startDrag} />
//       <motion.div
//         drag
//         dragControls={controls}
//         dragConstraints={ref}
//         // dragConstraints={{ left: -100, right: -100, top: -50, bottom: -50 }}
//         className="h-[50px] w-[50px] bg-blue-400"
//       /> */}
//     </motion.div>

//     {/* </div> */}
//     {/* <div
//       style={{ transformStyle: "preserve-3d" }}
//       className={cn(
//         " relative h-[200px] w-full bg-blue-400 transition-transform",
//       )}
//     ></div> */}
//   </div>

//   <Button onClick={handleFlip} type="button">
//     Flip
//   </Button>
// </div>
