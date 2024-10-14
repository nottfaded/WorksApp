import {
    Select, Option
} from "@material-tailwind/react";
import { cloneElement } from "react";
import { AccountType, ICorporation, IUser, useAccount } from "../../../contexts/AccountContext";
import { Role } from "../../../types/role";
// @ts-ignore
import { useCountries } from 'use-react-countries'
import { EditUser } from "./UserGeneral";
import { EditCorporation } from "./CorpGeneral";

export function GeneralEdit() {
    const { account, setData } = useAccount();

    return (
        <div className="p-4">
            {account && <EditByRole account={account} setData={setData} />}
        </div>
    );
}

function EditByRole({ account, setData }: { account: AccountType, setData : (value: AccountType) => void }) {
    switch (account.role) {
        case Role.User: return <EditUser userData={account as IUser} setData={setData} />
        case Role.Corporation: return <EditCorporation corpData={account as ICorporation} setData={setData} />
    }
}

export function CountriesSelect({ setCountry }: { setCountry: (value: string | undefined) => void }) {
    const { countries } = useCountries();

    return (
        <>
            <Select
                size="lg"
                label="Select Country"
                onChange={(value) => setCountry(value)}
                selected={(element) =>
                    element &&
                    cloneElement(element, {
                        disabled: true,
                        className:
                            "flex items-center opacity-100 px-0 gap-2 pointer-events-none",
                    })
                }
            >
                {countries.map(({ name, flags }: { name: string, flags: any }) => (
                    <Option key={name} value={name} className="flex items-center gap-2">
                        <img
                            src={flags.svg}
                            alt={name}
                            className="h-5 w-5 rounded-full object-cover"
                        />
                        {name}
                    </Option>
                ))}
            </Select>
        </>
    );
}