
"use client";

import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Bot, Search, ArrowRight, Loader2, MessageSquareText } from 'lucide-react';
import { symptomNavigator, type SymptomNavigatorOutput } from '@/ai/flows/symptom-navigator-flow';

export function SymptomNavigator() {
  const [symptoms, setSymptoms] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [result, setResult] = React.useState<SymptomNavigatorOutput | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!symptoms.trim()) return;

    setLoading(true);
    try {
      const output = await symptomNavigator({ symptoms });
      setResult(output);
    } catch (error) {
      console.error("Error navigating symptoms:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="ia" className="py-24 bg-primary text-white overflow-hidden relative">
      <div className="absolute top-0 right-0 w-96 h-96 bg-accent/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
      <div className="container mx-auto px-4 relative">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12 space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-sm font-semibold">
              <Bot className="h-4 w-4" /> Asistente Inteligente
            </div>
            <h2 className="text-3xl lg:text-5xl font-headline font-bold">Navegador de Síntomas IA</h2>
            <p className="text-primary-foreground/80 text-lg">
              Describe lo que sientes y nuestra IA te ayudará a entender qué podría estar pasando.
            </p>
          </div>

          <div className="grid lg:grid-cols-12 gap-8 items-start">
            <Card className="lg:col-span-5 bg-white/95 backdrop-blur-sm border-none shadow-2xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquareText className="text-primary h-5 w-5" />
                  Describe tu molestia
                </CardTitle>
                <CardDescription>
                  Ej: "Me duele una muela al tomar bebidas frías" o "Mis encías sangran al cepillarme".
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSearch} className="space-y-4">
                  <Input 
                    value={symptoms}
                    onChange={(e) => setSymptoms(e.target.value)}
                    placeholder="Escribe tus síntomas aquí..."
                    className="h-12 border-primary/20 focus-visible:ring-primary"
                  />
                  <Button 
                    type="submit" 
                    disabled={loading || !symptoms.trim()}
                    className="w-full h-12 bg-primary hover:bg-primary/90 text-white font-bold"
                  >
                    {loading ? <Loader2 className="animate-spin" /> : <>Analizar Síntomas <Search className="ml-2 h-4 w-4" /></>}
                  </Button>
                </form>
              </CardContent>
            </Card>

            <div className="lg:col-span-7 space-y-6 min-h-[300px]">
              {!result && !loading && (
                <div className="h-full flex flex-col items-center justify-center text-center p-8 bg-white/5 rounded-2xl border border-white/10 border-dashed">
                  <Bot className="h-12 w-12 text-white/30 mb-4" />
                  <p className="text-white/50 italic">Los resultados aparecerán aquí tras el análisis.</p>
                </div>
              )}

              {loading && (
                <div className="h-full flex flex-col items-center justify-center space-y-4 p-8">
                  <Loader2 className="h-12 w-12 text-accent animate-spin" />
                  <p className="animate-pulse">Consultando nuestra base de conocimientos dental...</p>
                </div>
              )}

              {result && !loading && (
                <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
                  <div className="bg-white/10 rounded-2xl p-6 border border-white/20">
                    <h4 className="text-sm font-bold uppercase tracking-widest text-accent mb-4">Posibles Condiciones</h4>
                    <div className="flex flex-wrap gap-2">
                      {result.suggestedConditions.map((cond, i) => (
                        <Badge key={i} variant="secondary" className="bg-white text-primary hover:bg-accent hover:text-white px-4 py-1 text-base">
                          {cond}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {result.clarificationQuestion && (
                    <div className="bg-accent/20 rounded-2xl p-6 border border-accent/30 flex gap-4">
                      <div className="bg-accent p-2 rounded-full h-fit">
                        <Bot className="h-5 w-5 text-accent-foreground" />
                      </div>
                      <div className="space-y-2">
                        <p className="text-xs font-bold text-accent uppercase tracking-wider">Pregunta de Seguimiento</p>
                        <p className="text-lg leading-tight">{result.clarificationQuestion}</p>
                      </div>
                    </div>
                  )}

                  <Button variant="outline" className="w-full bg-white/10 border-white/20 text-white hover:bg-white hover:text-primary h-12" asChild>
                    <a href="#cita">Contactar a un Profesional <ArrowRight className="ml-2 h-4 w-4" /></a>
                  </Button>
                  
                  <p className="text-[10px] text-white/40 text-center italic">
                    *Esta herramienta es orientativa y no sustituye un diagnóstico clínico profesional.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
