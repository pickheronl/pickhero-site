import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import TrialFormDialog from "./TrialFormDialog";

const HeroSection = () => {
  const benefits = [
    "Binnen no-time operationeel",
    "Wij helpen je van A tot Z met je implementatie",
    "Ook zonder technische kennis",
    "30 dagen gratis uitproberen",
  ];

  return (
    <section className="relative pt-20 pb-20 lg:pt-40 lg:pb-32 overflow-hidden">
      <div className="absolute top-20 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-accent/10 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 lg:px-8 relative">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary text-secondary-foreground text-sm font-medium mb-6 animate-fade-in">
              <span className="inline-block w-2 h-2 rounded-full bg-[#A6FFB0] animate-pulse-soft" />
              Logic4 integratie live
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 animate-fade-in">
              Magazijnbeheer voor E-commerce dat{" "}
              <span className="text-gradient">écht werkt</span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-xl mx-auto lg:mx-0 animate-fade-in">
              PickHero is de slimme WMS-oplossing voor webwinkels. Eenvoudig te gebruiken, snel te integreren en ontworpen om jouw magazijn efficiënter te maken.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8 animate-fade-in">
              <TrialFormDialog>
                <Button variant="hero" size="lg">
                  Start gratis proefperiode
                  <ArrowRight className="ml-2" />
                </Button>
              </TrialFormDialog>
            </div>

            <div className="flex flex-wrap gap-4 justify-center lg:justify-start animate-fade-in">
              {benefits.map((benefit) => (
                <div key={benefit} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CheckCircle2 className="w-5 h-5 text-[#9DD674]" />
                  <span>{benefit}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="relative animate-fade-in">
            <div className="relative bg-card rounded-2xl shadow-card-hover p-2 border border-border">
              <div className="flex items-center gap-2 px-3 py-2 bg-muted/50 rounded-t-xl border-b border-border">
                <div className="w-3 h-3 rounded-full bg-destructive/60" />
                <div className="w-3 h-3 rounded-full bg-accent/60" />
                <div className="w-3 h-3 rounded-full bg-primary/40" />
                <div className="flex-1 mx-4">
                  <div className="bg-background rounded-md px-3 py-1 text-xs text-muted-foreground">
                    app.pickhero.nl
                  </div>
                </div>
              </div>
              <Image
                src="/images/dashboard-screenshot.png"
                alt="PickHero Dashboard"
                width={800}
                height={500}
                className="w-full rounded-b-xl"
                priority
              />
            </div>

            <div className="absolute -top-4 -right-4 lg:right-32 bg-accent text-accent-foreground px-4 py-2 rounded-lg shadow-lg font-semibold text-sm animate-float">
              📦 Order gepickt!
            </div>
            <div className="absolute -bottom-4 -left-4 bg-card border border-border px-4 py-2 rounded-lg shadow-lg text-sm animate-float">
              <span className="font-semibold text-primary">+23%</span> sneller picken
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
