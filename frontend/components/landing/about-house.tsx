"use client";

import { motion } from "motion/react";
import { MapPin, PoundSterling, Home, Beer } from "lucide-react";
import Image from "next/image";

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
    <section className="bg-gradient-to-br from-peach/40 to-sunshine/40 py-20 px-4 sm:px-6">
      <div className="mx-auto max-w-5xl">
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
