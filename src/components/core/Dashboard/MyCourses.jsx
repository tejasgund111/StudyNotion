import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import {fetchInstructorCourses} from "../../../services/operations/courseDetailsAPI"
import IconBtn from '../../common/IconBtn';
import toast from 'react-hot-toast';
import CourseTable from './InstructorCourses/CourseTable';


const MyCourses = () => {

    const {token} = useSelector((state) => state.auth);
    const navigate = useNavigate();
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        const fetchCourses = async () => {
            const result = await fetchInstructorCourses(token);
            if(result){
                setCourses(result);
            }
            else{
                toast.error("Error")
            }
        }
        fetchCourses();
    },[]);

  return (
    <div>
        <div>
            <h1>My Courses</h1>
            <IconBtn
            text="Add Course"
            onClick={()=> navigate("/dashboard/add-course")}
             />
        </div>

        {courses && <CourseTable courses={courses} setCourses={setCourses}/>}
    </div>
  )
}

export default MyCourses