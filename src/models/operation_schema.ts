import { z } from "zod";

export const OperationSchema = z.object({
    Tipo: z.string().optional(),
    EndToEndId: z.string().optional(),
    FechaDeRecepcion: z.string().optional(),
    FechaDeRegistro: z.string().optional(),
    EstadoDeNegocio: z.union([z.string(), z.number()]).optional(),
    TiempoParaPersistir: z.string().optional(),
    EstadoDeNotificacionBanco: z.union([z.string(), z.number()]).optional(),
});

export const OperationSchemaList = z.array(OperationSchema);



export type OperationSchemaType = z.infer<typeof OperationSchema>;

export type OperationSchemaListType = z.infer<typeof OperationSchemaList>;



