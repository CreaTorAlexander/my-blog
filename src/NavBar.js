import { Link } from "react-router-dom";

const NavBar = () => {
    return (
        // Body of the component
        <nav>
            <ul>
                <li>
                    <Link to ="/">Home</Link>
                </li>
                <li>
                    <Link to = "/about">About</Link>
                </li>
                <li>
                    <Link to = "/articles">Articles</Link>
                </li>
            </ul>
        </nav>
    )
}

export default NavBar;