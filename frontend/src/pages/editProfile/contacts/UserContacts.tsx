import { useEffect, useState } from "react";
import { IUser } from "../../../contexts/AccountContext";
import toast from "react-hot-toast";
import { CONSTANTS } from "../../../config/constants";
import { Button, Input } from "@material-tailwind/react";

interface IContactsUserData {
    firstname: string;
    lastname: string;
    linkedIn: string;
    gitHub: string;
}

export function ContactsUser({ userData, setData }: { userData: IUser, setData: (value: IUser) => void }) {
    const [formData, setFormData] = useState<IContactsUserData>({
        firstname: userData.firstname,
        lastname: userData.lastname,
        linkedIn: userData.linkedIn,
        gitHub: userData.gitHub
    });
    const [isChanged, setIsChanged] = useState(false);

    useEffect(() => {
        const isChanged = (Object.keys(formData) as Array<keyof IContactsUserData>).some(key => formData[key] !== userData[key]);
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
                    ...userData,
                    firstname: formData.firstname,
                    lastname: formData.lastname,
                    linkedIn: formData.linkedIn,
                    gitHub: formData.gitHub
                })

                setIsChanged(false);

                return 'Success saved user contacts';
            },
            error: (_) => ''
        });
    }

    return (
        <>
            <div className="mb-4 flex items-start">
                <label className="w-1/3 pr-4" htmlFor="firstname">Firstname</label>
                <div className="w-2/3">
                    <Input
                        id="firstname"
                        value={formData.firstname}
                        onChange={handleInputChange}
                        placeholder="Igor"
                        className="!border-gray-300 bg-white text-gray-900 shadow-lg shadow-gray-900/5 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100 focus:!border-gray-900 focus:!border-t-gray-900 focus:ring-gray-900/10"
                        labelProps={{
                            className: "hidden",
                        }}
                    />
                </div>
            </div>

            <div className="mb-4 flex items-start">
                <label className="w-1/3 pr-4" htmlFor="lastname">Lastname</label>
                <div className="w-2/3">
                    <Input
                        id="lastname"
                        value={formData.lastname}
                        onChange={handleInputChange}
                        placeholder="Pupkov"
                        className="!border-gray-300 bg-white text-gray-900 shadow-lg shadow-gray-900/5 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100 focus:!border-gray-900 focus:!border-t-gray-900 focus:ring-gray-900/10"
                        labelProps={{
                            className: "hidden",
                        }}
                    />
                </div>
            </div>

            <div className="mb-4 flex items-start">
                <label className="w-1/3 pr-4" htmlFor="linkedIn">LinkedIn-profile</label>
                <div className="w-2/3">
                    <Input
                        id="linkedIn"
                        value={formData.linkedIn}
                        onChange={handleInputChange}
                        type="url"
                        className="!border-gray-300 bg-white text-gray-900 shadow-lg shadow-gray-900/5 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100 focus:!border-gray-900 focus:!border-t-gray-900 focus:ring-gray-900/10"
                        labelProps={{
                            className: "hidden",
                        }}
                    />
                </div>
            </div>

            <div className="mb-4 flex items-start">
                <label className="w-1/3 pr-4" htmlFor="gitHub">GitHub</label>
                <div className="w-2/3">
                    <Input
                        id="gitHub"
                        value={formData.gitHub}
                        onChange={handleInputChange}
                        className="!border-gray-300 bg-white text-gray-900 shadow-lg shadow-gray-900/5 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100 focus:!border-gray-900 focus:!border-t-gray-900 focus:ring-gray-900/10"
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