import { ChevronDownIcon, Cog6ToothIcon, PowerIcon } from "@heroicons/react/16/solid";
import { Avatar, Button, Menu, MenuHandler, MenuItem, MenuList, Typography } from "@material-tailwind/react";
import { createElement, useState } from "react";
import { Paths } from "../../config/routes";

const profileMenuItems = [
    // {
    //     label: "My Profile",
    //     icon: UserCircleIcon,
    // },
    {
        label: "Edit Profile",
        icon: Cog6ToothIcon,
        onClick: () => {
            window.location.href = Paths.EDIT_PROFILE;
        }
    },
    // {
    //     label: "Inbox",
    //     icon: InboxArrowDownIcon,
    // },
    // {
    //     label: "Help",
    //     icon: LifebuoyIcon,
    // },
    {
        label: "Sign Out",
        icon: PowerIcon,
        onClick: () => {
            // axios.get(`${config.apiBaseUrl}/auth/logout`, {withCredentials: true})
            //     .then(() => window.location.href = '/login')
            localStorage.removeItem("jwtToken");
            localStorage.removeItem("account");

            window.location.href = '/login';
        }
    },
];

export function ProfileMenu() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">
            <MenuHandler>
                <Button
                    variant="text"
                    color="blue-gray"
                    className="flex items-center gap-1 rounded-full py-0.5 pr-2 pl-0.5 lg:ml-auto"
                >
                    <Avatar
                        variant="circular"
                        size="sm"
                        alt="tania andrew"
                        className="border border-gray-900 p-0.5"
                        src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    />
                    <ChevronDownIcon
                        strokeWidth={2.5}
                        className={`h-3 w-3 transition-transform ${isMenuOpen ? "rotate-180" : ""
                            }`}
                    />
                </Button>
            </MenuHandler>
            <MenuList className="p-1">
                {profileMenuItems.map(({ label, icon, onClick }, key) => {
                    const isLastItem = key === profileMenuItems.length - 1;
                    return (
                        <MenuItem
                            key={label}
                            onClick={onClick}
                            className={`flex items-center gap-2 rounded ${isLastItem
                                ? "hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10"
                                : ""
                                }`}
                        >
                            {createElement(icon, {
                                className: `h-4 w-4 ${isLastItem ? "text-red-500" : ""}`,
                                strokeWidth: 2,
                            })}
                            <Typography
                                as="span"
                                variant="small"
                                className="font-normal"
                                color={isLastItem ? "red" : "inherit"}
                            >
                                {label}
                            </Typography>
                        </MenuItem>
                    );
                })}
            </MenuList>
        </Menu>
    );
}