import { motion } from "framer-motion"
import logger from "../../../logic/Logger/logger";
import { PropsWithChildren } from "react";

const backDropAnimation = {

    hidden: {
        opacity: 0,
    },
    visible: {
        opacity: 1,
    },
    exit: {
        opacity: 0
    }
}


interface BackdropProperties {

    outRef?: React.LegacyRef<HTMLDivElement> | undefined,
    backGround?: string,
}

export default function Backdrop({ outRef, backGround = "bg-white/60", children }: PropsWithChildren<BackdropProperties>) {

    logger.log("Renderizo Backdrop ");


    return (
        <>
            <motion.div
                variants={backDropAnimation}
                initial={"hidden"}
                animate={"visible"}
                exit={"exit"}
                // id="Backdrop"
                ref={outRef}
                className={`fixed inset-0 ${backGround} h-full w-full overflow-hidden overscroll-none z-40 
                    flex justify-center items-center`}>
                {children}
            </motion.div>
        </>
    )
}