
import Image from 'next/image';
import { PlaceHolderImages } from '@/app/lib/placeholder-images';
import { Award, GraduationCap, Heart } from 'lucide-react';

export function About() {
  const profileImg = PlaceHolderImages.find(img => img.id === 'dentist-profile');

  return (
    <section id="sobre-mi" className="py-24 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="relative order-2 lg:order-1">
            <div className="absolute -bottom-8 -right-8 w-64 h-64 bg-accent/20 rounded-full blur-3xl -z-10"></div>
            <div className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl">
              {profileImg && (
                <Image 
                  src={profileImg.imageUrl} 
                  alt="Dr. Roberto Sanchez" 
                  fill 
                  className="object-cover"
                  data-ai-hint={profileImg.imageHint}
                />
              )}
            </div>
            <div className="absolute bottom-6 left-6 right-6 bg-white/90 backdrop-blur-md p-6 rounded-xl shadow-lg border border-primary/10">
              <p className="text-primary font-bold text-lg">Dr. Roberto Sánchez</p>
              <p className="text-sm text-muted-foreground">Especialista en Rehabilitación Oral & Estética</p>
            </div>
          </div>

          <div className="order-1 lg:order-2 space-y-8">
            <div className="space-y-4">
              <h2 className="text-3xl lg:text-4xl font-headline font-bold">Experiencia y Compromiso</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Con más de 12 años transformando sonrisas, mi filosofía se centra en la prevención y el trato humano. Creo que cada paciente merece una atención sin prisas, entendiendo sus miedos y objetivos.
              </p>
            </div>

            <div className="grid sm:grid-cols-3 gap-6">
              <div className="space-y-3">
                <div className="p-3 bg-white w-fit rounded-lg shadow-sm">
                  <GraduationCap className="text-primary h-6 w-6" />
                </div>
                <h4 className="font-bold">Formación</h4>
                <p className="text-xs text-muted-foreground">Master en Odontología Restauradora por la UCM.</p>
              </div>
              <div className="space-y-3">
                <div className="p-3 bg-white w-fit rounded-lg shadow-sm">
                  <Award className="text-primary h-6 w-6" />
                </div>
                <h4 className="font-bold">Certificaciones</h4>
                <p className="text-xs text-muted-foreground">Especialista certificado en ortodoncia invisible.</p>
              </div>
              <div className="space-y-3">
                <div className="p-3 bg-white w-fit rounded-lg shadow-sm">
                  <Heart className="text-primary h-6 w-6" />
                </div>
                <h4 className="font-bold">Valores</h4>
                <p className="text-xs text-muted-foreground">Empatía, precisión y uso de materiales de alta gama.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
