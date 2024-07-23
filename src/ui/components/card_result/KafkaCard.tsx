import { z } from "zod";
import { KafkaResultSchemaType } from "../../../models/kafka_schema";
import KafkaResultComponent from "../results/KafkaResultComponent";
import CardContainer from "./CardContainer";
import CardResultContainer from "./CardResultContainer";
import { PingResultSchema } from "../../../models/ping_schema";
import { TelnetResultSchema } from "../../../models/telnet_schema";
import CommunicationResultComponent from "../results/CommunicationResult";

interface KafkaCardProps {
    kafkaData: KafkaResultSchemaType | undefined,
    isLoading: boolean,
    isErr: boolean,
    onRefresh?: React.MouseEventHandler<HTMLButtonElement> | undefined

}

const CombineResultObj = z.object({
    Ping: PingResultSchema.optional(),
    Telnet: TelnetResultSchema.optional()
})

const CombineResult = z.array(CombineResultObj)

type CombineResultType = z.infer<typeof CombineResult>;


function KafkaCard({ kafkaData, isLoading, isErr, onRefresh }: KafkaCardProps) {

    let combinedResults: CombineResultType = [];

    if (kafkaData?.PingResult && Array.isArray(kafkaData.PingResult) && kafkaData.PingResult.length > 0) {
        combinedResults = kafkaData?.PingResult.map((ping, index) => {

            let telnet = {};

            if (kafkaData.TelnetResult &&
                Array.isArray(kafkaData.TelnetResult) &&
                kafkaData.TelnetResult.length > index)

                telnet = kafkaData?.TelnetResult[index]; // Get corresponding TelnetResult

            return {
                Ping: ping,
                Telnet: telnet || undefined, // Handle cases where there's no matching TelnetResult
            };
        });
    } else if (kafkaData?.TelnetResult &&
        Array.isArray(kafkaData.TelnetResult
        ) && kafkaData.TelnetResult.length > 0) {

        combinedResults = kafkaData.TelnetResult.map((v) => {
            return {
                Ping: undefined,
                Telnet: v, // Handle cases where there's no matching TelnetResult
            };
        })
    }





    return (
        <CardContainer isLoading={isLoading} isErr={isErr} onRefresh={onRefresh} title="Kafka">
            <CardResultContainer>
                <div className="space-y-1 flex flex-col">

                    <KafkaResultComponent kafkaResult={kafkaData?.Kafka} />

                    {combinedResults && combinedResults.length > 0 && combinedResults.map((v, idx) => {
                        return <CommunicationResultComponent key={idx} pingResult={v.Ping}
                            telnetResult={v.Telnet} />
                    })}

                </div>
            </CardResultContainer>

        </CardContainer>

    );
}


export default KafkaCard;