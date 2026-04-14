"use client";

import { motion } from "motion/react";
import Image from "next/image";
import { MorphingBlob } from "./morphing-blob";

const heroPhotos = [
  { src: "/photos/house/house1.jpeg", alt: "Front of the house" },
  { src: "/photos/house/house4.jpeg", alt: "Living room with fireplace" },
  { src: "/photos/house/house8.jpeg", alt: "The garden" },
];

export function Hero() {
  return (
    <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-jasper via-damia to-micol py-20 px-6 text-center text-white sm:py-28">
      {/* Morphing decorative blobs — nested, sharp, bold */}
      <div className="pointer-events-none absolute inset-0">
        {/* Large top-left nested cluster */}
        <MorphingBlob
          color="bg-sunshine" size="h-80 w-80" position="absolute -top-20 -left-20"
          border="border-4 border-white/30" parallaxSpeed={0.3} variant={0}
        >
          <MorphingBlob
            color="bg-peach" size="h-48 w-48" position="relative"
            border="border-3 border-white/20" variant={2}
          />
        </MorphingBlob>

        {/* Mid-right small accent */}
        <MorphingBlob
          color="bg-lavender/70" size="h-28 w-28" position="absolute top-8 right-12"
          border="border-3 border-white/25" parallaxSpeed={0.15} variant={3}
        />

        {/* Bottom-right nested cluster */}
        <MorphingBlob
          color="bg-mint" size="h-64 w-64" position="absolute -bottom-16 -right-10"
          border="border-4 border-white/30" parallaxSpeed={-0.2} variant={1}
        >
          <MorphingBlob
            color="bg-sky/60" size="h-36 w-36" position="relative"
            border="border-3 border-white/20" variant={3}
          />
        </MorphingBlob>

        {/* Bottom-left small accent */}
        <MorphingBlob
          color="bg-jasper-light/60" size="h-24 w-24" position="absolute bottom-4 left-1/4"
          border="border-3 border-white/20" parallaxSpeed={-0.1} variant={2}
        />
      </div>

      <div className="relative z-10">
        <motion.h1
          className="font-display text-5xl font-bold tracking-tight sm:text-7xl"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", duration: 0.8 }}
        >
          We&apos;re looking for
          <br />2 housemates
        </motion.h1>

        <motion.p
          className="mx-auto mt-6 max-w-2xl text-lg text-white/90 sm:text-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", duration: 0.8, delay: 0.2 }}
        >
          We&apos;re 3 friends moving into a 5-bed house in Peckham and looking
          for 2 sociable people up for a good time — going to the pub, playing
          board games, cooking together, that kind of thing.
        </motion.p>

        {/* House photos */}
        <motion.div className="mt-12 flex flex-wrap justify-center gap-4">
          {heroPhotos.map((photo, i) => (
            <motion.div
              key={photo.src}
              className="overflow-hidden rounded-2xl border-2 border-white/30 shadow-lg"
              initial={{ opacity: 0, scale: 0.8, rotate: i === 1 ? 0 : i === 0 ? -3 : 3 }}
              animate={{ opacity: 1, scale: 1, rotate: i === 1 ? 0 : i === 0 ? -3 : 3 }}
              whileHover={{ scale: 1.05, rotate: 0 }}
              transition={{ type: "spring", delay: 0.4 + i * 0.15 }}
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                width={1024}
                height={683}
                className="h-40 w-56 object-cover sm:h-48 sm:w-64"
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
