
import { InfoDeSincronizacion } from "../../../models/cce_schema";
import { AssemblyInfoSchemaType } from "../../../models/microservices_schemas";
import DotIcon from "../icons/DotIcon";
import KeyValue from "../key_value/KeyValue";

interface CceResultComponentProps {
    cceResult: InfoDeSincronizacion | undefined
}

interface AssemblyInfoContainerProps {
    assembly: AssemblyInfoSchemaType | undefined
}

function AssemblyInfoContainer({ assembly }: AssemblyInfoContainerProps) {

    return (

        <div className=" ">

            <div className="flex flex-col space-y-1 justify-start ">

                <div className="flex space-x-2">
                    <DotIcon color="#2563EB" />
                    <p className="font-bold">{assembly?.Nombre}  </p>

                </div>

                <p className="">Version: <span className="font-bold">{assembly?.Version}</span> </p>
                <p>Fecha: <span className="font-bold">{assembly?.FechaDeCompilacion}</span></p>
            </div>

        </div>
    )
}


function CceResultComponent({ cceResult }: CceResultComponentProps) {

    if (!cceResult) {
        return <></>
    }



    const tiempoDeSincronizacion = cceResult.DiferenciaEnSegundos ? parseFloat(cceResult.DiferenciaEnSegundos) : Number.MAX_VALUE

    const isSincronized = cceResult?.DiferenciaEnSegundos != null && (tiempoDeSincronizacion < 5 || tiempoDeSincronizacion > -5);

    return (
        <div>



            <h3 className="font-bold">Control de Cambio: <span className="text-[#2052DB]">{cceResult?.VersionDelServicio}</span></h3>


            <h3 className="font-bold mt-2">Lista de dll:</h3>

            <div className="space-y-2 mb-4">
                {cceResult.ApiAssemblys && Array.isArray(cceResult.ApiAssemblys) && cceResult.ApiAssemblys.length > 0 &&
                    cceResult.ApiAssemblys.map((assembly) => {
                        return <AssemblyInfoContainer key={assembly.Nombre} assembly={assembly} />
                    })
                }
            </div>


            <KeyValue keyValue={"Sincronizacion"}
                value={isSincronized ? "EXITOSO" : "FALLIDO"} isSpecial={true} isSuccess={isSincronized} />

            <KeyValue keyValue={"Fecha del Servidor"}
                value={cceResult.FechaDelServidor} />


            <KeyValue keyValue={"Fecha del Servidor Cce"}
                value={cceResult.FechaDelServidorCCE} />

            <KeyValue keyValue={"Diferencia"}
                value={cceResult.DiferenciaEnSegundos} />

        </div>
    );

}

export default CceResultComponent;