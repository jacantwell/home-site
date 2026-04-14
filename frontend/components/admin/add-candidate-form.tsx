"use client";

import { useState } from "react";
import { useSWRConfig } from "swr";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { addCandidate } from "@/lib/api";
import { SWR_KEYS } from "@/lib/swr-keys";

export function AddCandidateForm() {
  const [submitting, setSubmitting] = useState(false);
  const { mutate } = useSWRConfig();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      await addCandidate({
        name: formData.get("name") as string,
        age: Number(formData.get("age")),
        phone: formData.get("phone") as string,
        bio: formData.get("bio") as string,
        source: formData.get("source") as string,
      });
      form.reset();
      mutate(SWR_KEYS.candidates);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Add candidate</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="admin-name">Name</Label>
              <Input id="admin-name" name="name" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="admin-age">Age</Label>
              <Input
                id="admin-age"
                name="age"
                type="number"
                min="1"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="admin-phone">Phone</Label>
              <Input id="admin-phone" name="phone" type="tel" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="admin-source">Source</Label>
              <Input
                id="admin-source"
                name="source"
                placeholder="e.g. Flatmates.com.au"
                required
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="admin-bio">Bio</Label>
            <Textarea id="admin-bio" name="bio" rows={3} required />
          </div>
          <Button type="submit" disabled={submitting}>
            {submitting ? "Adding..." : "Add candidate"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
