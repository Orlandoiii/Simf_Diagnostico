import { PostgresResultSchemaType } from "../../../models/postgres_schema";
import CommunicationResultComponent from "../results/CommunicationResult";
import PostgresResultComponent from "../results/PostgresResultComponent";
import CardContainer from "./CardContainer";
import CardResultContainer from "./CardResultContainer";

interface PostgresCardProps {
    postgresData: PostgresResultSchemaType | undefined,
    isLoading: boolean,
    isErr: boolean,
    onRefresh?: React.MouseEventHandler<HTMLButtonElement> | undefined

}


function PostgresCard({ postgresData, isLoading, isErr, onRefresh }: PostgresCardProps) {


    return (
        <CardContainer isLoading={isLoading} isErr={isErr} onRefresh={onRefresh} title="Postgres">
            <CardResultContainer >
                <div className="flex flex-col">
                    <PostgresResultComponent postgresResult={postgresData?.Postgres} />
                    <CommunicationResultComponent pingResult={postgresData?.PingResult}
                        telnetResult={postgresData?.TelnetResult} />
                    {/* <PingResultComponent pingResult={postgresData?.PingResult} />
                    <TelnetResultComponent telnetResult={postgresData?.TelnetResult} /> */}
                </div>
            </CardResultContainer>
        </CardContainer>
    );
}


export default PostgresCard;