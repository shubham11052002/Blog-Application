    import axios from "axios";
    import React,{ createContext, useContext, useEffect, useState} from "react";
    export const AuthContext = createContext();

    export const AuthProvider = ({children}) => {
        const [blogs,setBlogs] = useState();
    useEffect(()=>{
        const fetchBlogs = async () =>{
            try {
                const data = await axios.get("http://localhost:3001/all-blogs", {
                });
                setBlogs(data);
                // console.log("auth provider data " ,data)
            } catch (error) {
                console.log(error.response ? error.response.data : error, "error in fetching data...");
                        }
        };
        fetchBlogs();
    },[])
    return (
        <AuthContext.Provider value={{ blogs }}>{children} </AuthContext.Provider>
    )
    };

    export const useAuth = () => useContext(AuthContext)