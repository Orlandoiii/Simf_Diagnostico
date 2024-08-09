import { MicroserviceSchemaType, MicroservicesProductSchemaType } from '../../../models/microservices_schemas';
import MicroserviceContainer, { AssemblyInfoContainer } from './MicroserviceContainer';

interface MicroserviceProductContainerProps {
    data: MicroservicesProductSchemaType | undefined
}



function MicroserviceProductContainer({ data }: MicroserviceProductContainerProps) {


    const microserviciosPorIp: { [ip: string]: MicroserviceSchemaType } = {};


    if (data && Array.isArray(data.Microservicios) && data.Microservicios.length > 0) {
        data.Microservicios.forEach(microservicio => {

            if (microservicio.Ip != null && microservicio.Ip != "") {
                if (!microserviciosPorIp[microservicio.Ip?.split(":")[0]]) {
                    microserviciosPorIp[microservicio.Ip?.split(":")[0]] = microservicio;
                }
            }

        });

    }


    const nuevaLista: MicroserviceSchemaType[] = Object.values(microserviciosPorIp);

    return (
        <div className='space-y-4 my-2'>
            <h3 className='text-xl font-bold text-[#1F52DA]'>{data?.Tipo}</h3>

            {data && Array.isArray(data.Microservicios) && data.Microservicios.length > 0 &&
                data.Microservicios.map(m => <MicroserviceContainer key={m.Nombre + (m.Ip ?? "")} data={m} />)
            }

            {nuevaLista && Array.isArray(nuevaLista) && nuevaLista.length > 0 && (
                <div className='space-y-4'> {/* Added a wrapping div for better structure */}
                    {nuevaLista.map((ms) => (
                        <div key={ms.Ip}>
                            <h3 className='font-bold text-lg'>Versión de los dlls --
                                <span className='text-md font-medium text-[#2257DD]'>   {ms.Ip?.split(":")[0]}</span></h3>

                            {ms && Array.isArray(ms.ListaAssemblyInfo) && ms.ListaAssemblyInfo.length > 0
                                && ms.ListaAssemblyInfo.map(assembly => (
                                    <AssemblyInfoContainer key={assembly.Nombre} assembly={assembly} />
                                ))}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default MicroserviceProductContainer;