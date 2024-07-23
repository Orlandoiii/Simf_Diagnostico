
import { KafkaType } from "../../../models/kafka_schema";
import KeyValue from "../key_value/KeyValue";

interface KafkaResultComponentProps {
    kafkaResult: KafkaType | undefined
}


function KafkaResultComponent({ kafkaResult }: KafkaResultComponentProps) {

    if (!kafkaResult) {
        return <></>
    }




    return (
        <div>
            <KeyValue keyValue={"Produccion"}
                value={kafkaResult.EstadoProduccion} isSpecial={true}
                isSuccess={kafkaResult.EstadoProduccion == "Persisted"} />

            <KeyValue keyValue={"Tiempo"}
                value={kafkaResult.TiempoParaProducirMiliSegundos?.toString() + " ms"} />

            <KeyValue keyValue={"Consumo"}
                value={kafkaResult.MensajeConsumido} isSpecial={true}
                isSuccess={kafkaResult.MensajeConsumido == "FIN DE PARTICION"} />

            <KeyValue keyValue={"Tiempo"}
                value={kafkaResult.TiempoParaConsumirMiliSegundos?.toString() + " ms"} />

        </div>
    );

}

export default KafkaResultComponent;