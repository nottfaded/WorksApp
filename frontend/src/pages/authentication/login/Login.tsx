import { useNavigate } from 'react-router-dom';
import styles from '../auth.module.scss';
import {
    Card,
    CardBody,
    CardFooter,
    Typography,
    Button,
    Checkbox,
    Input,
} from "@material-tailwind/react";
import { useEffect, useState } from 'react';
import { config } from '../../../config/config';
import toast from 'react-hot-toast';
import { CONSTANTS } from '../../../config/constants';
import { AccountType, useAccount } from '../../../contexts/AccountContext';
import axios from 'axios';

interface ILogin {
    email: string,
    password: string
}


export default function Login() {
    const navigate = useNavigate();

    const [loginData, setLoginData] = useState<ILogin>({
        email: '',
        password: ''
    });
    const [errMsg, setErrMsg] = useState<{ [key: string]: [] }>({});
    const [rememberMe, setRememberMe] = useState(true);

    const navigateToHome = () => {
        navigate('/')
    }
    const navigateToRegister = () => {
        navigate('/register')
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setLoginData({
            ...loginData,
            [name]: value
        })
    }
    const toggleRememberMe = () => {
        setRememberMe(!rememberMe);
    }
    const submitLogin = () => {
        setErrMsg({})

        const promise = axios.post(`${config.apiBaseUrl}/auth/login`, loginData, { withCredentials: true });
        toast.promise(promise, {
            loading: CONSTANTS.toastLoading,
            success: (response) => {
                if(rememberMe){
                    localStorage.setItem('rememberMeLogin', JSON.stringify(loginData))
                } else {
                    localStorage.removeItem('rememberMeLogin')
                }
                
                localStorage.setItem('jwtToken', response.data.jwtToken);
                localStorage.setItem('account', JSON.stringify(response.data.account))
                setData(response.data.account as AccountType)

                navigateToHome();
                
                return 'Login successful';
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
        })
    }

    const { account, setData } = useAccount();

    useEffect(() => {
        if (account) {
            setData(null);
        }
        
        document.body.classList.add(styles.authBackground);
        
        let defualtDataJson = localStorage.getItem('rememberMeLogin');
        if(defualtDataJson){
            let defaultData : ILogin = JSON.parse(defualtDataJson);
            setLoginData({
                email: defaultData.email,
                password: defaultData.password
            })
        }

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
                            Log In
                        </Typography>

                        <div>
                            <Input
                                label="Email"
                                size="lg"
                                name='email'
                                error={Boolean(errMsg['Email'])}
                                onChange={handleInputChange}
                                value={loginData.email}
                            />
                            {errMsg['Email'] && (<Typography variant="small" color='red'>
                                {errMsg['Email'].map(i =>
                                    <Typography variant="small" color='red'>{i}</Typography>
                                )}
                            </Typography>)}
                        </div>

                        <div>
                            <Input
                                label="Password"
                                size="lg"
                                name='password'
                                type='password'
                                error={Boolean(errMsg['Password'])}
                                onChange={handleInputChange}
                                value={loginData.password}
                            />
                            {errMsg['Password'] && (
                                <Typography variant="small" color='red'>
                                    {errMsg['Password'].map(i =>
                                        <Typography variant="small" color='red'>{i}</Typography>
                                    )}
                                </Typography>)
                            }
                        </div>

                        <div className="-ml-2.5">
                            <Checkbox 
                                label="Remember Me"
                                onClick={toggleRememberMe} 
                                defaultChecked
                            />
                        </div>
                    </CardBody>
                    <CardFooter className="pt-0">
                        <Button variant="gradient" fullWidth onClick={submitLogin}>
                            Sign In
                        </Button>
                        <Typography variant="small" className="mt-6 flex justify-center">
                            Don&apos;t have an account?
                            <Typography
                                as="a"
                                variant="small"
                                color="blue-gray"
                                className="ml-1 font-bold cursor-pointer"
                                onClick={navigateToRegister}
                            >
                                Sign up
                            </Typography>
                        </Typography>
                    </CardFooter>
                </Card>
            </div>
        </div>
    )
}