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
    Option
} from "@material-tailwind/react";
import { useState } from 'react';

export default function Register() {
    const navigate = useNavigate();
    const [typeAcc, setTypeAcc] = useState<string | undefined>('user');

    const handleLinkClick = () => {
        navigate('/login')
    }

    return (
        <div className={styles.auth}>
            <div className={styles.header}>WorksApp</div>

            <div className={styles.body}>
                <Card className={`${styles.mainBlock} w-96`}>
                    <CardBody className="flex flex-col gap-4">
                        <Typography variant="h4" color="blue-gray" className="mb-2">
                            Registration
                        </Typography>

                        <Input label="Email" size="lg" />
                        <Input label="Password" size="lg" />

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
                        <Button variant="gradient" fullWidth>
                            Sign In
                        </Button>
                        <Typography variant="small" className="mt-6 flex justify-center">
                            Already have an account?
                            <Typography
                                as="a"
                                variant="small"
                                color="blue-gray"
                                className="ml-1 font-bold cursor-pointer"
                                onClick={handleLinkClick}
                            >
                                Sign in
                            </Typography>
                        </Typography>
                    </CardFooter>
                </Card>
            </div>
        </div>
    )
}