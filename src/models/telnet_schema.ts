import { z } from 'zod';

export const TelnetResultSchema = z.object({
  Resultado: z.string().optional(),
  Direccion: z.string().optional(),
  DireccionDns: z.string().optional(),
  Puerto: z.string().optional(), // Note: Puerto is represented as a string
  TiempoTotalDeConexion: z.number().optional(),
});


export type TelnetResultSchemaType = z.infer<typeof TelnetResultSchema>;


