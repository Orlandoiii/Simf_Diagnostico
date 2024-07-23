import { z } from 'zod';
import { PingResultSchema } from './ping_schema';
import { TelnetResultSchema } from './telnet_schema';

const PostgresQuery = z.object({
    Query: z.string().optional(),
    TiempoDeEjecucionMiliSegundos: z.number().optional(), // Note: This is a string in your JSON
});

export const Postgres = z.object({
    Resultado: z.string().optional(),
    QuerysEjecutados: z.array(PostgresQuery).optional(),
    ConexionesActivas: z.number().int().optional(),
    ConexionesIdle: z.number().int().optional(),
    EstadoDeLaReplica: z.string().optional(),
    Error: z.string().optional(),
});

export const PostgresResultSchema = z.object({
    PingResult: PingResultSchema.optional(),
    TelnetResult: TelnetResultSchema.optional(),
    Postgres: Postgres.optional(),
});

export type PostgresType = z.infer<typeof Postgres>;


export type PostgresResultSchemaType = z.infer<typeof PostgresResultSchema>;


