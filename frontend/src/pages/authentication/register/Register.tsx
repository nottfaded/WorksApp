import { useNavigate } from 'react-router-dom';
import styles from '../auth.module.scss';
import {
    Card,
    CardBody,
    CardFooter,
    Typography,
    Button,
    Input,
    Select,
    Option,
} from "@material-tailwind/react";
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import axios from 'axios';
import { config } from '../../../config/config';
import { CONSTANTS } from '../../../config/constants';

interface IRegister {
    email: string,
    password: string,
    role: number,
    firstname: string,
    lastname: string,
    nameCorp: string,
    country: string
}

export default function Register() {
    const navigate = useNavigate();

    const [regData, setRegData] = useState<IRegister>({
        email: '',
        password: '',
        role: 0,
        firstname: '',
        lastname: '',
        nameCorp: '',
        country: '',
    });
    const [typeAcc, setTypeAcc] = useState<string | undefined>('user');
    const [passHidden, setPassHidden] = useState(true);
    const [errMsg, setErrMsg] = useState<{ [key: string]: [] }>({});

    const navigateToHome = () => {
        navigate('/')
    }
    const navigateToLogin = () => {
        navigate('/login')
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setRegData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const submitRegistration = async () => {
        setErrMsg({})

        const promise = axios.post(`${config.apiBaseUrl}/auth/register`, regData)
        toast.promise(promise, {
            loading: CONSTANTS.toastLoading,
            success: (_) => {
                navigateToLogin();
                return 'Registration successful'
            },
            error: (err) => {
                if (err.code == "ERR_BAD_REQUEST") {
                    if (err.response?.data?.errors) {
                        setErrMsg(err.response.data.errors)
                        return 'Error';
                    }
                    return err.response.data;
                }

                return err.message
            }
        });
    }

    useEffect(() => {
        document.body.classList.add(styles.authBackground);

        return () => {
            document.body.classList.remove(styles.authBackground);
        }
    }, [])

    return (
        <div className={styles.auth}>
            <div
                className={styles.header}
                style={{ cursor: 'pointer' }}
                onClick={navigateToHome}
            >WorksApp</div>

            <div className={styles.body}>
                <Card className={`${styles.mainBlock} w-96`}>
                    <CardBody className="flex flex-col gap-4">
                        <Typography variant="h4" color="blue-gray" className="mb-2">
                            Registration
                        </Typography>


                        <div>
                            <Input
                                label="Email"
                                size="lg"
                                name='email'
                                error={Boolean(errMsg['Email'])}
                                onChange={handleInputChange}
                            ></Input>
                            {errMsg['Email'] && (
                                <Typography variant="small" color='red'>
                                    {errMsg['Email'].map(i =>
                                        <Typography variant="small" color='red'>{i}</Typography>
                                    )}
                                </Typography>)
                            }
                        </div>


                        <div>
                            <div className='relative flex w-full max-w-[24rem]'>
                                <Input
                                    type={passHidden ? 'password' : 'text'}
                                    label="Password"
                                    name='password'
                                    size="lg"
                                    onChange={handleInputChange}
                                    containerProps={{
                                        className: "min-w-0",
                                    }}
                                    error={Boolean(errMsg['Password'])}
                                />
                                <Button
                                    size="sm"
                                    color={errMsg['Password'] ? 'red' : 'gray'}
                                    className="!absolute right-1 top-1 rounded"
                                    variant="text"
                                    onClick={() => setPassHidden(!passHidden)}
                                >
                                    {passHidden
                                        ? (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="size-5">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
                                        </svg>)
                                        : (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="size-5">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                        </svg>
                                        )
                                    }

                                </Button>
                            </div>
                            {errMsg['Password'] && (
                                <Typography variant="small" color='red'>
                                    {errMsg['Password'].map(i =>
                                        <Typography variant="small" color='red'>{i}</Typography>
                                    )}
                                </Typography>)
                            }
                        </div>


                        Type account:
                        <Select
                            label="Type Account"
                            value={typeAcc}
                            onChange={(val) => setTypeAcc(val)}
                        >
                            <Option value='user'>User</Option>
                            <Option value='corporation'>Corporation</Option>
                        </Select>

                    </CardBody>

                    <CardFooter className="pt-0">
                        <Button
                            variant="gradient"
                            fullWidth
                            onClick={submitRegistration}
                            className='flex item-center justify-center'
                        >
                            Register
                        </Button>

                        <Typography variant="small" className="mt-6 flex justify-center">
                            Already have an account?
                            <Typography
                                as="a"
                                variant="small"
                                color="blue-gray"
                                className="ml-1 font-bold cursor-pointer"
                                onClick={navigateToLogin}
                            >
                                Sign In
                            </Typography>
                        </Typography>
                    </CardFooter>
                </Card>

            </div>

        </div>
    )
}