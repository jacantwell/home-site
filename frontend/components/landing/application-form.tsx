"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { MorphingBlob } from "./morphing-blob";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { submitApplication } from "@/lib/api";
import { CheckCircle2 } from "lucide-react";

export function ApplicationForm() {
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      await submitApplication({
        name: formData.get("name") as string,
        age: Number(formData.get("age")),
        phone: formData.get("phone") as string,
        bio: formData.get("bio") as string,
      });
      setSuccess(true);
      form.reset();
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  if (success) {
    return (
      <section className="relative overflow-hidden py-20 px-4 sm:px-6">
        <div className="pointer-events-none absolute inset-0">
          <MorphingBlob
            color="bg-sky/40" size="h-56 w-56" position="absolute top-1/4 -right-20"
            border="border-4 border-sky/30" parallaxSpeed={0.2} variant={3}
          >
            <MorphingBlob
              color="bg-damia/30" size="h-28 w-28" position="relative"
              border="border-3 border-damia/20" variant={1}
            />
          </MorphingBlob>
          <MorphingBlob
            color="bg-jasper/30" size="h-32 w-32" position="absolute -bottom-8 -left-10"
            border="border-3 border-jasper/20" parallaxSpeed={-0.15} variant={0}
          />
          <MorphingBlob
            color="bg-mint/40" size="h-20 w-20" position="absolute top-8 left-1/4"
            border="border-2 border-mint/30" parallaxSpeed={0.1} variant={2}
          />
        </div>
        <motion.div
          className="relative z-10 mx-auto max-w-lg"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
        >
          <Card className="border-2 border-micol/30 bg-mint/20">
            <CardContent className="pt-6 text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 15,
                  delay: 0.2,
                }}
              >
                <CheckCircle2 className="mx-auto size-16 text-micol" />
              </motion.div>
              <p className="font-display mt-4 text-xl font-bold">
                Thanks for applying!
              </p>
              <p className="text-muted-foreground mt-2">
                We&apos;ll be in touch soon.
              </p>
              <Button
                variant="outline"
                className="mt-4"
                onClick={() => setSuccess(false)}
              >
                Submit another application
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </section>
    );
  }

  return (
    <section className="relative overflow-hidden py-20 px-4 sm:px-6">
      <div className="pointer-events-none absolute inset-0">
        <MorphingBlob
          color="bg-sky/40" size="h-56 w-56" position="absolute top-1/4 -right-20"
          border="border-4 border-sky/30" parallaxSpeed={0.2} variant={3}
        >
          <MorphingBlob
            color="bg-damia/30" size="h-28 w-28" position="relative"
            border="border-3 border-damia/20" variant={1}
          />
        </MorphingBlob>
      </div>
      <div className="relative z-10 mx-auto max-w-lg">
        <motion.h2
          className="font-display text-4xl font-bold text-center mb-10 text-sky"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
        >
          Apply
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.1 }}
        >
          <Card className="border-l-4 border-l-sky shadow-lg">
            <CardHeader>
              <CardTitle className="font-display">
                Tell us about yourself
              </CardTitle>
              <CardDescription>
                Fill out the form below and we&apos;ll get back to you.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    name="name"
                    required
                    className="focus:border-sky focus:ring-sky"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="age">Age</Label>
                  <Input
                    id="age"
                    name="age"
                    type="number"
                    min="1"
                    required
                    className="focus:border-sky focus:ring-sky"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    required
                    className="focus:border-sky focus:ring-sky"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bio">About you</Label>
                  <Textarea
                    id="bio"
                    name="bio"
                    rows={4}
                    placeholder="Tell us a bit about yourself, your lifestyle, and what you're looking for in a house..."
                    required
                    className="focus:border-sky focus:ring-sky"
                  />
                </div>
                {error && <p className="text-sm text-destructive">{error}</p>}
                <motion.div whileTap={{ scale: 0.97 }}>
                  <Button
                    type="submit"
                    className="w-full bg-sky text-white hover:bg-sky/80"
                    disabled={submitting}
                  >
                    {submitting ? "Submitting..." : "Submit application"}
                  </Button>
                </motion.div>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
