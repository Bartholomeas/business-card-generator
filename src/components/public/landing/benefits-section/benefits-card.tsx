'use client';
import React, { useRef } from 'react';

import Image from "next/image";

import { motion, type MotionValue, useScroll, useTransform } from 'framer-motion';


import { cn } from "~/utils";

import { Heading, Text } from "~/components/common";

import { type BenefitCard } from "./benefits-section.types";


interface BenefitsCardProps extends BenefitCard {
  progress: MotionValue<number>;
  range: [number, number];
  targetScale: number;
  index: number;
}

export const BenefitsCard = ({ title, description, src, colorClassName, progress, range, targetScale, index }: BenefitsCardProps) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'start start']
  });
  const scale = useTransform(progress, range, [1, targetScale]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [2, 1]);

  return (
    <div ref={containerRef} className="sticky top-0 flex min-h-screen items-center justify-center">
      <motion.div
        className={cn("relative border-none flex h-[500px] w-full origin-top flex-col rounded-md p-8", colorClassName)}
        style={{ scale, top: `calc(-5vh + ${index * 25}px)` }}>
        <Heading type='h3'>{title}</Heading>
        <div className="mt-[50px] flex h-full gap-10">
          <div className="relative top-[10%] w-2/5">
            <Text>{description}</Text>
          </div>

          <div className="relative h-full w-3/5 overflow-hidden rounded-md">
            <motion.div className="w-full h-full" style={{ scale: imageScale }}>
              <Image
                fill
                src={src}
                alt={title}
                placeholder="blur"
                loading="lazy"
                className="object-cover" />
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
