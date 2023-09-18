import React from "react";
import { Link } from "react-router-dom"
const NavBar = (props) => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <Link className="navbar-brand" to="/">Course Registration App</Link>
            <div className="collapse navbar-collapse" id="navbarText">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item active">
                        <Link className="nav-link" to="/AllCourses">DKHP</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/RegisteredCourses">Môn Đã ĐK</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/StudentInfo">Sinh Viên</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" onClick={props.SignOut}>Đăng Xuất</Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
}

export default NavBar;