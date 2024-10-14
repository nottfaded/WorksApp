import { useEffect, useState } from "react";
import { ICorporation } from "../../../contexts/AccountContext";
import toast from "react-hot-toast";
import { CONSTANTS } from "../../../config/constants";
import { Input, Button } from "@material-tailwind/react";
import { CountriesSelect } from "./GeneralEdit";

interface IGeneralCorpData {
    companyName : string;
    country : string | undefined;
    description : string;
}

export function EditCorporation({ corpData, setData }: { corpData: ICorporation, setData : (value: ICorporation) => void }) {
    const [formData, setFormData] = useState<IGeneralCorpData>({
        companyName: corpData.companyName,
        country: corpData.country,
        description: corpData.description
    });
    const [isChanged, setIsChanged] = useState(false);

    useEffect(() => {
        const isChanged = (Object.keys(formData) as Array<keyof IGeneralCorpData>).some(key => formData[key] !== corpData[key]);
        setIsChanged(isChanged);
    }, [formData]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [id]: value, 
        }));
    };

    const setCountry = (value: string | undefined) : void => {
        setFormData((prev) => ({
            ...prev,
            skills: value
        }))
    }

    const saveChanges = async (): Promise<void> => {
        const promise = new Promise<void>((resolve) => {
            setTimeout(resolve, 500);
        })

        await toast.promise(promise, {
            loading: CONSTANTS.toastLoading,
            success: (_) => {
                setData({
                    ...corpData,
                    companyName: corpData.companyName,
                    description: formData.description,
                    country: !formData.country ? '' : formData.country
                })
                
                setIsChanged(false);

                return 'Success saved corp data'
            },
            error: (_) => ''
        })
    }

    return (
        <>
            <div className="mb-4 flex items-start">
                <label className="w-1/3 pr-4" htmlFor="companyName">Corporation Name</label>
                <div className="w-2/3">
                    <Input
                        id="companyName"
                        value={formData.companyName}
                        onChange={handleInputChange}
                        placeholder="E-Corp"
                        className="!border !border-gray-300 bg-white text-gray-900 shadow-lg shadow-gray-900/5 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100 focus:!border-gray-900 focus:!border-t-gray-900 focus:ring-gray-900/10"
                        labelProps={{
                            className: "hidden",
                        }}
                    />
                </div>
            </div>

            <div className="mb-4 flex items-start">
                <label className="w-1/3 pr-4" htmlFor="description">Description</label>
                <div className="w-2/3">
                    <Input
                        id="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        placeholder="Cool company"
                        className="!border !border-gray-300 bg-white text-gray-900 shadow-lg shadow-gray-900/5 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100 focus:!border-gray-900 focus:!border-t-gray-900 focus:ring-gray-900/10"
                        labelProps={{
                            className: "hidden",
                        }}
                    />
                </div>
            </div>

            <div className="mb-4 flex items-start">
                <label className="w-1/3 pr-4" htmlFor="country">Country of stay</label>
                <div className="w-2/3">
                    <CountriesSelect setCountry={setCountry} />
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