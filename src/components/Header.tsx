import { Link, NavLink } from "react-router-dom";

const Header = () => {
    return (
        <header className="header">
        <div className="header-inner">
            <Link to="/" className="logo">
            amuse8
            </Link>
            <nav className="nav">
            <NavLink to="/about">회사소개</NavLink>
            <NavLink to="/services">서비스</NavLink>
            <NavLink to="/custom-ai">Custom AI</NavLink>
            </nav>
        </div>
        </header>
    );
};

export default Header;
