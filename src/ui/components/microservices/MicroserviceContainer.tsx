import { AssemblyInfoSchemaType, MicroserviceSchemaType } from "../../../models/microservices_schemas";
import DotIcon from "../icons/DotIcon";

interface MicroserviceContainerProps {
    data?: MicroserviceSchemaType | undefined
}

interface AssemblyInfoContainerProps {
    assembly: AssemblyInfoSchemaType | undefined
}

export function AssemblyInfoContainer({ assembly }: AssemblyInfoContainerProps) {

    return (

        <div className=" ">

            <div className="flex flex-col space-y-1 text-md md:space-y-0 md:flex-row justify-start  md:space-x-4">

                <div className="flex space-x-2 w-[140px]">
                    <DotIcon color="#2563EB" />
                    <p className="font-bold">{assembly?.Nombre}  </p>

                </div>

                <p className="">Version: <span className="font-bold">{assembly?.Version}</span> </p>
                <p>Fecha: <span className="font-bold">{assembly?.FechaDeCompilacion}</span></p>
            </div>

        </div>
    )
}

function MicroserviceContainer({ data }: MicroserviceContainerProps) {
    if (!data)
        return <></>

    return (

        <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6">

                <p><span className="text-black font-bold">{data.Nombre}</span></p>
                <p className="uppercase">Ip: <span className="text-gray-700">{data.Ip}</span></p>
                <p className="font-bold">Estado: <span className="font-bold text-green-500">{data.EstadoDelConsumidor}</span></p>
                <p>Fecha De Inicio: <span className="text-gray-500">{data.FechaDeInicio?.split(".")[0]}</span></p>
                <p>Particiones Asignadas: <span className="text-gray-500">{data.TotalDeParticionesAsignadas}</span></p>
                <p>Numero de Hilos: <span className="text-gray-500">{data.NumeroDeHilos}</span></p>

            </div>
            {/* <div className="space-y-4">
                {data && Array.isArray(data.ListaAssemblyInfo) && data.ListaAssemblyInfo.length > 0 &&
                    data.ListaAssemblyInfo.map((assembly) => {
                        return <AssemblyInfoContainer key={assembly.Nombre} assembly={assembly} />
                    })
                }
            </div> */}

        </div>

    );
}

export default MicroserviceContainer;