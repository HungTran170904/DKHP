import React, {useState, useEffect} from "react";
import TableHeader from "../components/TableHeader"
import TableAction from "../components/TableAction";
const AllStudentsMainPage = () => {
    const [studentData, setStudentData] = useState([]);
    useEffect(() => {
        const loadData= async() => {
            const idToken=(await Auth.currentSession()).getIdToken().getJwtToken();
            const myInit={
                headers: {
                  Authorization: idToken
                },
                queryStringParameters: {
                    action: "GetStudent"
                }
              };
            const data =API.get('APIGateway', '/-dkhp', myInit)
            .then((response) => {
                setStudentData(JSON.parse("{"+response+"}").result);
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
                <h1>Thông tin sinh viên</h1>
            </div>

            <table className="table table-striped table-hover">
                <TableHeader data={["Họ Tên", "MSSV"]} />
                <tbody>
                    return (
                        <tr>
                            <th scope="row">{studentData.name}</th>
                            <th scope="row">{studentData.mssv}</th>
                            <TableAction />
                        </tr>
                    )
                </tbody>
            </table>
        </div>
    );
}

export default AllStudentsMainPage;