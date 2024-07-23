import { MicroservicesProductSchemaListType } from '../../../models/microservices_schemas';
import MicroserviceProductContainer from './MicroserviceProductContainer';


interface MicroservicesListProductContainerProps {
    microserviceList: MicroservicesProductSchemaListType | undefined
}

function MicroservicesListProductContainer({ microserviceList }: MicroservicesListProductContainerProps) {
    if (!microserviceList)
        return <></>

    return (
        <div className='space-y-8'>
            {microserviceList &&
                Array.isArray(microserviceList)
                && microserviceList.length > 0 &&
                microserviceList.map(m => <MicroserviceProductContainer key={m.Tipo} data={m} />)
            }
        </div>
    );
}




export default MicroservicesListProductContainer;