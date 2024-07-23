import { InfoDeSincronizacion } from "../../../models/cce_schema";
import CceResultComponent from "../results/CceResultComponent";
import CommunicationResultComponent from "../results/CommunicationResult";

import CardContainer from "./CardContainer";
import CardResultContainer from "./CardResultContainer";

interface KafkaCardProps {
    cceData: InfoDeSincronizacion | undefined,
    isLoading: boolean,
    isErr: boolean,
    onRefresh?: React.MouseEventHandler<HTMLButtonElement> | undefined

}





function CceCard({ cceData, isLoading, isErr, onRefresh }: KafkaCardProps) {
    return (
        <CardContainer isLoading={isLoading} title="CCE" isErr={isErr} onRefresh={onRefresh}>
            <CardResultContainer>
                <div className="space-y-1 flex flex-col">
                    <CceResultComponent cceResult={cceData} />

                    {/* <PingResultComponent pingResult={cceData.PingResult} />
                    <TelnetResultComponent telnetResult={cceData.TelnetResult} /> */}

                    <CommunicationResultComponent pingResult={cceData?.PingResult} telnetResult={cceData?.TelnetResult} />
                </div>
            </CardResultContainer>
        </CardContainer>
    );
}


export default CceCard;