import { AnimatePresence } from "framer-motion"
import logger from "../../../logic/Logger/logger"
import { motion } from "framer-motion"

import Backdrop from "./Backdrop"
import LinearDots from "../icons/LinearDots"

interface LoadingModalProps {
    open: boolean
}

export function LoadingModal({ open }: LoadingModalProps) {

    logger.log("Renderizo LoadModal", open)
    return (

        <AnimatePresence
            initial={false}
            onExitComplete={() => null}

        >
            {open &&
                <Backdrop backGround="bg-black/95">
                    <motion.div
                        onClick={(e) => e.stopPropagation()}
                        className={`
               flex justify-center items-center  
               min-h-[320px] min-w-[320px] md:min-h-[380px]  md:min-w-[460px]`}
                    >
                        <LinearDots height={100} />
                    </motion.div>

                </Backdrop>
            }
        </AnimatePresence>
    )
}