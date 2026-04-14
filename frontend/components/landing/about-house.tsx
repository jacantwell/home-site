import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function AboutHouse() {
  return (
    <section className="py-16">
      <h2 className="text-3xl font-bold text-center mb-8">The house</h2>
      <Card>
        <CardHeader>
          <CardTitle>5-bed house in Peckham</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">
            3-minute walk from Queens Road Peckham. We&apos;re signing for the
            place and moving in May.
          </p>
          <p className="text-muted-foreground">
            Four of the five bedrooms are huge, with one smaller room (which
            will have cheaper rent). Beautiful wooden furnishings throughout, a
            lovely garden with a gardener to look after it, and a great kitchen
            with a large gas hob, washing machine, tumble dryer, and plenty of
            storage. The kitchen-diner comes with a nice dining table. One of
            the downstairs rooms will have a sofa and can probably double as a
            living room.
          </p>
          <p className="text-muted-foreground">
            And most importantly, there&apos;s a great bar a 2-minute walk away.
          </p>
          <div className="pt-2 space-y-1 text-sm">
            <p>
              <span className="font-medium">Rent:</span>{" "}
              <span className="text-muted-foreground">
                £4,500/month total (split between 5)
              </span>
            </p>
            <p>
              <span className="font-medium">Council tax:</span>{" "}
              <span className="text-muted-foreground">
                Band D — £164/month
              </span>
            </p>
            <p>
              <span className="font-medium">Bills:</span>{" "}
              <span className="text-muted-foreground">
                Probably max £500/month between us
              </span>
            </p>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
