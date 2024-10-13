import React from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/core/Dashboard/Sidebar"
import "../App.css";

const Dashboard = () => {

    const {loading: authLoading} = useSelector( (state) => state.auth );
    const {loading: profileLoading} = useSelector( (state) => state.profile );

    if(profileLoading || authLoading) {
        return (
            <div className="mt-10 spinner">
                Loading...
            </div>
        )
    }

    return (
        <div className="relative flex min-h-[calc(100vh-3.5rem)]">
            <Sidebar />
            <div className="h-[calc(100vh-3.5rem)] flex-1 overflow-auto">
                <div className="mx-auto w-11/12 max-w-[1000px] py-10">
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default Dashboard

// An <Outlet> should be used in parent route elements to render their child route elements. 
// This allows nested UI to show up when child routes are rendered. 
// If the parent route matched exactly, it will render a child index route or nothing if there is no index route.