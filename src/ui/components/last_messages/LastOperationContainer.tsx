import { OperationSchemaType } from "../../../models/operation_schema";

interface LastOperationContainerProps {
    data?: OperationSchemaType | undefined
}

function LastOperationContainer({ data }: LastOperationContainerProps) {

    if (!data)
        <></>
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-7">
            <p className=""><span className="font-bold">{data?.Tipo}</span></p>
            <p className="">Ref: <span className="font-bold">{data?.EndToEndId}</span></p>
            <p>Recept: <span className="text-gray-500">{data?.FechaDeRecepcion?.split(".")[0]}</span></p>
            <p>Reg: <span className="text-gray-500">{data?.FechaDeRegistro?.split(".")[0]}</span></p>
            <p>Tiempo: <span className="text-gray-500">{data?.TiempoParaPersistir} ms</span></p>
            <p className="pb-4">Negocio: <span className={`font-bold ${data?.EstadoDeNegocio == "A" ? "text-emerald-400" : "text-red-500"}`}>{data?.EstadoDeNegocio}</span></p>
            <p className="pb-4">Entrega CORE: <span className={`font-bold ${data?.EstadoDeNotificacionBanco == "A" ? "text-emerald-400" : "text-red-500"}`}>{data?.EstadoDeNotificacionBanco}</span></p>
        </div>
    );
}

export default LastOperationContainer;