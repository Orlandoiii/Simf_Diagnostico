export class DiagnosticoDataState {
    firsLoad: boolean;



    cceData: any | null;
    cceIsErr: boolean;
    cceIsLoading: boolean;

    postgresData: any | null;
    postgresIsErr: boolean;
    postgresIsLoading: boolean;

    kafkaData: any | null;
    kafkaIsErr: boolean;
    kafkaIsLoading: boolean;

    coreData: any | null;
    coreIsErr: boolean;
    coreIsLoading: boolean;

    operationData: any | null;
    operationIsErr: boolean;
    operationIsLoading: boolean;

    msData: any | null;
    msIsErr: boolean;
    msIsLoading: boolean;

    operationResum: any | null;
    operationResumErr: boolean;
    operationResumIsLoading: boolean;

    constructor() {
        this.firsLoad = true;

        this.cceData = null;
        this.cceIsErr = false;
        this.cceIsLoading = true;

        this.postgresData = null;
        this.postgresIsErr = false;
        this.postgresIsLoading = true;

        this.kafkaData = null;
        this.kafkaIsErr = false;
        this.kafkaIsLoading = true;

        this.coreData = null;
        this.coreIsErr = false;
        this.coreIsLoading = true;

        this.operationData = null;
        this.operationIsErr = false;
        this.operationIsLoading = true;

        this.msData = null;
        this.msIsErr = false;
        this.msIsLoading = true;


        this.operationResum = null;
        this.operationResumErr = false;
        this.operationResumIsLoading = true
    }

    // Static method to create an instance of the class with initial state values
    static getInitialState(): DiagnosticoDataState {
        return new DiagnosticoDataState();
    }
}
