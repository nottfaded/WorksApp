import { useEffect, useState } from "react";
import { IUser } from "../../../contexts/AccountContext";
import toast from "react-hot-toast";
import { CONSTANTS } from "../../../config/constants";
import { Input, Select, Option, Button, Card, ListItem, ListItemPrefix, Typography, Checkbox } from "@material-tailwind/react";
import { CountriesSelect } from "./GeneralEdit";
import axiosInstance from "../../../api/axiosInstance";
import { config } from "../../../config/config";

const SKILLS_ARRAY = ['ASP.NET', 'Entity Framework', 'React', 'Angular', 'Javascript', 'Typescript', 'C#',
    'MSSQL', 'MySQL', 'C++', 'Svetle', 'Redis'
];
const experienceOptions = [
    "No work experience",
    "6 Months",
    "1 Year",
    "1-3 Years",
    "3-5 Years",
    "More than 5 years"
];
const engLvlOptions = [
    "No English",
    "Beginners/Elementary",
    "Pre-Intermediate",
    "Intermediate",
    "Upper-Intermediate",
    "Advanced/Fluent",
];

interface IGeneralUserData {
    jobTitle: string;
    skills: string[];
    experience: string;
    expSalary: string;
    engLvl: string | undefined;
    country: string | undefined;
    linkedIn : string;
    gitHub : string;
}

