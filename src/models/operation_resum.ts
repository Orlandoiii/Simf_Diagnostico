import { z } from 'zod';

export const OperationResumSchema = z.object({
    Tipo: z.string().optional(),
    Estado: z.string().optional(),
    Total: z.number().optional(),

});


export const OperationResumSchemaList = z.array(OperationResumSchema)


export type OperationResumSchemaType = z.infer<typeof OperationResumSchema>;



export type OperationResumSchemaListType = z.infer<typeof OperationResumSchemaList>;