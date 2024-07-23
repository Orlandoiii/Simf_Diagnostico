import { CapaServicioArraySchemaType } from "../../../models/core_schema";
import CommunicationResultComponent from "../results/CommunicationResult";
import CardContainer from "./CardContainer";
import CardResultContainer from "./CardResultContainer";

interface CoreCardProps {
    coreData: CapaServicioArraySchemaType | undefined,
    isLoading: boolean,
    isErr: boolean,
    onRefresh?: React.MouseEventHandler<HTMLButtonElement> | undefined

}


function CoreCard({ coreData, isLoading, isErr, onRefresh }: CoreCardProps) {
    return (
        <CardContainer isLoading={isLoading} isErr={isErr}  onRefresh={onRefresh} title="Capa">
            <CardResultContainer >
                <div className="space-y-1 flex flex-col">
                    {coreData?.map((v, idx) => {
                        return (
                            <div className="" key={idx}>
                                <h2 className="text-lg text-[#2257DD] font-bold">{v.MedioDePago}:</h2>
                                <CommunicationResultComponent pingResult={v.PingResult} telnetResult={v.TelnetResult} />
                            </div>
                        )
                    })}
                </div>
            </CardResultContainer>
        </CardContainer >

    );
}


export default CoreCard;