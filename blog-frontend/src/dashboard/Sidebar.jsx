import React from "react";
import { useAuth } from "../context/AuthProvider";

function Sidebar(){
    const {profile,isAuthenticated}=useAuth();
    console.log("sidebar profile " ,profile)

    return( 
        <div>
            <div>
                <h1>sidebar</h1>
               
                <p></p>
            </div>
        </div>
    )
}

export default Sidebar 