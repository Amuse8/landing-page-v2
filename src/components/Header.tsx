import { Link, NavLink } from "react-router-dom";

const Header = () => {
    return (
        <header className="header flex">
            <div className="header-inner flex">
                <Link to="/" className="logo">
                    회사
                </Link>
                <nav className="nav flex items-center space-x-10">
                    <NavLink
                        to="/about"
                        className={({ isActive }) =>
                            `hover-link ${
                                isActive ? "active" : ""
                            }`
                        }
                    >
                        회사소개
                    </NavLink>
                    <NavLink
                        to="/services"
                        className={({ isActive }) =>
                            `hover-link ${
                                isActive ? "active" : ""
                            }`
                        }
                    >
                        서비스
                    </NavLink>
                    <NavLink
                        to="/custom-ai"
                        className={({ isActive }) =>
                            `hover-link ${
                                isActive ? "active" : ""
                            }`
                        }
                    >
                        Custom AI
                    </NavLink>
                </nav>
            </div>
        </header>
    );
};

export default Header;
