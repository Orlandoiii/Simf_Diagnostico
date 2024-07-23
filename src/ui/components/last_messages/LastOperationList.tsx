import logger from '../../../logic/Logger/logger';
import { OperationSchemaListType } from '../../../models/operation_schema';
import NotResultIcon from '../icons/NotResultIcon';
import LastOperationContainer from './LastOperationContainer';

interface LastOperationListProps {

    operationList: OperationSchemaListType | undefined
}

function LastOperationList({ operationList }: LastOperationListProps) {


    logger.log("Renderizo data de Operation 1")

    if (!operationList || !Array.isArray(operationList) || operationList.length == 0) {

        return <div className="w-full h-full flex justify-center items-center">
            <NotResultIcon color='#2348B5' width={165} height={165} />
        </div>
    }

    logger.log("Renderizo data de Operation 2")

    return (
        <div>
            {operationList.map((v, idx) => {
                return <LastOperationContainer key={idx} data={v} />
            })}
        </div>
    );
}



export default LastOperationList;