import { PropsWithChildren } from 'react';
import LinearDots from '../icons/LinearDots';
import RefreshIcon from '../icons/RefreshIcon';
import ErrorIcon from '../icons/ErrorIcon';


interface CardContainerProperties {
    isLoading: boolean,
    title?: string,
    isErr?: boolean,
    errMessage?: string,
    onRefresh?: React.MouseEventHandler<HTMLButtonElement> | undefined
}

function CardContainer({ children, isLoading, title = "", isErr = false, onRefresh }: PropsWithChildren<CardContainerProperties>) {

    return (
        <div className='relative w-full h-full min-w-[300px] min-h-[300px]  rounded-3xl block  border-transparent shadow-md 
        transition duration-400 ease-in-out bg-white hover:bg-gray-50 
        transform hover:z-50 border-l-8 hover:border-blue-600  py-2 overflow-hidden'>

            <button className={`absolute top-1 right-5 transition-all ease-in-out hover:rotate-180 
            hover:scale-105 z-20 ${isLoading ? 'opacity-0' : 'opacity-100'}`} onClick={(e) => {

                    if (isLoading)
                        return;

                    if (onRefresh)
                        onRefresh(e)
                }}>
                <RefreshIcon width={40} height={40} color='#2054DB' />
            </button>

            {title && title != "" && <h2 className='absolute z-10  text-black rounded-lg   top-3 left-1/2 transform -translate-x-1/2 text-xl uppercase font-medium text-center'>{title}</h2>}

            <div className={`transition-all ease-in-out duration-200 pt-4 ${isLoading || isErr ? "opacity-0 scale-50" : "opacity-100 scale-100"}`}>
                {children}
            </div>


            <div className={`absolute left-1/2 top-1/2 trasnsform -translate-x-1/2 -translate-y-1/2 
                 transition-all ease-in-out duration-200
                ${isLoading ? "opacity-100 z-10 scale-105" : "opacity-0 -z-10 scale-50"}`}>
                <LinearDots height={80} />
            </div>

            <div className={`absolute  h-full left-1/2 top-1/2 trasnsform -translate-x-1/2 -translate-y-1/2 
                 transition-all ease-in-out duration-200
                ${!isLoading && isErr ? "opacity-100 z-10 scale-105" : "opacity-0 -z-10 scale-50"}`}>
                <div className='h-full flex flex-col justify-start items-center space-y-4 pt-24'>
                    <ErrorIcon height={140} width={140} color='#EB1C29' />
                    <h2 className='text-center text-xl font-bold'>Lo sentimos pero no pudimos cargar los datos por favor verifique</h2>
                </div>

            </div>
            
            

        </div >
    );
}

export default CardContainer;