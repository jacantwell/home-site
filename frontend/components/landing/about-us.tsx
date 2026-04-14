"use client";

import { motion } from "motion/react";
import { FlipCard } from "./flip-card";
import { MorphingBlob } from "./morphing-blob";
import { RotateCcw } from "lucide-react";

const housemates = [
  {
    name: "Jasper",
    initials: "J",
    color: "jasper" as const,
    bio: "25, software engineer, in the office 5 days a week. Very easy going — likes to keep things clean but not over the top with it. Loves cooking and will definitely be up for providing house meals.",
    interests: ["Bouldering", "Cycling", "The Pub"],
  },
  {
    name: "Damia",
    initials: "D",
    color: "damia" as const,
    bio: "27, secondary school teacher. Very easy going, enjoys socialising but also values time to wind down. Works in the school Monday to Friday.",
    interests: ["Reading", "Cooking", "Hanging Out"],
  },
  {
    name: "Micol",
    initials: "M",
    color: "micol" as const,
    bio: "Software engineer. Always ready to find a new hobby — currently into pottery and embroidery. Queer.",
    interests: ["Climbing", "Water Sports", "5-a-side"],
  },
];

const colorMap = {
  jasper: {
    bg: "bg-jasper",
    bgLight: "bg-jasper-light",
    text: "text-jasper",
    border: "border-jasper",
    pill: "bg-jasper/20 text-jasper",
  },
  damia: {
    bg: "bg-damia",
    bgLight: "bg-damia-light",
    text: "text-damia",
    border: "border-damia",
    pill: "bg-damia/20 text-damia",
  },
  micol: {
    bg: "bg-micol",
    bgLight: "bg-micol-light",
    text: "text-micol",
    border: "border-micol",
    pill: "bg-micol/20 text-micol",
  },
} as const;

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15 },
  },
} as const;

const itemVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 100, damping: 20 },
  },
};

export function AboutUs() {
  return (
    <section className="relative overflow-hidden bg-lavender/30 py-20 px-4 sm:px-6">
      <div className="pointer-events-none absolute inset-0">
        {/* Top-right large nested cluster */}
        <MorphingBlob
          color="bg-damia/60" size="h-80 w-80" position="absolute -top-16 -right-16"
          border="border-4 border-damia/30" parallaxSpeed={0.25} variant={2}
        >
          <MorphingBlob
            color="bg-lavender" size="h-48 w-48" position="relative"
            border="border-3 border-damia/20" variant={0}
          />
        </MorphingBlob>

        {/* Top-left small accent */}
        <MorphingBlob
          color="bg-jasper/40" size="h-32 w-32" position="absolute -top-8 left-12"
          border="border-3 border-jasper/25" parallaxSpeed={0.1} variant={1}
        />

        {/* Bottom-left nested cluster */}
        <MorphingBlob
          color="bg-micol/50" size="h-64 w-64" position="absolute -bottom-20 -left-16"
          border="border-4 border-micol/30" parallaxSpeed={-0.15} variant={3}
        >
          <MorphingBlob
            color="bg-mint" size="h-36 w-36" position="relative"
            border="border-3 border-micol/20" variant={1}
          />
        </MorphingBlob>

        {/* Mid-right small accent */}
        <MorphingBlob
          color="bg-sunshine/50" size="h-24 w-24" position="absolute top-1/2 -right-6"
          border="border-3 border-sunshine/30" parallaxSpeed={-0.2} variant={0}
        />

        {/* Bottom-right small accent */}
        <MorphingBlob
          color="bg-peach/40" size="h-20 w-20" position="absolute -bottom-4 right-1/4"
          border="border-2 border-peach/30" parallaxSpeed={0.15} variant={2}
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
          Meet the house
        </motion.h2>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          {housemates.map((person) => {
            const colors = colorMap[person.color];
            return (
              <motion.div key={person.name} variants={itemVariants}>
                <FlipCard
                  front={
                    <div
                      className={`${colors.bg} flex min-h-[320px] flex-col items-center justify-center rounded-3xl p-8 text-white shadow-lg`}
                    >
                      <div className="flex h-24 w-24 items-center justify-center rounded-full bg-white/20 text-4xl font-bold backdrop-blur-sm">
                        {person.initials}
                      </div>
                      <h3 className="font-display mt-5 text-2xl font-bold">
                        {person.name}
                      </h3>
                      <p className="mt-3 flex items-center gap-1.5 text-sm text-white/70">
                        <RotateCcw className="size-3.5" />
                        Tap to learn more
                      </p>
                    </div>
                  }
                  back={
                    <div
                      className={`${colors.bgLight} flex min-h-[320px] flex-col rounded-3xl p-8 shadow-lg`}
                    >
                      <h3
                        className={`font-display ${colors.text} text-xl font-bold`}
                      >
                        {person.name}
                      </h3>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {person.interests.map((interest) => (
                          <span
                            key={interest}
                            className={`${colors.pill} rounded-full px-3 py-1 text-xs font-semibold`}
                          >
                            {interest}
                          </span>
                        ))}
                      </div>
                      <p className={`mt-4 text-sm leading-relaxed ${colors.text}/80`}>
                        {person.bio}
                      </p>
                      <p className={`mt-auto pt-4 flex items-center gap-1.5 text-xs ${colors.text}/50`}>
                        <RotateCcw className="size-3" />
                        Tap to flip back
                      </p>
                    </div>
                  }
                />
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
