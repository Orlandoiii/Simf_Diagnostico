import React from "react";


function CardResultContainer({ children }: React.PropsWithChildren) {
    return (
        <div className={`relative w-full  md:h-[420px]  overflow-y-auto px-3 py-4`}>
            {children}
        </div>
    );
}

export default CardResultContainer;