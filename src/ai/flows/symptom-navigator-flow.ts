'use server';
/**
 * @fileOverview A GenAI tool that helps patients describe their dental symptoms by suggesting common conditions or asking clarifying questions.
 *
 * - symptomNavigator - A function that handles the symptom navigation process.
 * - SymptomNavigatorInput - The input type for the symptomNavigator function.
 * - SymptomNavigatorOutput - The return type for the symptomNavigator function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const SymptomNavigatorInputSchema = z.object({
  symptoms: z.string().describe('A description of the patient\'s dental symptoms in natural language.'),
});
export type SymptomNavigatorInput = z.infer<typeof SymptomNavigatorInputSchema>;

const SymptomNavigatorOutputSchema = z.object({
  suggestedConditions: z.array(z.string()).describe('A list of common dental conditions that might be related to the described symptoms.'),
  clarificationQuestion: z
    .string()
    .optional()
    .describe('A clarifying question to ask the patient if the symptoms are vague or require more detail.'),
});
export type SymptomNavigatorOutput = z.infer<typeof SymptomNavigatorOutputSchema>;

/**
 * Simulates retrieving common dental conditions based on keywords in the provided symptoms.
 * This is a placeholder for a real medical database lookup.
 */
const getDentalConditions = ai.defineTool(
  {
    name: 'getDentalConditions',
    description: 'Suggests common dental conditions based on a description of symptoms. Always return at least one condition if possible, or an empty array if no common conditions match.',
    inputSchema: z.object({
      symptoms: z.string().describe('The patient\'s dental symptoms.'),
    }),
    outputSchema: z.array(z.string()).describe('A list of common dental conditions.'),
  },
  async (input) => {
    const lowerCaseSymptoms = input.symptoms.toLowerCase();
    const conditions: string[] = [];

    if (lowerCaseSymptoms.includes('dolor') || lowerCaseSymptoms.includes('muela') || lowerCaseSymptoms.includes('sensibilidad')) {
      conditions.push('Caries Dental');
    }
    if (lowerCaseSymptoms.includes('sangre') || lowerCaseSymptoms.includes('encías') || lowerCaseSymptoms.includes('hinchazón') || lowerCaseSymptoms.includes('inflamación')) {
      conditions.push('Gingivitis');
      conditions.push('Periodontitis');
    }
    if (lowerCaseSymptoms.includes('blanco') || lowerCaseSymptoms.includes('manchas') || lowerCaseSymptoms.includes('decoloración')) {
      conditions.push('Decoloración dental');
      conditions.push('Fluorosis');
    }
    if (lowerCaseSymptoms.includes('fractura') || lowerCaseSymptoms.includes('roto') || lowerCaseSymptoms.includes('astillado')) {
      conditions.push('Diente fracturado/astillado');
    }
    if (lowerCaseSymptoms.includes('mandíbula') || lowerCaseSymptoms.includes('clic') || lowerCaseSymptoms.includes('bloqueo')) {
      conditions.push('Trastorno de la articulación temporomandibular (ATM)');
    }
    if (lowerCaseSymptoms.includes('afta') || lowerCaseSymptoms.includes('llaga') || lowerCaseSymptoms.includes('herida')) {
      conditions.push('Estomatitis Aftosa');
    }
    if (conditions.length === 0) {
      conditions.push('Condición dental general (necesita más detalles)');
    }
    return conditions;
  }
);

const symptomNavigatorPrompt = ai.definePrompt({
  name: 'symptomNavigatorPrompt',
  input: { schema: SymptomNavigatorInputSchema },
  output: { schema: SymptomNavigatorOutputSchema },
  tools: [getDentalConditions],
  prompt: `Eres un asistente dental útil. Tu objetivo es ayudar a los pacientes a describir sus molestias sugiriendo condiciones dentales comunes o haciendo preguntas aclaratorias.

El paciente describe sus síntomas de la siguiente manera: "{{{symptoms}}}"

Utiliza la herramienta 'getDentalConditions' con los síntomas del paciente para obtener una lista de posibles condiciones dentales.

Si los síntomas son claros y la herramienta devuelve condiciones específicas, proporciona esas condiciones.
Si la herramienta devuelve condiciones muy generales o si los síntomas son vagos, puedes sugerir las condiciones generales y hacer una pregunta aclaratoria para obtener más detalles.

Formato de salida esperado (JSON):
{
  "suggestedConditions": ["Condición A", "Condición B"],
  "clarificationQuestion": "Pregunta aclaratoria si es necesario (opcional)"
}
`,
});

const symptomNavigatorFlow = ai.defineFlow(
  {
    name: 'symptomNavigatorFlow',
    inputSchema: SymptomNavigatorInputSchema,
    outputSchema: SymptomNavigatorOutputSchema,
  },
  async (input) => {
    const { output } = await symptomNavigatorPrompt(input);
    return output!;
  }
);

export async function symptomNavigator(input: SymptomNavigatorInput): Promise<SymptomNavigatorOutput> {
  return symptomNavigatorFlow(input);
}
