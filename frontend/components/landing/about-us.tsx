import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const housemates = [
  {
    name: "Jasper",
    initials: "J",
    bio: "25, software engineer, in the office 5 days a week. Very easy going — likes to keep things clean but not over the top with it. Loves cooking and will definitely be up for providing house meals.",
    interests: "Bouldering, Cycling, The Pub",
  },
  {
    name: "Damia",
    initials: "D",
    bio: "27, secondary school teacher. Very easy going, enjoys socialising but also values time to wind down. Works in the school Monday to Friday.",
    interests: "Reading, Cooking, Hanging Out",
  },
  {
    name: "Micol",
    initials: "M",
    bio: "Software engineer. Always ready to find a new hobby — currently into pottery and embroidery. Queer.",
    interests: "Climbing, Water Sports, 5-a-side",
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
