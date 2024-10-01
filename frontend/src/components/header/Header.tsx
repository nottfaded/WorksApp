import { Bars2Icon } from "@heroicons/react/16/solid";
import { Button, Collapse, IconButton, Navbar, Typography } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { NavList } from "./NavList";
import { ProfileMenu } from "./ProfileMenu";
import { useAccount } from "../../contexts/AccountContext";
import { useNavigate } from "react-router-dom";

export function Header() {
    const navigate = useNavigate();
    const { account } = useAccount();
    const [isNavOpen, setIsNavOpen] = useState(false);

    const toggleIsNavOpen = () => setIsNavOpen((cur) => !cur);

    const navigateToLogin = () => navigate('/login')

    useEffect(() => {
        window.addEventListener("resize",
            () => window.innerWidth >= 960 && setIsNavOpen(false),
        );
    }, []);

    return (
        <Navbar className="mx-auto max-w-screen-xl p-2 lg:rounded-full lg:pl-6">
            <div className="relative mx-auto flex items-center justify-between text-blue-gray-900">
                <Typography
                    as="a"
                    href="#"
                    className="mr-4 ml-2 cursor-pointer py-1.5 font-medium"
                >
                    WorksApp
                </Typography>
                <div className="hidden lg:block">
                    <NavList />
                </div>
                <IconButton
                    size="sm"
                    color="blue-gray"
                    variant="text"
                    onClick={toggleIsNavOpen}
                    className="ml-auto mr-2 lg:hidden"
                >
                    <Bars2Icon className="h-6 w-6" />
                </IconButton>


                {account
                    ? (<ProfileMenu />)
                    : (
                        <div className="flex items-center gap-1 rounded-full py-1 pr-2 pl-0.5 lg:ml-auto">
                            <Button size="sm" variant="text" onClick={navigateToLogin}>
                                <span>Log In</span>
                            </Button>
                        </div>
                    )
                }


            </div>
            <Collapse open={isNavOpen} className="overflow-scroll">
                <NavList />
            </Collapse>
        </Navbar>
    );
}