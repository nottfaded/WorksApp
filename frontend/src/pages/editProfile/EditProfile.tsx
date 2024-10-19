import { Outlet, useNavigate } from "react-router-dom";
import { Header } from "../../components/header/Header";
import { ProfileNav } from "./profileNav/ProfileNav";
import { useEffect } from "react";
import { useAccount } from "../../contexts/AccountContext";
import ContentLoader from "react-content-loader"

export function EditProfile() {
    const { account, loading } = useAccount();
    const navigate = useNavigate();
    let y = 0;

    useEffect(() => {
        if (loading) return;
        if (!account) {
            // alert('Error')
            navigate('/');
        }
    }, [loading]);

    return (
        <div className='container mx-auto'>

            <Header />

            <div className="mt-3">
                <div className='container mx-auto bg-white p-12 rounded-3xl max-w-5xl'>
                    {loading
                        ? (
                            <ContentLoader
                                speed={2}
                                width={1920}
                                height={1080}
                                viewBox="0 0 1920 1080"
                                backgroundColor="#f3f3f3"
                                foregroundColor="#ecebeb"
                            >
                                <rect x="2" y="2" rx="0" ry="0" width="300" height="30" />
                                {Array.from({ length: 30 }, (_, i) => {
                                    const even = i % 2 == 0;
                                    const x = even ? 1010 : 2;
                                    if (even)
                                        y += 60;

                                    return <rect key={i} x={x} y={y} rx="0" ry="0" width="1000" height="40" />
                                })}
                            </ContentLoader>
                        )
                        : (<>
                            <ProfileNav />

                            <Outlet />
                        </>)
                    }

                </div>
            </div>
        </div>
    )
}