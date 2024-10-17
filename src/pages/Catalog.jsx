import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {categories} from "../services/apis" ;
import {apiConnector} from "../services/apiconnector";
import { getCatalogPageData } from '../services/operations/pageAndComponentData';
// import CourseCard from "../components/core/Catalog/CourseCard";
// import CourseSlider from "../components/core/Catalog/CourseSlider"; 

const Catalog = () =>{

    const {catalogName} = useParams() ;
    const [catalogPageData, setCatalogPageData] = useState(null) ;
    const [categoryId, setCatagoryId] = useState("");

    const [active, setActive] = useState(1) ;



    useEffect(()=>{
        const getCategories = async () => {
            const res = await apiConnector("GET", categories.CATEGORIES_API);
            console.log("res==>", res) ;

            // const category_id = res?.data?.data?.filter((ct) => ct.name.split(" ").join("-").toLowerCase() === catalogName)[0]._id;
            const category_id = res?.data?.data?.filter((ct) => ct.name.split(" ").join("-") === catalogName)[0]._id;
            console.log("catid", category_id);
            setCatagoryId(category_id);
        }
        getCategories();
    },[catalogName]);

    console.log("categoryId=>", categoryId);

    useEffect(()=>{
        const getCatagoryDetails = async () => {
            try{

                const res = await getCatalogPageData(categoryId) ;
                setCatalogPageData(res);

            }
            catch(error) {
                console.log("error=>", error) ;
            }
        }
        if(categoryId){
            getCatagoryDetails();
        }
        
    }, [categoryId])

    console.log("catalogPageData= >", catalogPageData) ;

    return(
        <>
            {/* staring of catalog page */}
    
            <div className=" box-content bg-richblack-800 px-4">
                <div className="mx-auto flex min-h-[260px] max-w-maxContentTab flex-col justify-center gap-4 lg:max-w-maxContent ">
                <p className="text-sm text-richblack-300">
                    {`Home / Catalog / `}
                    <span className="text-yellow-25">
                    {catalogPageData?.data?.selectedCategory?.name}
                    </span>
                </p>
                <p className="text-3xl text-richblack-5">
                    {catalogPageData?.data?.selectedCategory?.name}
                </p>
                <p className="max-w-[870px] text-richblack-200">
                    {catalogPageData?.data?.selectedCategory?.description}
                </p>
                </div>
            </div>

            {/* section 1 - Courses to get you started */}
            <div className="text-white mx-auto box-content w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent">
                
                <div className="section_heading ">Courses to get you started</div>

                <div className="my-4 flex border-b w-[100%] border-b-richblack-600 text-sm">
                    
                    {/* selection slider */}
                    <p 
                    className={`px-4 py-2 ${ active === 1 ? "border-b border-b-yellow-25 text-yellow-25": "text-richblack-50"} cursor-pointer`}
                    onClick={() => setActive(1)}>
                        Most Popular
                    </p>

                    

                    
                    

                </div>

                
                    {/* <CourseSlider 
                        Courses={catalogPageData?.data?.selectedCategory?.courses}
                    /> */}
                    
                
                {/* course Slider */}
                {/* <div>
                    <p className="section_heading">Top Courses </p>
                    <div>
                        <CourseSlider Courses={catalogPageData?.data?.differentCategory?.courses} />
                    </div>
                </div> */}
                
                {/* section 3 */}
                {/* <div className=" mx-auto box-content w-full max-w-maxContentTab  py-12 lg:max-w-maxContent">
                    <p className="section_heading">Frequently Bought Together</p>

                    <div className="py-8">
                        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                        {catalogPageData?.data?.mostSellingCourses?.slice(0, 4).map((course, i) => (
                                <CourseCard course={course} key={i} Height={"h-[400px]"} />
                         ))}
                        </div>
                    </div>

                </div> */}

            </div>
        
        </>
    )
}

export default Catalog ;