import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function AboutHouse() {
  return (
    <section className="py-16">
      <h2 className="text-3xl font-bold text-center mb-8">The house</h2>
      <Card>
        <CardHeader>
          <CardTitle>About our place</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Details coming soon — photos, location, rent, and everything else
            you need to know. For now, just know it&apos;s a comfortable place
            with a good vibe.
          </p>
        </CardContent>
      </Card>
    </section>
  );
}
