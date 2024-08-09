import { useEffect, useReducer, useState } from 'react'
import logoPath from './assets/logo.png'

import { PostgresResultSchema } from './models/postgres_schema';
import PostgresCard from './ui/components/card_result/PostgresCard';
import KafkaCard from './ui/components/card_result/KafkaCard';
import { KafkaResultSchema } from './models/kafka_schema';
import CceCard from './ui/components/card_result/CceCard';
import { InfoDeSincronizacionSchema } from './models/cce_schema';
import CoreCard from './ui/components/card_result/CoreCard';
import { CapaServicioArraySchema } from './models/core_schema';
import CardContainer from './ui/components/card_result/CardContainer';
import LastOperationList from './ui/components/last_messages/LastOperationList';
import { OperationSchemaList } from './models/operation_schema';
import MicroservicesListProductContainer from './ui/components/microservices/MicroservicesListProductContainer';
import { MicroservicesProductSchemaList } from './models/microservices_schemas';
import { DiagnosticoDataState } from './logic/StateLogic/DiagnosticState';
import logger from './logic/Logger/logger';
import { LoadingModal } from './ui/components/modal/LoadingModal';
import axios, { GenericAbortSignal } from 'axios';
import LastOperationResum from './ui/components/last_messages/LastOperationResum';
import { OperationResumSchemaList } from './models/operation_resum';



const initialState = DiagnosticoDataState.getInitialState()

// const baseEndpoint = "/lbtr/diagnostico/";

class Result {
  isSuccessfull: boolean;
  data?: any;
  err?: any;

  constructor(isSuccesfull: boolean, data?: any, err?: any) {

    this.isSuccessfull = isSuccesfull;
    this.data = data;
    this.err = err;
  }
}

async function getData(endPoint: string, signal?: GenericAbortSignal | undefined): Promise<Result> {

  logger.log("Pidiendo Request a:", endPoint);

  try {

    let response = await axios.get(endPoint, {
      signal: signal
    })

    logger.log("Response:", response);

    if (response.status >= 200 && response.status <= 299) {

      logger.log("Data:", response.data);

      return new Result(true, response.data);

    }

    return new Result(false, {}, "El status code no indica exito");

  } catch (error: any) {

    logger.error(error);

    if (error.message === "unmount")
      return new Result(true, {});

    return new Result(false, {}, error);

  }

}

enum TypeOfMetric {
  Cce,
  Kafka,
  Postgres,
  Core,
  Operations,
  Microservices,
  OperationsResum
}

function getMetricFields(type: TypeOfMetric): Array<string> {

  switch (type) {

    case TypeOfMetric.Cce:
      return ["cce", "sincronizacion"]

    case TypeOfMetric.Kafka:
      return ["kafka", "kafka"]

    case TypeOfMetric.Postgres:
      return ["postgres", "postgres"]

    case TypeOfMetric.Core:
      return ["core", "core"]

    case TypeOfMetric.Operations:
      return ["operation", "ultimos_mensajes"]

    case TypeOfMetric.Microservices:
      return ["ms", "microservicios"]

    case TypeOfMetric.OperationsResum:
      return ["operation-resum", "ultimos_mensajes_resumen"]

  }

}



