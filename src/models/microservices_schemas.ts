import { z } from 'zod';

// Schema for individual AssemblyInfo items
export const AssemblyInfoSchema = z.object({
    Nombre: z.string().optional(),
    Version: z.string().optional(),
    FechaDeCompilacion: z.string().optional(), // Assuming this is a string representation of a date
});

// Main schema for the entire object
export const MicroserviceSchema = z.object({
    Nombre: z.string().optional(),
    Ip: z.string().optional(),
    FechaDeInicio: z.string().optional(), // Assuming this is a string representation of a date
    EstadoDelConsumidor: z.string().optional(),
    NumeroDeHilos: z.string().optional(),  // Note: It's a string in your JSON, but could be converted to a number if needed
    CantidadDeMemoriaRAM: z.string(), // Similar to NumeroDeHilos
    Lenguaje: z.string().optional(),
    FechaDeParticionesAsignadas: z.string().optional(), // Assuming this is a string representation of a date
    TotalDeParticionesAsignadas: z.string().optional(), // Similar to NumeroDeHilos
    ListaAssemblyInfo: z.array(AssemblyInfoSchema).optional(),
});


export const MicroservicesProductSchema = z.object({
    Tipo: z.string().optional(), // Assuming these are the valid types
    Microservicios: z.array(MicroserviceSchema).optional(),
});


export const MicroservicesProductSchemaList = z.array(MicroservicesProductSchema).optional()


export type AssemblyInfoSchemaType = z.infer<typeof AssemblyInfoSchema>;


export type MicroserviceSchemaType = z.infer<typeof MicroserviceSchema>;


export type MicroservicesProductSchemaType = z.infer<typeof MicroservicesProductSchema>;


export type MicroservicesProductSchemaListType = z.infer<typeof MicroservicesProductSchemaList>;
