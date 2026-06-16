
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { PlaceHolderImages } from '@/app/lib/placeholder-images';
import Image from 'next/image';
import { HeartPulse, Sparkles, Smile, ShieldCheck } from 'lucide-react';

const services = [
  {
    title: "Limpieza y Prevención",
    desc: "Mantenemos tu boca sana con chequeos regulares y limpiezas profundas.",
    icon: ShieldCheck,
    imgId: "service-cleaning"
  },
  {
    title: "Estética Dental",
    desc: "Diseño de sonrisa, carillas y blanqueamiento para que luzcas radiante.",
    icon: Sparkles,
    imgId: "service-whitening"
  },
  {
    title: "Ortodoncia Moderna",
    desc: "Alineamos tus dientes con las técnicas más avanzadas y discretas.",
    icon: Smile,
    imgId: "service-orthodontics"
  },
  {
    title: "Odontología General",
    desc: "Tratamientos restauradores para recuperar la funcionalidad de tu boca.",
    icon: HeartPulse,
    imgId: "service-cleaning"
  }
];

export function Services() {
  return (
    <section id="servicios" className="py-24 bg-white/50">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <h2 className="text-3xl lg:text-4xl font-headline font-bold">Nuestros Servicios</h2>
          <p className="text-muted-foreground">
            Cuidamos cada detalle de tu salud bucodental con especialistas en cada área.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, i) => {
            const img = PlaceHolderImages.find(p => p.id === service.imgId);
            return (
              <Card key={i} className="group hover:shadow-xl transition-all duration-300 border-none bg-background">
                <div className="relative h-48 overflow-hidden rounded-t-lg">
                  {img && (
                    <Image 
                      src={img.imageUrl} 
                      alt={service.title} 
                      fill 
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      data-ai-hint={img.imageHint}
                    />
                  )}
                  <div className="absolute top-4 left-4 p-2 bg-white/90 backdrop-blur rounded-lg shadow-sm">
                    <service.icon className="text-primary h-6 w-6" />
                  </div>
                </div>
                <CardHeader>
                  <CardTitle className="text-xl">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-sm">
                    {service.desc}
                  </CardDescription>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
