"use client";

import { useState } from "react";
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
      <section className="py-16">
        <Card className="max-w-lg mx-auto">
          <CardContent className="pt-6 text-center">
            <p className="text-lg font-medium">Thanks for applying!</p>
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
      </section>
    );
  }

  return (
    <section className="py-16">
      <h2 className="text-3xl font-bold text-center mb-8">Apply</h2>
      <Card className="max-w-lg mx-auto">
        <CardHeader>
          <CardTitle>Tell us about yourself</CardTitle>
          <CardDescription>
            Fill out the form below and we&apos;ll get back to you.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" name="name" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="age">Age</Label>
              <Input id="age" name="age" type="number" min="1" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input id="phone" name="phone" type="tel" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="bio">About you</Label>
              <Textarea
                id="bio"
                name="bio"
                rows={4}
                placeholder="Tell us a bit about yourself, your lifestyle, and what you're looking for in a house..."
                required
              />
            </div>
            {error && <p className="text-sm text-destructive">{error}</p>}
            <Button type="submit" className="w-full" disabled={submitting}>
              {submitting ? "Submitting..." : "Submit application"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </section>
  );
}
