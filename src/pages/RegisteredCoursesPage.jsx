import React, {useState, useEffect} from "react";
import TableHeader from "../components/TableHeader";
import { API, Auth } from 'aws-amplify';
const RegisteredCoursesPage = () => {
    const [courseData, setCourseData] = useState([]);
    useEffect(() => {
        const loadData= async() => {
            const user=await Auth.currentAuthenticatedUser();
            const student_id=parseInt(user.attributes['custom:user_id']);
            const myInit={
                queryStringParameters: {
                    action: "GetRegisteredCourses",
                    student_id: student_id 
                }
              };
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
    const DeleteFunction=async(course_id)=>{
        const user=await Auth.currentAuthenticatedUser();
        const student_id=parseInt(user.attributes['custom:user_id']);
            const myInit={
                queryStringParameters: {
                    action: "Delete",
                    course_id: course_id,
                    student_id: student_id
                }
              };
              API.get('APIGateway', '/-dkhp', myInit)
              .then((response) => {
                    const obj=JSON.parse("{"+response+"}");
                  if(obj.result==="success") alert("The course was deleted successfully");
                  else alert("Unable to delete the course");
              })
              .catch((error) => {
                console.log(error.response);
              });
    }
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
                <h1>Các môn đã đăng kí</h1>
            </div>

            <table className="table table-striped table-hover">
                <TableHeader data={["Mã Lớp", "Môn học", "Số TC", "Sĩ Số","Đã ĐK","Action"]} />
                <tbody>
                {courseData?.map((data)=> {
                    let course_id=data.course_id;
                    return (
                        <tr>
                            <th scope="row">{data.MaLop}</th>
                            <td>{data.CourseName}</td>
                            <td>{data.SoTC}</td>
                            <td>{data.SiSo}</td>
                            <td>{data.DaDK}</td>
                            <td colSpan={2}>
                                    <button type="button" className="btn btn-danger" onClick={()=>DeleteFunction(course_id)}>Delete</button>
                            </td>
                        </tr>
                    )
                })}
                </tbody>
            </table>
        </div>
    );
}

export default RegisteredCoursesPage;