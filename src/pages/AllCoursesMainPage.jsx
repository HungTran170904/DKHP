import React, {useState, useEffect} from "react";
import { API, Auth } from 'aws-amplify';
import TableHeader from '../components/TableHeader';
const AllCoursesMainPage = () => {
    const [courseData, setCourseData] = useState([]);
    const [Search, setSearch]=useState("");
    const loadData= async() => {
        //alert(Search);
        const myInit={
            queryStringParameters:{}
          };
        if(Search=="") myInit.queryStringParameters.action="GetAllCourses";
        else {
            myInit.queryStringParameters.action="GetCoursesBySearch";
            myInit.queryStringParameters.search=Search;
        } 
       API.get('APIGateway', '/-dkhp', myInit)
        .then((response) => {
            setCourseData(JSON.parse("{"+response+"}").result);
        })
        .catch((error) => {
          console.log(error.response);
        });
    };
    const AddFunction=async(course_id)=>{
        const user=await Auth.currentAuthenticatedUser();
        const student_id=parseInt(user.attributes['custom:user_id']);
            const myInit={
                queryStringParameters: {
                    action: "Add",
                    course_id: course_id,
                    student_id: student_id
                }
              };
              API.get('APIGateway', '/-dkhp', myInit)
              .then((response) => {
                  const obj=JSON.parse("{"+response+"}");
                  if(obj.result==="success") alert("You enrolled the course successfully");
                  else if(obj.result==="added") alert("The course has already existed ");
                  else if(obj.result==="full") alert("The class is now full");
                  else alert("Unable to enroll the course");
              })
              .catch((error) => {
                console.log(error.response);
              });
    }
    useEffect(()=>{loadData()},[]);
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
                <form class="d-flex col-lg-6" role="search" onSubmit={(e)=>{
                    alert(e.currentTarget.getElementById('Search').value);
                    setSearch(e.target.getElementById('Search').value);
                    }}>
                    <input class="form-control me-2" type="search" placeholder="Search" id="Search"/>
                    <button class="btn btn-outline-success" type="submit">Search</button>
                </form>
            </div>
             <table className="table table-striped table-hover">
                <TableHeader data={["Mã Lớp", "Môn học", "Số TC", "Sĩ Số","DaDK","Action"]} />
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
                            <td>
                                    <button type="button" className="btn btn-primary mr-2" onClick={()=>AddFunction(course_id)}>Add</button>
                            </td>
                        </tr>
                    );
                })}
                </tbody>
            </table>
        </div>
    );
}

export default AllCoursesMainPage;