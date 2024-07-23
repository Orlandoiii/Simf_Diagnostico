import { MicroservicesProductSchemaType } from '../../../models/microservices_schemas';
import MicroserviceContainer, { AssemblyInfoContainer } from './MicroserviceContainer';

interface MicroserviceProductContainerProps {
    data: MicroservicesProductSchemaType | undefined
}


function MicroserviceProductContainer({ data }: MicroserviceProductContainerProps) {
    return (
        <div className='space-y-4 my-2'>
            <h3 className='text-xl font-bold text-[#1F52DA]'>{data?.Tipo}</h3>



            {data && Array.isArray(data.Microservicios) && data.Microservicios.length > 0 &&
                data.Microservicios.map(m => <MicroserviceContainer key={m.Nombre} data={m} />)
            }

            <div className="space-y-4">

                <h3 className='font-bold text-lg'>Version de los dll:</h3>
                {data && Array.isArray(data.Microservicios) && data.Microservicios.length > 0
                    && data.Microservicios[0].ListaAssemblyInfo &&
                    data.Microservicios[0].ListaAssemblyInfo &&
                    data.Microservicios[0].ListaAssemblyInfo &&
                    data.Microservicios[0].ListaAssemblyInfo.length > 0 &&

                    data.Microservicios[0].ListaAssemblyInfo.map(assembly => {
                        return <AssemblyInfoContainer key={assembly.Nombre} assembly={assembly}
                        />
                    })
                }
            </div>
        </div>
    );
}

export default MicroserviceProductContainer;