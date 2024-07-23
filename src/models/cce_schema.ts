import { z } from 'zod';
import { PingResultSchema } from './ping_schema';
import { TelnetResultSchema } from './telnet_schema';
import { AssemblyInfoSchema } from './microservices_schemas';

export const InfoDeSincronizacionSchema = z.object({
    VersionDelServicio: z.string().optional(),
    Descripcion: z.string().optional(),
    FechaDelServidor: z.string().optional(),      // Assuming date/time is a string
    FechaDelServidorCCE: z.string().optional(),   // Assuming date/time is a string
    DiferenciaEnSegundos: z.string().optional(),  // Note: This is a string in your JSON
    PingResult: PingResultSchema.optional(),
    TelnetResult: TelnetResultSchema.optional(),
    ApiAssemblys: z.array(AssemblyInfoSchema).optional(),
});

export type InfoDeSincronizacion = z.infer<typeof InfoDeSincronizacionSchema>;
