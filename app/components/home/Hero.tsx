import { Button } from "@/app/components/ui/button";

export const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=1920')",
        }}
      >
        <div className="absolute inset-0 bg-background/70" />
      </div>

      <div className="relative z-10 container mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-normal text-foreground mb-6 max-w-5xl mx-auto leading-tight">
          Where events become experiences
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-3xl mx-auto">
          Birthdays, beach & pool parties, brand launches, hens, live
          music-planned end-to-end.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            size="lg"
            className="bg-gold hover:bg-gold/90 text-background px-8 py-6 text-lg"
          >
            Book Now
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-2 border-foreground bg-transparent hover:bg-foreground/10 text-foreground px-8 py-6 text-lg"
          >
            Contact Organiser
          </Button>
        </div>
      </div>
    </section>
  );
};
