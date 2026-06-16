
"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Phone, Mail, MapPin, Clock, MessageCircle, Send } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export function Contact() {
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Solicitud enviada",
      description: "Nos pondremos en contacto contigo lo antes posible para confirmar tu cita.",
    });
    (e.target as HTMLFormElement).reset();
  };

  const contactInfo = [
    { icon: Phone, label: "Teléfono", value: "+34 912 345 678", href: "tel:+34912345678" },
    { icon: MessageCircle, label: "WhatsApp", value: "+34 600 000 000", href: "https://wa.me/34600000000" },
    { icon: Mail, label: "Email", value: "contacto@odontocare.com", href: "mailto:contacto@odontocare.com" },
    { icon: MapPin, label: "Dirección", value: "Calle Salud 123, Madrid", href: "#" },
  ];

  return (
    <section id="contacto" className="py-24">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-3 gap-12">
          
          {/* Info Side */}
          <div className="space-y-8 lg:col-span-1">
            <div>
              <h2 className="text-3xl font-headline font-bold mb-4">Ponte en Contacto</h2>
              <p className="text-muted-foreground">
                Estamos aquí para resolver tus dudas y cuidar de tu sonrisa.
              </p>
            </div>

            <div className="space-y-6">
              {contactInfo.map((item, i) => (
                <a 
                  key={i} 
                  href={item.href}
                  className="flex items-center gap-4 group hover:translate-x-1 transition-transform"
                >
                  <div className="p-3 bg-secondary rounded-lg group-hover:bg-primary group-hover:text-white transition-colors">
                    <item.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">{item.label}</p>
                    <p className="font-medium">{item.value}</p>
                  </div>
                </a>
              ))}
            </div>

            <div className="p-6 bg-primary/5 rounded-2xl border border-primary/10">
              <div className="flex items-center gap-2 font-bold mb-4">
                <Clock className="text-primary h-5 w-5" />
                Horario de Atención
              </div>
              <ul className="space-y-2 text-sm">
                <li className="flex justify-between"><span>Lunes - Viernes</span> <span className="font-semibold">09:00 - 20:00</span></li>
                <li className="flex justify-between"><span>Sábados</span> <span className="font-semibold">10:00 - 14:00</span></li>
                <li className="flex justify-between text-muted-foreground"><span>Domingos</span> <span>Cerrado</span></li>
              </ul>
            </div>
          </div>

          {/* Form Side */}
          <div id="cita" className="lg:col-span-2">
            <Card className="border-none shadow-xl">
              <CardHeader className="p-8">
                <CardTitle className="text-2xl font-headline">Solicita tu Cita</CardTitle>
                <CardDescription>
                  Completa el formulario y te contactaremos para agendar un espacio. No necesitas usuario.
                </CardDescription>
              </CardHeader>
              <CardContent className="p-8 pt-0">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-semibold">Nombre Completo</label>
                      <Input placeholder="Tu nombre" required />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-semibold">Teléfono</label>
                      <Input type="tel" placeholder="Tu número de contacto" required />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold">Email</label>
                    <Input type="email" placeholder="correo@ejemplo.com" required />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold">Servicio de Interés</label>
                    <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                      <option>Limpieza Dental</option>
                      <option>Blanqueamiento</option>
                      <option>Ortodoncia</option>
                      <option>Urgencia</option>
                      <option>Consulta General</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold">Mensaje Adicional</label>
                    <Textarea placeholder="Cuéntanos brevemente sobre tu caso..." className="min-h-[120px]" />
                  </div>
                  <Button type="submit" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-bold h-12">
                    Enviar Solicitud <Send className="ml-2 h-4 w-4" />
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

        </div>
      </div>
    </section>
  );
}
