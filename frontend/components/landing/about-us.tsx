import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const housemates = [
  {
    name: "Alex",
    initials: "A",
    bio: "Software engineer who loves cooking and board games. Usually found in the kitchen experimenting with new recipes.",
    interests: "Cooking, Board Games, Hiking",
  },
  {
    name: "Jordan",
    initials: "J",
    bio: "Graphic designer and weekend surfer. Keeps the house looking great and always up for a beach trip.",
    interests: "Design, Surfing, Photography",
  },
  {
    name: "Sam",
    initials: "S",
    bio: "Grad student studying environmental science. Plant parent and early morning runner.",
    interests: "Plants, Running, Sustainability",
  },
];

export function AboutUs() {
  return (
    <section className="py-16">
      <h2 className="text-3xl font-bold text-center mb-8">Meet the house</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {housemates.map((person) => (
          <Card key={person.name}>
            <CardHeader className="items-center">
              <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center text-2xl font-semibold text-muted-foreground">
                {person.initials}
              </div>
              <CardTitle className="mt-3">{person.name}</CardTitle>
              <CardDescription>{person.interests}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-center">{person.bio}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
