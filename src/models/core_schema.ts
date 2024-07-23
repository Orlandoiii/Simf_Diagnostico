import { z } from "zod";
import { PingResultSchema } from "./ping_schema";
import { TelnetResultSchema } from "./telnet_schema";

export const CapaServicioSchema = z.object({
    MedioDePago: z.string().optional(),
    PingResult: PingResultSchema.optional(),
    TelnetResult: TelnetResultSchema.optional()
});

export const CapaServicioArraySchema = z.array(CapaServicioSchema);


export type CapaServicioSchemaType = z.infer<typeof CapaServicioSchema>;


export type CapaServicioArraySchemaType = z.infer<typeof CapaServicioArraySchema>;