import React, {useState, useEffect} from "react";
import TableHeader from "../components/TableHeader";
import { API, Auth } from 'aws-amplify';
const StudentInfoPage = () => {
    const [studentData, setStudentData] = useState([]);
    const [email, setEmail]=useState("");
    useEffect(() => {
        const loadData= async() => {
            const user=await Auth.currentAuthenticatedUser();
            const student_id=parseInt(user.attributes['custom:user_id']);
            setEmail(user.attributes.email);
            const myInit={
                queryStringParameters: {
                    action: "GetStudent",
                    student_id: student_id
                }
              };
            const data =API.get('APIGateway', '/-dkhp', myInit)
            .then((response) => {
                console.log(response);
                setStudentData(response.result);
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
                <TableHeader data={["Họ Tên", "MSSV","Email"]} />
                <tbody>
                        <tr>
                            <th scope="row">{studentData.name}</th>
                            <th scope="row">{studentData.mssv}</th>
                            <th scope="row">{email}</th>
                        </tr>
                </tbody>
            </table>
        </div>
    );
}

export default StudentInfoPage;