
import { PostgresType } from "../../../models/postgres_schema";
import KeyValue from "../key_value/KeyValue";


interface PostgresResultComponentProps {
    postgresResult: PostgresType | undefined
}


function PostgresResultComponent({ postgresResult }: PostgresResultComponentProps) {

    if (!postgresResult) {
        return <></>
    }

    const isSuccesful = postgresResult && postgresResult.Resultado == "EXITOSO" && postgresResult.QuerysEjecutados;

    let time = 0;

    if (isSuccesful) {
        postgresResult?.QuerysEjecutados?.forEach(v => {

            let currentTime = v.TiempoDeEjecucionMiliSegundos ? v.TiempoDeEjecucionMiliSegundos : 0
            time = time + currentTime;
        })

        if (postgresResult.QuerysEjecutados)
            time = time / postgresResult?.QuerysEjecutados?.length
    }


    return (
        <div>
            <KeyValue keyValue={"Principal"}
                value={postgresResult.Resultado} isSpecial={true} isSuccess={postgresResult.Resultado == "EXITOSO"} />

            <KeyValue keyValue={"Conexiones Activas"}
                value={postgresResult.ConexionesActivas?.toString()} />

            <KeyValue keyValue={"Conexiones en Espera"}
                value={postgresResult.ConexionesIdle?.toString()} />

            <KeyValue keyValue={"Ejecucion Querys"}
                value={time.toString() + " ms"} />

            <KeyValue keyValue={"Replica"}
                value={postgresResult.EstadoDeLaReplica} isSpecial={true} isSuccess={postgresResult.EstadoDeLaReplica == "EXITOSO"} />


        </div>
    );

}

export default PostgresResultComponent;