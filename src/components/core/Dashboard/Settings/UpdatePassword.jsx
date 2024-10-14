import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

import IconBtn from '../../../common/IconBtn'
import { changePassword } from '../../../../services/operations/SettingsAPI'

export default function UpdatePassword() {
    const { token }  = useSelector((state) => state.auth)
    const navigate = useNavigate()

    const [showOldPassword, setShowOldPassword] = useState(false)
    const [showNewPassword, setShowNewPassword] = useState(false)

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()

    const submitPasswordForm = async (data) => {
        // console.log('Password Data - ', data)
        try {
            await changePassword(token, data)
        } catch(error) {
            console.log('ERROR MESSAGE - ', error.message)
        }
    }

    return (
    <>
        <form onSubmit={handleSubmit(submitPasswordForm)}>
            <div className='my-10 flex flex-col gap-y-6 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12'>
                <h2 className='text-lg font-semibold text-richblack-5'>Password</h2>
                <div className='flex  flex-col gap-5 lg:flex-row'>
                    <div className='relative flex flex-col gap-2 lg:w-[48%]'>
                        <label htmlFor="oldPassword" className='lable-style text-richblack-5'>
                            Current Password
                        </label>
                        <input 
                            type={showOldPassword ? 'text' : 'password'} 
                            name='oldPassword'
                            id='oldPassword'
                            placeholder='Enter Current Password'
                            style={{
                                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                            }}
                            className='form-style w-full rounded-[0.5rem] bg-richblack-700 p-[12px] text-richblack-5'
                            {...register('oldPassword', { required: true })}
                        />
                        <span 
                            onClick={() => setShowOldPassword((prev) => !prev)}
                            className='absolute right-3 top-[42px] z-[10] cursor-pointer'
                        >
                            {showOldPassword ? (
                                <AiOutlineEyeInvisible fontSize={24} fill='#AFB2BF' />
                            ) : (
                                <AiOutlineEye fontSize={24} fill='#AFB2BF' />
                            )}
                        </span>
                        {errors.oldPassword && (
                            <span className='-mt-1 text-[12px] text-yellow-100'>
                                Please Enter Your Current Password
                            </span>
                        )}
                    </div>
                    <div className='relative flex flex-col gap-2 lg:w-[48%]'>
                        <label htmlFor='newPassword' className='lable-style text-richblack-5'>
                            New Password
                        </label>
                        <input 
                            type={showNewPassword ? 'text' : 'password'}
                            name='newPassword'
                            id='newPassword'
                            placeholder='Enter New Password'
                            style={{
                                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                            }}
                            className='form-style w-full rounded-[0.5rem] bg-richblack-700 p-[12px] text-richblack-5'
                            {...register('newPassword', { required: true })}
                        />
                        <span
                            onClick={() => setShowNewPassword((prev) => !prev)}
                            className='absolute right-3 top-[42px] z-[10] cursor-pointer'
                        >
                            {showNewPassword ? (
                                <AiOutlineEyeInvisible fontSize={24} fill='#AFB2BF' />
                            ) : (
                                <AiOutlineEye fontSize={24} fill='#AFB2BF' />
                            )}
                        </span>
                        {errors.newPassword && (
                            <span className='-mt-1 text-[12px] text-yellow-100'>
                                Please Enter Your New Password
                            </span>
                        )}
                    </div>
                </div>
            </div>

            <div className='flex justify-end gap-2'>
                <button
                    onClick={() => {
                        navigate('/dashboard/my-profile')
                    }}
                    className='cursor-pointer rounded-md bg-richblack-700  py-2 px-5 font-semibold text-richblack-50'
                >
                    Cancel
                </button>
                <IconBtn type='submit' text='Update' />
            </div>
        </form> 
    </>
  )
}