import { createContext, ReactNode, useContext, useEffect, useState } from "react"
import { Role } from "../types/role";

interface IAccountBase {
    id: number;
    role: Role;
    email: string;
}

interface IUser extends IAccountBase {
    firstname : string;
    lastname : string;
    fullname : string
}

interface ICorporation extends IAccountBase {
    companyName: string;
}

export type AccountType = IUser | ICorporation;

interface IAccountContextType {
    account : AccountType | null,
    setData : (account: AccountType | null) => void,
    loading : boolean
}

const AccountContext = createContext<IAccountContextType | undefined>(undefined);

export const useAccount = () => {
    const context = useContext(AccountContext);
    if(!context){
        throw new Error('useAccount must be used within an AccountProvider')
    }
    return context;
}

export const AccountProvider = ({children} : {children : ReactNode}) => {
    const [account, setData] = useState<AccountType | null>(null);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        
        const data = localStorage.getItem('account');
        if(data){
            setData(JSON.parse(data) as AccountType)
        }

        setLoading(false)
    }, []);

    return (
        <AccountContext.Provider value={{ account, setData, loading: loading }}>
            {children}
        </AccountContext.Provider>
    )
}

export function isUser(account: AccountType): account is IUser {
    return account.role === Role.User;
}

export function isCorporation(account: AccountType): account is ICorporation {
    return account.role === Role.Corporation;
}