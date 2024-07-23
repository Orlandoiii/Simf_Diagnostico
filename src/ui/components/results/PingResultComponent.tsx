import { PingResultSchemaType } from "../../../models/ping_schema";
import KeyValue from "../key_value/KeyValue";


interface PingResultComponentProps {
    pingResult: PingResultSchemaType | undefined
}


function PingResultComponent({ pingResult }: PingResultComponentProps) {

    if (!pingResult) {
        return <></>
    }

    return (
        <div>
            <KeyValue keyValue={"Ping"}
                value={pingResult.Resultado} isSpecial={true} isSuccess={pingResult.Resultado == "EXITOSO"} />
            {/* <KeyValue keyValue={"Ip"}
                value={pingResult.Direccion} />
            <KeyValue keyValue={"Dns"}
                value={pingResult.DireccionDns} /> */}
            <KeyValue keyValue={"Nro De Pings"}
                value={pingResult.NumeroDeEnvios?.toString()} />
            <KeyValue keyValue={"Tiempo Total"}
                value={pingResult.TiempoTotalDeEnvio?.toString() + " ms"} />

        </div>
    );

}

export default PingResultComponent;