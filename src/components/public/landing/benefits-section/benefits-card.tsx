'use client';
import React, { useRef } from 'react';

import Image from "next/image";

import { motion, useScroll, useTransform } from 'framer-motion';


import { cn } from "~/utils";

import { Card, Heading, Text } from "~/components/common";

import { type BenefitCard } from "./benefits-section.types";


interface BenefitsCardProps extends BenefitCard {
  index: number;
}

export const BenefitsCard = ({ title, description, src, colorClassName, index }: BenefitsCardProps) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'start start']
  });

  const imageScale = useTransform(scrollYProgress, [0, 1], [2, 1]);

  return (
    <div ref={containerRef} className="sticky top-0 flex min-h-screen items-center justify-center">
      <Card className={cn("relative border-none flex h-[500px] w-full origin-top flex-col rounded-md p-8", colorClassName)} style={{ top: `calc(-5vh + ${index * 25}px)` }}>
        <Heading>{title}</Heading>
        <div className="mt-[50px] flex h-full gap-10">
          <div className="relative top-[10%] w-2/5">
            <Text>{description}</Text>
          </div>

          <div className="relative h-full w-3/5 overflow-hidden rounded-md">
            <motion.div className="size-full" style={{ scale: imageScale }}>
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
      </Card>
    </div>
  );
};
