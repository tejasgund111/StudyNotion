import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { buyCourse } from '../services/operations/studentFeaturesAPI';
import { useNavigate, useParams } from 'react-router-dom';

const CourseDetails = () => {
    const {user} = useSelector((state)=>state.profile);
    const {token} = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {courseId} = useParams();


    const handleBuyCourse = () => {
        if(token){
            buyCourse(token, [courseId], user, navigate, dispatch);
            return;
        }
    }

    return (
        <div className='flex items-center'>
            <button
            onClick={() => handleBuyCourse()}
                className='bg-yellow-50 '>
                Buy Now
            </button>
        </div>
    )
}

export default CourseDetails