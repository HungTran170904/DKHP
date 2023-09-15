import React from "react";
import AllCoursesMainPage from "./pages/AllCoursesMainPage";
import AllFacultiesMainPage from "./pages/AllFacultiesMainPage";
import AllStudentsMainPage from "./pages/AllStudentsMainPage";
import WelcomePage from "./pages/WelcomePage";
import ErrorPage from "./pages/Errorpage";
const NavBar = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <a className="navbar-brand" href="#">Course Registration App</a>
            <div className="collapse navbar-collapse" id="navbarText">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item active">
                        <a className="nav-link" onClick={()=>AllCoursesMainPage("GetAllCourses")}>Dashboard</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/faculties">Môn Đã ĐK</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/students">Sinh Viên</a>
                    </li>
                </ul>
                <span className="navbar-text">
                    UIT
                </span>
            </div>
        </nav>
    );
}

export default NavBar;