import React, {useState, useEffect} from "react";
import { API, Auth } from 'aws-amplify';
import TableHeader from '../components/TableHeader';
const AllCoursesMainPage = () => {
    const [courseData, setCourseData] = useState([]);
    const [searchTerm, setSearchTerm]=useState("");
    const [search, setSearch]=useState("");
    const loadData= async() => {
        const myInit={
            queryStringParameters:{action:"GetAllCourses"}
          };
       API.get('APIGateway', '/-dkhp', myInit)
        .then((response) => {
            setCourseData(response.result);
        })
        .catch((error) => {
          console.log(error.response);
        });
    };
    const AddFunction=async(course_id, MaLop)=>{
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
                  if(response.result==="success") alert("Bạn đã đăng kí thành công lớp "+MaLop);
                  else if(response.result==="added") alert("Lớp "+MaLop+" đã có sẵn trong danh sách đăng kí của bạn");
                  else if(response.result==="full") alert("Không thể đăng kí lớp "+MaLop+" do đã đủ số học viên");
                  else if(response.result==="error")  alert("Đăng kí lớp "+MaLop+" không thành công");
              })
              .catch((error) => {
                console.log(error.response);
              });
    }
    useEffect(()=>{loadData()},[]);
    const handleFilter = (item) => {
        const re = new RegExp("^"+search,"i");
        return item.MaLop.match(re);
    }
    const filteredCourse = (search==="")?courseData:courseData.filter(handleFilter);
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
                <form className="d-flex col-lg-6" role="search" onSubmit={(e)=>{e.preventDefault(); setSearch(searchTerm);}}>
                    <input className="form-control me-2" type="search" placeholder="Search" id="Search" onChange={(e)=>setSearchTerm(e.target.value)}/>
                    <button className="btn btn-outline-success" type="submit" >Search</button>
                </form>
            </div>
             <table className="table table-striped table-hover">
                <TableHeader data={["Mã Lớp", "Môn học", "Số TC", "Sĩ Số","DaDK","Action"]} />
                <tbody>
                {filteredCourse?.map((data)=> {
                    return (
                        <tr key={data.course_id}>
                            <th scope="row">{data.MaLop}</th>
                            <td>{data.CourseName}</td>
                            <td>{data.SoTC}</td>
                            <td>{data.SiSo}</td>
                            <td>{data.DaDK}</td>
                            <td>
                                    <button type="button" className="btn btn-primary mr-2" onClick={()=>AddFunction(data.course_id, data.MaLop)}>Add</button>
                            </td>
                        </tr>
                    )
                })}
                </tbody>
            </table>
        </div>
    )
}

export default AllCoursesMainPage;
/*
    onClick={() => {
                        setSearch(searchTerm);}
                    }
*/