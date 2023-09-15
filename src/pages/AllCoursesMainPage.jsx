import React, {useState, useEffect} from "react";
import TableHeader from "../components/TableHeader"
import TableAction from "../components/TableAction";
import NewRecordButton from "../components/NewRecordButton";

const AllCoursesMainPage = (action, para1, para2) => {
    const [courseData, setCourseData] = useState([]);
    useEffect(() => {
        const loadData= async() => {
            const idToken=(await Auth.currentSession()).getIdToken().getJwtToken();
            const myInit={
                headers: {
                  Authorization: idToken
                },
                queryStringParameters: {
                    action: action
                }
              };
            if(para1!=underfined) myInit.queryStringParameters.para1=para1;
            if(para2!=underfined) myInit.queryStringParameters.para2=para2;
            const data =API.get('APIGateway', '/-dkhp', myInit)
            .then((response) => {
                setCourseData(JSON.parse("{"+response+"}").result);
            })
            .catch((error) => {
              console.log(error.response);
            });
        };
        loadData();
    },[]);
    return (
        <div className="main-page">
            <div
                style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}
            >
                <h1>Danh sách môn học</h1>
                <NewRecordButton />
            </div>

            <table className="table table-striped table-hover">
                <TableHeader data={["Mã Lớp", "Môn học", "Số TC", "Sĩ Số","Đã ĐK"]} />
                <tbody>
                {courseData?.map((data)=> {
                    return (
                        <tr>
                            <th scope="row">{data.MaLop}</th>
                            <td>{data.CourseName}</td>
                            <td>{data.SoTC}</td>
                            <td>{data.SiSo}</td>
                            <td>{data.DaDK}</td>
                            <TableAction />
                        </tr>
                    )
                })}
                </tbody>
            </table>
        </div>
    );
}

export default AllCoursesMainPage;