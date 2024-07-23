import logger from "../../../logic/Logger/logger";
import { OperationResumSchemaListType } from "../../../models/operation_resum";
import NotResultIcon from "../icons/NotResultIcon";

interface LastOperationResumProps {
    data?: OperationResumSchemaListType | undefined
}


function getStateColor(operationState: string | undefined) {


    if (operationState == "A") {
        return "text-emerald-400"
    }

    if (operationState == "0") {
        return "text-yellow-400"
    }

    return "text-red-500"

}

function LastOperationResum({ data }: LastOperationResumProps) {

    logger.log("Renderizando Resumen de Operaciones Data:", data)


    if (!data || !Array.isArray(data) || data.length == 0) {
        return <div className="w-full h-full flex justify-center items-center">
            <NotResultIcon color='#2348B5' width={165} height={165} />
        </div>
    }



    return (

        <div className="w-full flex flex-col justify-between text-lg">
            {data?.map((ope, idx) => {
                return <div key={idx} className="grid grid-cols-1  md:grid-cols-3">
                    <p className=""><span className="font-bold">{ope?.Tipo}</span></p>
                    <p className="pb-4">Estado: <span className={`font-bold 
                ${getStateColor(ope?.Estado)}`}>{ope?.Estado}</span></p>
                    <p className="pb-4">Total: <span className={`font-bold `}>{ope?.Total}</span></p>
                </div>
            })}
        </div>

    );
}

export default LastOperationResum;