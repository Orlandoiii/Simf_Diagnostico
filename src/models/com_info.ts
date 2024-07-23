import { z } from 'zod';

export const DirectionInfoSchema = z.object({
    Direccion: z.string().optional(),
    DireccionDns: z.string().optional(),
    Puerto: z.string().optional(), // Note: Puerto is represented as a string
    });


export type DirectionInfoSchemaType = z.infer<typeof DirectionInfoSchema>;
