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

export default function Login() {
    const navigate = useNavigate();

    const handleLinkClick = () => {
        navigate('/register')
    }

    return (
        <div className={styles.auth}>
            <div className={styles.header}>WorksApp</div>

            <div className={styles.body}>
                <Card className={`${styles.mainBlock} w-96`}>
                    <CardBody className="flex flex-col gap-4">
                        <Typography variant="h4" color="blue-gray" className="mb-2">
                            Log In
                        </Typography>
                        <Input label="Email" size="lg" />
                        <Input label="Password" size="lg" />
                        <div className="-ml-2.5">
                            <Checkbox label="Remember Me" />
                        </div>
                    </CardBody>
                    <CardFooter className="pt-0">
                        <Button variant="gradient" fullWidth>
                            Sign In
                        </Button>
                        <Typography variant="small" className="mt-6 flex justify-center">
                            Don&apos;t have an account?
                            <Typography
                                as="a"
                                variant="small"
                                color="blue-gray"
                                className="ml-1 font-bold cursor-pointer"
                                onClick={handleLinkClick}
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