function reducer(state: DiagnosticoDataState, action: any) {

  switch (action.type) {


    case "cce/load":
      return { ...state, cceData: null, cceIsLoading: true, cceIsErr: false };
    case "cce/data":
      return { ...state, cceData: action.payload, cceIsLoading: false, cceIsErr: false, firsLoad: false };
    case "cce/err":
      return { ...state, cceIsLoading: false, cceIsErr: true };


    case "kafka/load":
      return { ...state, kafkaData: null, kafkaIsLoading: true, kafkaIsErr: false };
    case "kafka/data":
      return { ...state, kafkaData: action.payload, kafkaIsLoading: false, kafkaIsErr: false };
    case "kafka/err":
      return { ...state, kafkaIsLoading: false, kafkaIsErr: true };

    // Add cases for other data types:


    case "postgres/load":
      return { ...state, postgresData: null, postgresIsLoading: true, postgresIsErr: false };
    case "postgres/data":
      return { ...state, postgresData: action.payload, postgresIsLoading: false, postgresIsErr: false };
    case "postgres/err":
      return { ...state, postgresIsLoading: false, postgresIsErr: true };



    case "core/load":
      return { ...state, coreData: null, coreIsLoading: true, coreIsErr: false };
    case "core/data":
      return { ...state, coreData: action.payload, coreIsLoading: false, coreIsErr: false };
    case "core/err":
      return { ...state, coreIsLoading: false, coreIsErr: true };




    case "operation/load":
      return { ...state, operationData: null, operationIsLoading: true, operationIsErr: false };
    case "operation/data":
      return { ...state, operationData: action.payload, operationIsLoading: false, operationIsErr: false };
    case "operation/err":
      return { ...state, operationIsLoading: false, operationIsErr: true };




    case "ms/load":
      return { ...state, msData: null, msIsLoading: true, msIsErr: false };
    case "ms/data":
      return { ...state, msData: action.payload, msIsLoading: false, msIsErr: false };
    case "ms/err":
      return { ...state, msIsLoading: false, msIsErr: true };


    case "operation-resum/load":
      return { ...state, operationResum: null, operationResumIsLoading: true, operationResumErr: false };
    case "operation-resum/data":
      return { ...state, operationResum: action.payload, operationResumIsLoading: false, operationResumErr: false };
    case "operation-resum/err":
      return { ...state, operationResum: false, operationResumErr: true };


  }

  return state
}



function tryParse<T>(schema: Zod.Schema<T>, isLoading: boolean, isErr: boolean, data: any): T | undefined {

  if (isLoading || isErr)
    return undefined;

  try {

    let parseValue = schema.parse(data);

    return parseValue;

  }
  catch (err) {
    logger.error("Error Parsenado", err);

    return undefined
  }
}

function loadData(dispatch: any, address: string, type: TypeOfMetric) {

  const [prefijo, endpoint] = getMetricFields(type);

  dispatch({ type: prefijo + "/load" });

  getData(address + endpoint).then(result => {

    if (!result.isSuccessfull) {
      dispatch({ type: prefijo + "/err" });
      return;
    }

    dispatch({ type: prefijo + "/data", payload: result.data });

  })

}




