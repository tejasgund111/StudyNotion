import copy from 'copy-to-clipboard';
import React from 'react'
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {ACCOUNT_TYPE} from "../../../utils/constants"
import { addToCart } from '../../../slices/cartSlice';

const CourseDetailsCard = ({course, setConfirmationModal, handleBuyCourse}) => {

    const {user} = useSelector((state)=> state.profile);
    const {token} = useSelector((state)=> state.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {
        thumbnail : ThumbnailImage,
        price : CurrentPrice,
    } = course;

    const handleAddtoCart = () => {
        if(user && user?.accountType === ACCOUNT_TYPE.INSTRUCTOR){
            toast.error("You are an Instructor, you can't Buy course");
            return;
        }
        if(token){
            dispatch(addToCart(course));
            return;
        }
        setConfirmationModal({
            text1:"You are not Logged in",
            text2:"Please login to add to cart",
            btn1Text:"Login",
            btn2Text: "Cancel",
            btn1Handler : () => navigate("/login"),
            btn2Handler : () => setConfirmationModal(null),
        });
    }

    const handleShare = () => {
        copy(window.location.href); // copying current location
        toast.success("Link Copied to clipboard");
    }

  return (
    <div>
        <img src={ThumbnailImage} alt="Thumbnail Image" className='max-h-[300px] min-h-[180px] w-[400px] rounded-xl' />
        <div>
            Rs. {CurrentPrice}
        </div>

        <div>
            <button
            onClick={
                user && course?.studentsEnrolled.includes(user?._id) ? () => navigate("/dashboard/enrolled-courses")
                : handleBuyCourse
            }
            >
                {
                    user && course?.studentsEnrolled.includes(user._id) ? "Go To Course" : "Buy Now"
                }
            </button>

            {
                (!course?.studentsEnrolled.includes(user?._id)) && (
                    <button onClick={handleAddtoCart}>
                        Add to Cart
                    </button>
                )
            }
        </div>

        <div>
            <p>30-Day Money-Back Guarantee</p>
            <p>This Course Includes:</p>
            <div className='flex flex-col gap-y-3'>
                {
                    course?.instructions?.map((item, index)=>(
                        <p key={index} className='flex gap-2'>
                            <span>{item}</span>
                        </p>
                    ))
                }
            </div>
        </div>

        <div>
            <button onClick={handleShare}>
                Share
            </button>
        </div>

    </div>
  )
}

export default CourseDetailsCard