import { PingResultSchemaType } from "../../../models/ping_schema";
import { TelnetResultSchemaType } from "../../../models/telnet_schema";
import KeyValue from "../key_value/KeyValue";


interface CommunicationResultComponentProps {
    pingResult: PingResultSchemaType | undefined,
    telnetResult: TelnetResultSchemaType | undefined
}




function CommunicationResultComponent({ pingResult, telnetResult }: CommunicationResultComponentProps) {

    if (!pingResult && !telnetResult) {
        return <></>
    }

    return (
        <div>


            <h3 className="font-bold my-1">Direccion</h3>
            <KeyValue keyValue={"Ip"}
                value={telnetResult?.Direccion || pingResult?.Direccion} />
            <KeyValue keyValue={"Dns"}
                value={telnetResult?.DireccionDns || pingResult?.DireccionDns} />
            <KeyValue keyValue={"Puerto"}
                value={telnetResult?.Puerto?.toString()} />

            <KeyValue keyValue={"Ping"}
                value={pingResult?.Resultado} isSpecial={true} isSuccess={pingResult?.Resultado == "EXITOSO"} />
            {/* <KeyValue keyValue={"Ip"}
                value={pingResult.Direccion} />
            <KeyValue keyValue={"Dns"}
                value={pingResult.DireccionDns} /> */}
            <KeyValue keyValue={"Nro De Pings"}
                value={pingResult?.NumeroDeEnvios?.toString()} />
            <KeyValue keyValue={"Tiempo Total"}
                value={pingResult?.TiempoTotalDeEnvio?.toString() + " ms"} />

            <KeyValue keyValue={"Telnet"}
                value={telnetResult?.Resultado} isSpecial={true} isSuccess={telnetResult?.Resultado == "EXITOSO"} />

            <KeyValue keyValue={"Tiempo Total"}
                value={telnetResult?.TiempoTotalDeConexion?.toString() + " ms"} />

        </div>
    );

}

export default CommunicationResultComponent;