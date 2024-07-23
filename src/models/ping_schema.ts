import { z } from 'zod';

const PingEnvio = z.object({
    Status: z.string().optional(),
});

export const PingResultSchema = z.object({
    Resultado: z.string().optional(),
    Direccion: z.string().optional(),
    DireccionDns: z.string().optional(),
    NumeroDeEnvios: z.number().int().optional(),
    TiempoTotalDeEnvio: z.number().optional(),
    Envios: z.array(PingEnvio).optional(),
});


export type PingResultSchemaType = z.infer<typeof PingResultSchema>;