function App() {


  const [state, dispatch] = useReducer(reducer, initialState)


  const [loading, setLoading] = useState(false);


  const [address, setAddress] = useState("");

  logger.log("Base:", address);


  function loadCCe() {
    return loadData(dispatch, address, TypeOfMetric.Cce);
  }

  function loadKafka() {
    return loadData(dispatch, address, TypeOfMetric.Kafka);
  }

  function loadPostgres() {
    return loadData(dispatch, address, TypeOfMetric.Postgres);
  }

  function loadCore() {
    return loadData(dispatch, address, TypeOfMetric.Core);
  }

  function loadOperations() {
    return loadData(dispatch, address, TypeOfMetric.Operations);
  }

  function loadMs() {
    return loadData(dispatch, address, TypeOfMetric.Microservices);
  }

  function loadOperationResum() {
    return loadData(dispatch, address, TypeOfMetric.OperationsResum);
  }


  function loadAll() {
    if (state.firsLoad)
      setLoading(true);

    loadCCe();
    loadKafka();
    loadPostgres();
    loadCore();
    loadOperations();
    loadMs();
    loadOperationResum();

  }


  useEffect(() => {
    const location = window.location.host;
    const pathName = window.location.pathname;
    const protocol = window.location.protocol;
    setAddress(protocol + "//" + location + pathName)

    //setAddress("http://192.168.100.230:8083/lbtr/diagnostico/")


    // setAddress("http:" + "//" + "192.168.100.220:8082/simf/diagnostico/")
  }, [])

  return (
    <>
      <div className="w-full h-full bg-gradient-to-r from-blue-300 via-blue-50 to-blue-300  text-sm px-4 md:px-8 
      lg:px-20 xl:px-32 py-8 space-y-10">


        <div className="bg-transparent grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 place-items-center my-4">

          <div className=''>
            <img src={logoPath} alt="Logo Soluciones Sycom" />
          </div>

          <button className='max-w-[340px] text-lg text-white  py-4 px-32 rounded-full 
          shadow-md bg-gradient-to-r from-blue-700 to-blue-500 
          hover:from-blue-800 hover:scale-105 hover:to-blue-400  mt-8 md:mt-4 '
            onClick={() => {
              loadAll();
            }}
          >Diagnosticar</button>

        </div>


        <div className={`w-full h-full space-y-8 ${!state.firsLoad ? "opacity-100" : "opacity-0"}`} >

          <div className={`flex flex-col space-y-8  mt-8 xl:flex-row xl:space-y-0 xl:space-x-4 
            `}>

            <div className='w-full flex flex-col space-y-8 md:space-y-0 md:flex-row md:space-x-4'>
              <CceCard
                isLoading={state.cceIsLoading}
                cceData={tryParse(InfoDeSincronizacionSchema, state.cceIsLoading, state.cceIsErr, state.cceData)}
                isErr={state.cceIsErr}
                onRefresh={() => loadCCe()}
              />

              <PostgresCard
                isLoading={state.postgresIsLoading}
                postgresData={tryParse(PostgresResultSchema, state.postgresIsLoading, state.postgresIsErr, state.postgresData)}
                isErr={state.postgresIsErr}
                onRefresh={() => loadPostgres()}
              />
            </div>


            <div className='w-full flex flex-col space-y-8 md:space-y-0 md:flex-row md:space-x-4'>
              <KafkaCard
                isLoading={state.kafkaIsLoading}
                kafkaData={tryParse(KafkaResultSchema, state.kafkaIsLoading, state.kafkaIsErr, state.kafkaData)}
                isErr={state.kafkaIsErr}
                onRefresh={() => loadKafka()}

              />
              <CoreCard
                isLoading={state.coreIsLoading}
                coreData={tryParse(CapaServicioArraySchema, state.coreIsLoading, state.coreIsErr, state.coreData)}
                isErr={state.coreIsErr}
                onRefresh={() => loadCore()}

              />
            </div>

          </div>


          <CardContainer
            title='Operaciones'
            isLoading={state.operationIsLoading}
            isErr={state.operationIsErr}
            onRefresh={() => loadOperations()}

          >
            <div className='px-4 pt-12 pb-2'>
              <LastOperationList operationList={tryParse(OperationSchemaList,
                state.operationIsLoading,
                state.operationIsErr, state.operationData)} />
            </div>
          </CardContainer>

          <CardContainer
            title='Operaciones Resumen (1000)'
            isLoading={state.operationResumIsLoading}
            isErr={state.operationResumErr}
            onRefresh={() => loadOperationResum()}

          >
            <div className='px-4 pt-12 pb-2'>
              <LastOperationResum
                data={tryParse(OperationResumSchemaList, state.operationResumIsLoading,
                  state.operationResumErr, state.operationResum)} />
            </div>
          </CardContainer>

          <CardContainer
            title='Microservicios'
            isLoading={state.msIsLoading}
            isErr={state.msIsErr}
            onRefresh={() => loadMs()}

          >
            <div className='px-4 pt-12 pb-2'>
              <MicroservicesListProductContainer
                microserviceList={tryParse(MicroservicesProductSchemaList, state.msIsLoading, state.msIsErr, state.msData)} />
            </div>
          </CardContainer>




          <div className='w-full flex justify-center'>
            <button onClick={() => {
              window.print();
            }} className="bg-gradient-to-r from-blue-700 to-blue-500 hover:from-blue-800 hover:to-blue-600 
          text-white font-bold py-4 px-10 rounded-full shadow-lg shadow-blue-500/50">Print</button>
          </div>


        </div>



      </div>
      <LoadingModal open={(loading && state.firsLoad) || address == ""}></LoadingModal>

    </>
  )
}

export default App
