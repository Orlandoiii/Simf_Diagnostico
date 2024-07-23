interface KeyValueProps {
    keyValue?: string,
    value?: string,
    isSpecial?: boolean,
    isSuccess?: boolean
}

export default function KeyValue({ keyValue = "", value = "", isSpecial = false, isSuccess = false }: KeyValueProps) {

    return (
        <div className={`flex justify-start items-center space-x-3  space-y-0.5 ${isSpecial ? "my-1.5" : ""}`} >
            <p className={` ${isSpecial ? "uppercase font-bold" : ""}`}>{`${keyValue} :`}</p>
            <p className={`   
                ${!isSpecial && value ? "text-gray-600" : isSuccess ? "text-emerald-400 font-bold" :
                    "text-red-800 font-bold"}`}>{value}</p>
        </div>
    )
}
