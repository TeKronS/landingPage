
import { Navbar } from '@/components/layout/Navbar';
import { Hero } from '@/components/sections/Hero';
import { Services } from '@/components/sections/Services';
import { About } from '@/components/sections/About';
import { Contact } from '@/components/sections/Contact';
import { SymptomNavigator } from '@/components/ai/SymptomNavigator';
import { Toaster } from '@/components/ui/toaster';
import { Heart } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <Hero />
        <Services />
        <About />
        <SymptomNavigator />
        <Contact />
      </main>

      <footer className="bg-slate-900 text-white py-12 border-t border-slate-800">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="text-center md:text-left space-y-2">
              <h3 className="font-headline font-bold text-2xl text-primary">OdontoCare</h3>
              <p className="text-slate-400 text-sm max-w-xs">
                Cuidando de tu salud dental con pasión y excelencia desde 2012.
              </p>
            </div>
            
            <div className="flex flex-col items-center md:items-end gap-2">
              <p className="text-slate-400 text-sm">© {new Date().getFullYear()} OdontoCare. Todos los derechos reservados.</p>
              <div className="flex items-center gap-1 text-xs text-slate-500">
                Hecho con <Heart className="h-3 w-3 text-red-500 inline fill-red-500" /> para tu bienestar
              </div>
            </div>
          </div>
        </div>
      </footer>
      
      <Toaster />
    </div>
  );
}
