import { createContext, ReactNode, useContext, useEffect, useState } from "react"
import { Role } from "../types/role";

interface IAccountBase {
    id: number;
    role: Role;
    email: string;
}

export interface IUser extends IAccountBase {
    firstname: string;
    lastname: string;
    jobTitle: string;
    skills: string[];
    experience: string;
    expSalary: string;
    engLvl: string;
    country: string;
    linkedIn : string;
    gitHub : string;
}

export interface ICorporation extends IAccountBase {
    companyName: string;
    description: string;
    country: string;
    site : string;
    phone : string;
}

export type AccountType = IUser | ICorporation;

interface IAccountContextType {
    account: AccountType | null,
    setData: (account: AccountType | null) => void,
    loading: boolean,
}

const AccountContext = createContext<IAccountContextType | undefined>(undefined);

export const useAccount = () => {
    const context = useContext(AccountContext);
    if (!context) {
        throw new Error('useAccount must be used within an AccountProvider')
    }
    return context;
}

export const AccountProvider = ({ children }: { children: ReactNode }) => {
    const [account, setData] = useState<AccountType | null>(null);
    const [loading, setLoading] = useState(true);

    // const checkSession = async () => {
    //     try {
    //         const response = await axios.get(`${config.apiBaseUrl}/auth/get`, {withCredentials: true});

    //         if (response.data) {
    //             setData(response.data);
    //         } else {
    //             setData(null); 
    //         }
    //     } catch (error : any) {
    //         setData(null); 
    //         if(error.response.status != 401) toast.error(error.message)
    //     } finally {
    //         setLoading(false);
    //     }
    // };

    useEffect(() => {
        // checkSession();

        const data = localStorage.getItem('account');
        if(data){
            const parseData = JSON.parse(data);
            switch(parseData.role){
                case 'User': setData(parseData as IUser); break;
                case 'Corporation': setData(parseData as ICorporation); break;
            }
        }
        
        
        // setData({
        //     id: 1,
        //     role: Role.User,
        //     email: 'a@a',
        //     firstname: 'firstname',
        //     lastname: 'lastname',
        //     jobTitle: 'senior',
        //     skills: [],
        //     experience: '',
        //     expSalary: '',
        //     engLvl: '',
        //     country: '',
        //     linkedIn: '',
        //     gitHub: ''
        // })
        // setData({
        //     id: 1,
        //     role: Role.Corporation,
        //     email: 'a@a',
        //     companyName: 'E-Corp',
        //     country: '',
        //     description: 'wowo',
        //     site: '',
        //     phone: ''
        // })

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