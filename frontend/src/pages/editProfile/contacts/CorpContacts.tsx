import { useEffect, useState } from "react";
import { ICorporation } from "../../../contexts/AccountContext";
import toast from "react-hot-toast";
import { CONSTANTS } from "../../../config/constants";
import { Button, Input } from "@material-tailwind/react";

interface IContactsCorpData {
    site: string;
    phone: string;
}

export function ContactsCorporation({ corpData, setData }: { corpData: ICorporation, setData: (value: ICorporation) => void }) {
    const [formData, setFormData] = useState<IContactsCorpData>({
        site: corpData.site,
        phone: corpData.phone
    });
    const [isChanged, setIsChanged] = useState(false);

    useEffect(() => {
        const isChanged = (Object.keys(formData) as Array<keyof IContactsCorpData>).some(key => formData[key] !== corpData[key]);
        setIsChanged(isChanged);
    }, [formData])

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setFormData({
            ...formData,
            [id]: value,
        });
    };

    const saveChanges = async (): Promise<void> => {
        const promise = new Promise<void>((resolve) => {
            setTimeout(resolve, 500);
        })

        await toast.promise(promise, {
            loading: CONSTANTS.toastLoading,
            success: (_) => {
                setData({
                    ...corpData,
                    site: formData.site,
                    phone: formData.phone
                })

                setIsChanged(false);

                return 'Success saved organization contacts';
            },
            error: (_) => ''
        });
    }

    return (
        <>
            <div className="mb-4 flex items-start">
                <label className="w-1/3 pr-4" htmlFor="site">Site</label>
                <div className="w-2/3">
                    <Input
                        id="site"
                        placeholder="https://www.e-corp.com"
                        value={formData.site}
                        onChange={handleInputChange}
                        className="bg-white text-gray-900 shadow-lg shadow-gray-900/5 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100 focus:!border-gray-900 focus:!border-t-gray-900 focus:ring-gray-900/10"
                        labelProps={{
                            className: "hidden",
                        }}
                    />
                </div>
            </div>

            <div className="mb-4 flex items-start">
                <label className="w-1/3 pr-4" htmlFor="position">Phone</label>
                <div className="w-2/3">
                    <Input
                        id="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="bg-white text-gray-900 shadow-lg shadow-gray-900/5 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100 focus:!border-gray-900 focus:!border-t-gray-900 focus:ring-gray-900/10"
                        labelProps={{
                            className: "hidden",
                        }}
                    />
                </div>
            </div>

            <Button
                disabled={!isChanged}
                onClick={() => saveChanges()}
                className={`bg-blue-500 text-white ${!isChanged ? "opacity-50 cursor-not-allowed" : ""}`}
            >
                Save Changes
            </Button>
        </>
    )
}
