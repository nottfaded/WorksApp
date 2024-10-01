import { ReactNode } from "react"
import { AccountProvider } from "./contexts/AccountContext"

const AppProviders = ({ children } : { children : ReactNode }) => {
    return(
        <AccountProvider>
            {children}
        </AccountProvider>
    )
}

export default AppProviders;