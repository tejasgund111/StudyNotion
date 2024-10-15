import React, { useState } from 'react'
import { MdEdit } from 'react-icons/md';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { RxDropdownMenu } from 'react-icons/rx';
import { useDispatch, useSelector } from 'react-redux'
import ConfirmationModal from "../../../../common/ConfirmationModal"
import { setCourse } from '../../../../../slices/courseSlice';
import { deleteSection, deleteSubSection } from '../../../../../services/operations/courseDetailsAPI';
import toast from 'react-hot-toast';
import { AiFillCaretDown, AiOutlinePlus } from 'react-icons/ai';
import SubSectionModal from './SubSectionModal';

const NestedView = ({ handleChangeEditSectionName }) => {

    const { course } = useSelector((state) => state.course);
    const { token } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    const [addSubSection, setAddSubSection] = useState(null);
    const [viewSubSection, setViewSubSection] = useState(null);
    const [editSubSection, setEditSubSection] = useState(null);

    // to keep track of confirmation modal
    const [confirmationModal, setConfirmationModal] = useState(null)

    const handleDeleteSection = async (sectionId) => {
        const result = await deleteSection({
            sectionId,
            courseId: course._id,
            token,
        })
        console.log(result);
        if (result) {
            dispatch(setCourse(result))
        }
        else {
            toast.error("failed to delete section");
        }
        setConfirmationModal(null)
    }

    const handleDeleteSubSection = async (subSectionId, sectionId) => {
        const result = await deleteSubSection({ subSectionId, sectionId, token })
        if (result) {
            // update the structure of course
            const updatedCourseContent = course.courseContent.map((section) =>
                section._id === sectionId ? result : section
            )
            const updatedCourse = { ...course, courseContent: updatedCourseContent }
            dispatch(setCourse(updatedCourse))
        }
        setConfirmationModal(null)
    }

    return (
        <div>
            <div>
                {
                    course?.courseContent?.map((section) => (
                        // section dropdown 
                        <details key={section._id} open>
                            {/* section dowpdown content  */}
                            <summary className="flex cursor-pointer items-center justify-between border-b-2 border-b-richblack-600 py-2">
                                <div className="flex items-center gap-x-3">
                                    <RxDropdownMenu className="text-2xl text-richblack-50" />
                                    <p className="font-semibold text-richblack-50">
                                        {section.sectionName}
                                    </p>
                                </div>
                                <div className="flex items-center gap-x-3">
                                    <button
                                        onClick={() => {
                                            handleChangeEditSectionName(
                                                section._id,
                                                section.sectionName
                                            )
                                        }}
                                    >
                                        <MdEdit className="text-xl text-richblack-300" />
                                    </button>
                                    <button
                                        onClick={() => {
                                            setConfirmationModal({
                                                text1: "Delete this Section",
                                                text2: "All the lectures in this section will be deleted",
                                                btn1Text: "Delete",
                                                btn2Text: "Cancel",
                                                btn1Handler: () => handleDeleteSection(section._id),
                                                btn2Handler: () => setConfirmationModal(null),
                                            })
                                        }}
                                    >
                                        <RiDeleteBin6Line className="text-xl text-richblack-300" />
                                    </button>
                                    <span>
                                        <AiFillCaretDown className={`text-xl text-richblack-300`} />
                                    </span>
                                </div>
                            </summary>

                            <div>
                                {
                                    section.subSection.map((data) => {
                                        <div
                                            key={data?.id}
                                            onClick={() => setViewSubSection(data)}
                                        >
                                            <div className='flex items-center gap-x-3'>
                                                <RxDropdownMenu />
                                                <p>{data.title}</p>
                                            </div>

                                            <div>
                                                <button onClick={() => setEditSubSection({ ...data, sectionId: section._id })}>
                                                    <MdEdit />
                                                </button>
                                                <button
                                                    onClick={() =>
                                                        setConfirmationModal({
                                                            text1: "Delete this Sub-Section?",
                                                            text2: "This lecture will be deleted",
                                                            btn1Text: "Delete",
                                                            btn2Text: "Cancel",
                                                            btn1Handler: () => handleDeleteSubSection(data._id, section._id),
                                                            btn2Handler: () => setConfirmationModal(null),
                                                        })
                                                    }
                                                >
                                                    <RiDeleteBin6Line />
                                                </button>
                                            </div>
                                        </div>
                                    })
                                }

                                <button
                                    onClick={setAddSubSection(section._id)}
                                >
                                    <AiOutlinePlus />
                                    <p>Add Lecture</p>
                                </button>
                            </div>
                        </details>
                    ))
                }
            </div>

            {
                addSubSection ? (<SubSectionModal modalData={addSubSection} setModalData={setAddSubSection} add={true} />)
                    : viewSubSection ? (<SubSectionModal modalData={viewSubSection} setModalData={setViewSubSection} view={true} />)
                        : editSubSection ? (<SubSectionModal modalData={editSubSection} setModalData={setEditSubSection} edit={true} />)
                            : (<div></div>)

            }


            {/* confirmation modal  */}
            {
                confirmationModal ? (<ConfirmationModal modalData={confirmationModal} />) : (<></>)
            }
        </div >
    )
}

export default NestedView

// 52