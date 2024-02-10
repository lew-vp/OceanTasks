import { createContext } from "react"



interface IUtilContext {
    getTaskReference: (id: string) => any,
    setTaskReference: (id: string, ref: any) => void
}

export const UtilContext = createContext<IUtilContext>({
    getTaskReference: () => {},
    setTaskReference: () => {}
})