export function EditUser({ userData, setData }: { userData: IUser, setData : (value: IUser) => void }) {
    const [formData, setFormData] = useState<IGeneralUserData>({
        jobTitle: userData.jobTitle,
        skills: userData.skills,
        experience: userData.experience,
        expSalary: userData.expSalary,
        engLvl: userData.engLvl,
        country: userData.country,
        linkedIn: userData.linkedIn,
        gitHub: userData.gitHub
    });
    const [isChanged, setIsChanged] = useState(false);

    useEffect(() => {
        const isChanged = (Object.keys(formData) as Array<keyof IGeneralUserData>).some(key => JSON.stringify(formData[key]) !== JSON.stringify(userData[key]));
        setIsChanged(isChanged);
    }, [formData]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [id]: value, 
        }));
    };
    const handleSelectChange = (key : string, value: string | undefined) => {
        setFormData((prev) => ({
            ...prev,
            [key]: value,
        }));
    };

    const setSkills = (value: string[]) : void => {
        setFormData((prev) => ({
            ...prev,
            skills: value
        }))
    }
    const setCountry = (value: string | undefined): void => {
        setFormData((prev) => ({
            ...prev,
            country: value
        }))
    }

    const saveChanges = async (): Promise<void> => {
        const promise = axiosInstance.post(`${config.apiBaseUrl}/editProfile/user`, formData)
        await toast.promise(promise, {
            loading: CONSTANTS.toastLoading,
            success: (_) => {
                setData({
                    ...userData,
                    jobTitle: formData.jobTitle,
                    skills: formData.skills,
                    experience: !formData.experience ? '' : formData.experience,
                    expSalary: formData.expSalary,
                    engLvl: !formData.engLvl ? '' : formData.engLvl,
                    country: !formData.country ? '' : formData.country
                })
                
                setIsChanged(false);

                return 'Success saved user data'
            },
            error: (err) => err.message
        })
    }

    return (
        <>
            <div className="mb-4 flex items-start">
                <label className="w-1/3 pr-4" htmlFor="jobTitle">Job title</label>
                <div className="w-2/3">
                    <Input
                        id="jobTitle"
                        value={formData.jobTitle}
                        onChange={handleInputChange}
                        placeholder="Junior"
                        className="!border !border-gray-300 bg-white text-gray-900 shadow-lg shadow-gray-900/5 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100 focus:!border-gray-900 focus:!border-t-gray-900 focus:ring-gray-900/10"
                        labelProps={{
                            className: "hidden",
                        }}
                    />
                </div>
            </div>

            <div className="mb-4 flex items-start">
                <label className="w-1/3 pr-4" htmlFor="skills">Skills</label>
                <div className="w-2/3">
                    <SkillsGroup skills={formData.skills} setSkills={setSkills} />
                </div>
            </div>

            <div className="mb-4 flex items-start">
                <label className="w-1/3 pr-4" htmlFor="experience">Experience</label>
                <div className="w-2/3">
                    <Select
                        value={formData.experience}
                        onChange={(value) => {handleSelectChange('experience', value)}}
                        className="bg-white text-gray-900 shadow-lg shadow-gray-900/5 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100 focus:!border-gray-900 focus:!border-t-gray-900 focus:ring-gray-900/10"
                        labelProps={{
                            className: "hidden",
                        }}
                    >
                        {experienceOptions.map((exp, key) =>
                            <Option
                                key={key}
                                value={exp}
                            >
                                {exp}
                            </Option>
                        )}
                    </Select>
                </div>
            </div>

            <div className="mb-4 flex items-start">
                <label className="w-1/3 pr-4" htmlFor="expSalary">Expected Salary($)</label>
                <div className="w-2/3">
                    <Input
                        id="expSalary"
                        value={formData.expSalary}
                        onChange={handleInputChange}
                        placeholder="1000"
                        type="number"
                        className="remove-arrows !border !border-gray-300 bg-white text-gray-900 shadow-lg shadow-gray-900/5 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100 focus:!border-gray-900 focus:!border-t-gray-900 focus:ring-gray-900/10"
                        labelProps={{
                            className: "hidden",
                        }}
                        onKeyDown={(event) => {
                            if (event.code == 'Backspace') return;
                            if (!/[0-9]/.test(event.key)) {
                                event.preventDefault();
                            }
                        }}
                    />
                </div>
            </div>

            <div className="mb-4 flex items-start">
                <label className="w-1/3 pr-4" htmlFor="engLvl">English level</label>
                <div className="w-2/3">
                    <Select
                        value={formData.engLvl}
                        onChange={(value) => handleSelectChange('engLvl', value)}
                        className="bg-white text-gray-900 shadow-lg shadow-gray-900/5 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100 focus:!border-gray-900 focus:!border-t-gray-900 focus:ring-gray-900/10"
                        labelProps={{
                            className: "hidden",
                        }}
                    >
                        {engLvlOptions.map((engLvl, key) =>
                            <Option key={key} value={engLvl}>{engLvl}</Option>
                        )}
                    </Select>
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

function SkillsGroup({ skills, setSkills }: { skills: string[], setSkills: (value: string[]) => void }) {
    const handleSkillChange = (skill: string, isChecked: boolean): void => {
        if (isChecked) {
            setSkills([...skills, skill]);
        } else {
            setSkills(skills.filter((s) => s !== skill));
        }
    };

    return (
        <Card className='max-h-40 overflow-y-auto'>
            <div className="flex flex-wrap place-content-around">
                {SKILLS_ARRAY.map((skill, i) => (
                    <ListItem

                        className="flex-none w-full sm:w-1/2 md:w-1/3 lg:w-1/4"
                        key={i}
                    >
                        <label
                            htmlFor={`skill-${i}`}
                            className="flex w-full cursor-pointer items-center px-2 py-1"
                        >
                            <ListItemPrefix className="mr-3">
                                <Checkbox
                                    id={`skill-${i}`}
                                    ripple={false}
                                    checked={skills.includes(skill)}
                                    onChange={(e) => handleSkillChange(skill, e.target.checked)}
                                    className="hover:before:opacity-0"
                                    containerProps={{
                                        className: "p-0",
                                    }}
                                />
                            </ListItemPrefix>
                            <Typography color="blue-gray" className="font-medium">
                                {skill}
                            </Typography>
                        </label>
                    </ListItem>
                ))}
            </div>
        </Card>
    );
}