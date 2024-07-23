import { TelnetResultSchemaType } from "../../../models/telnet_schema";
import KeyValue from "../key_value/KeyValue";


interface TelnetResultComponentsProps {
    telnetResult: TelnetResultSchemaType | undefined
}


function TelnetResultComponent({ telnetResult }: TelnetResultComponentsProps) {

    if (!telnetResult) {
        return <></>
    }

    return (
        <div>
            <KeyValue keyValue={"Telnet"}
                value={telnetResult.Resultado} isSpecial={true} isSuccess={telnetResult.Resultado == "EXITOSO"} />
            {/* <KeyValue keyValue={"Ip"}
                value={telnetResult.Direccion} />
            <KeyValue keyValue={"Dns"}
                value={telnetResult.DireccionDns} />
            <KeyValue keyValue={"Puerto"}
                value={telnetResult.Puerto?.toString()} /> */}
            <KeyValue keyValue={"Tiempo Total"}
                value={telnetResult.TiempoTotalDeConexion?.toString() + " ms"} />
        </div>
    );

}

export default TelnetResultComponent;