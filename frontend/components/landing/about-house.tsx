"use client";

import { motion } from "motion/react";
import { MapPin, PoundSterling, Home, Beer } from "lucide-react";
import Image from "next/image";
import { MorphingBlob } from "./morphing-blob";

const facts = [
  {
    icon: MapPin,
    label: "Location",
    value: "3 min from Queens Road Peckham",
    color: "text-jasper",
  },
  {
    icon: PoundSterling,
    label: "Rent",
    value: "\u00A34,500/month total (split between 5)",
    color: "text-damia",
  },
  {
    icon: Home,
    label: "The house",
    value: "5 huge bedrooms, garden, great kitchen",
    color: "text-micol",
  },
  {
    icon: Beer,
    label: "The pub",
    value: "Great bar a 2-minute walk away",
    color: "text-sky",
  },
];

const housePhotos = [
  { src: "/photos/house/house5.jpeg", alt: "Kitchen with range cooker" },
  { src: "/photos/house/house6.jpeg", alt: "Bedroom with fireplace and garden doors" },
  { src: "/photos/house/house12.jpeg", alt: "Colourful bedroom" },
  { src: "/photos/house/house10.jpeg", alt: "Garden patio" },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
} as const;

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 100, damping: 20 },
  },
};

const photoVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { type: "spring" as const, stiffness: 100, damping: 20 },
  },
};

export function AboutHouse() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-peach/40 to-sunshine/40 py-20 px-4 sm:px-6">
      <div className="pointer-events-none absolute inset-0">
        {/* Top-left nested cluster */}
        <MorphingBlob
          color="bg-jasper/50" size="h-72 w-72" position="absolute -top-12 -left-20"
          border="border-4 border-jasper/30" parallaxSpeed={0.35} variant={1}
        >
          <MorphingBlob
            color="bg-peach" size="h-44 w-44" position="relative"
            border="border-3 border-jasper/20" variant={3}
          />
        </MorphingBlob>

        {/* Top-right small */}
        <MorphingBlob
          color="bg-damia/40" size="h-28 w-28" position="absolute top-4 right-16"
          border="border-3 border-damia/25" parallaxSpeed={0.2} variant={2}
        />

        {/* Mid-left small accent */}
        <MorphingBlob
          color="bg-micol/35" size="h-20 w-20" position="absolute top-1/2 left-4"
          border="border-2 border-micol/25" parallaxSpeed={-0.1} variant={0}
        />

        {/* Bottom-right nested cluster */}
        <MorphingBlob
          color="bg-sunshine/60" size="h-64 w-64" position="absolute -bottom-16 -right-12"
          border="border-4 border-sunshine/40" parallaxSpeed={-0.25} variant={0}
        >
          <MorphingBlob
            color="bg-sky/50" size="h-36 w-36" position="relative"
            border="border-3 border-sky/30" variant={2}
          />
        </MorphingBlob>

        {/* Bottom-left small */}
        <MorphingBlob
          color="bg-lavender/50" size="h-24 w-24" position="absolute -bottom-6 left-1/3"
          border="border-3 border-lavender/30" parallaxSpeed={0.15} variant={3}
        />
      </div>
      <div className="relative z-10 mx-auto max-w-5xl">
        <motion.h2
          className="font-display text-4xl font-bold text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
        >
          The house
        </motion.h2>

        {/* Fact cards grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 gap-4"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          {facts.map((fact) => (
            <motion.div
              key={fact.label}
              variants={itemVariants}
              whileHover={{ y: -4, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              className="flex items-start gap-4 rounded-2xl bg-white/80 p-5 shadow-sm backdrop-blur"
            >
              <div
                className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white shadow-sm ${fact.color}`}
              >
                <fact.icon className="size-5" />
              </div>
              <div>
                <p className="text-sm font-semibold">{fact.label}</p>
                <p className="text-sm text-muted-foreground">{fact.value}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* House photos */}
        <motion.div
          className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          {housePhotos.map((photo) => (
            <motion.div
              key={photo.src}
              variants={photoVariants}
              whileHover={{ y: -4, scale: 1.03 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              className="overflow-hidden rounded-2xl shadow-md"
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                width={1024}
                height={683}
                className="aspect-[4/3] w-full object-cover"
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Description */}
        <motion.div
          className="mt-8 space-y-4 rounded-2xl bg-white/60 p-8 backdrop-blur"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.3 }}
        >
          <p className="text-muted-foreground leading-relaxed">
            Four of the five bedrooms are huge, with one smaller room (which
            will have cheaper rent). Beautiful wooden furnishings throughout, a
            lovely garden with a gardener to look after it, and a great kitchen
            with a large gas hob, washing machine, tumble dryer, and plenty of
            storage. The kitchen-diner comes with a nice dining table. One of
            the downstairs rooms will have a sofa and can probably double as a
            living room.
          </p>
          <div className="space-y-1 text-sm">
            <p>
              <span className="font-medium">Council tax:</span>{" "}
              <span className="text-muted-foreground">Band D — £164/month</span>
            </p>
            <p>
              <span className="font-medium">Bills:</span>{" "}
              <span className="text-muted-foreground">
                Probably max £500/month between us
              </span>
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
