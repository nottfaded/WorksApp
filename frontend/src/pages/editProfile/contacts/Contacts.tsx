import { Role } from "../../../types/role";
import { AccountType, ICorporation, IUser, useAccount } from "../../../contexts/AccountContext";
import { ContactsUser } from "./UserContacts";
import { ContactsCorporation } from "./CorpContacts";

export function Contacts() {
    const { account, setData } = useAccount();

    return (
        <div className="p-4">
            {account && <ContactsByRole account={account} setData={setData} />}
        </div>
    )
}

function ContactsByRole({ account, setData }: { account: AccountType, setData: (value: AccountType) => void }) {
    switch (account.role) {
        case Role.User: return <ContactsUser userData={account as IUser} setData={setData} />
        case Role.Corporation: return <ContactsCorporation corpData={account as ICorporation} setData={setData} />
    }
}