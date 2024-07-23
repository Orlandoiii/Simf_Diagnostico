import { z } from 'zod';
import { PingResultSchema } from './ping_schema';
import { TelnetResultSchema } from './telnet_schema';


export const Kafka = z.object({
    EstadoProduccion: z.string().optional(),
    TiempoParaProducirMiliSegundos: z.number().optional(),
    MensajeConsumido: z.string().optional(),
    TiempoParaConsumirMiliSegundos: z.number().optional(),
});

export const KafkaResultSchema = z.object({
    PingResult: z.array(PingResultSchema).optional(), // Using PingResultSchema
    TelnetResult: z.array(TelnetResultSchema).optional(),
    Kafka: Kafka.optional(),
});


export type KafkaType = z.infer<typeof Kafka>;


export type KafkaResultSchemaType = z.infer<typeof KafkaResultSchema>;



