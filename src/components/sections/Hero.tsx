
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/app/lib/placeholder-images';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

export function Hero() {
  const heroImage = PlaceHolderImages.find(img => img.id === 'hero-dentist');

  return (
    <section className="relative overflow-hidden py-20 lg:py-32">
      <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center">
        <div className="z-10 space-y-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary text-primary text-sm font-semibold">
            <CheckCircle2 className="h-4 w-4" />
            Atención Dental de Vanguardia
          </div>
          <h1 className="text-4xl lg:text-6xl font-headline font-bold text-foreground leading-tight">
            Tu Sonrisa es Nuestra <span className="text-primary">Mayor Prioridad</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-lg leading-relaxed">
            Ofrecemos tratamientos personalizados con tecnología de última generación para asegurar que tu salud bucal esté siempre en las mejores manos.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold px-8" asChild>
              <a href="#cita">Solicitar una Cita <ArrowRight className="ml-2 h-4 w-4" /></a>
            </Button>
            <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary/10" asChild>
              <a href="#servicios">Ver Servicios</a>
            </Button>
          </div>
        </div>

        <div className="relative group">
          <div className="absolute -inset-4 bg-primary/20 rounded-2xl blur-2xl group-hover:bg-accent/20 transition-all duration-700"></div>
          <div className="relative h-[400px] lg:h-[500px] w-full rounded-2xl overflow-hidden shadow-2xl">
            {heroImage && (
              <Image 
                src={heroImage.imageUrl} 
                alt={heroImage.description} 
                fill 
                className="object-cover"
                data-ai-hint={heroImage.imageHint}
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
