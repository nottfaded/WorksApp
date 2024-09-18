import { Link } from "react-router-dom";
import { Paths } from "../../config/routes";

export default function Home(){
    return(
        <div>
            <Link to={Paths.LOGIN}>Log In</Link>
        </div>
    )
}