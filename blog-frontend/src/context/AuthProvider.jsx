    import axios from "axios";
    import React,{ createContext, useContext, useEffect, useState} from "react";
    export const AuthContext = createContext();

    export const AuthProvider = ({children}) => {
        const [blogs,setBlogs] = useState();
        const [profile, setProfile] = useState(null);
        const [isAuthenticated, setIsAuthenticated] = useState(false);
    useEffect(()=>{
        const fetchProfile = async () =>{
            try {
                const data = await axios.get("http://localhost:3001/my-profile", {
                    withCredentials:true,
                    headers:{
                         "Content-type":"application/json"
                        }
                });
                // console.log("Fetched profile response from backend:", data);
                setProfile(data.data.user);
                setIsAuthenticated(true)
            } catch (error) {
                console.log(error.response ? error.response.data : error, "error in fetching data...");
                        }
        };
          
        const fetchBlogs = async () =>{
            try {
                const data = await axios.get("http://localhost:3001/all-blogs", {
                });
                setBlogs(data.data.blogs);
                // console.log("auth provider data " ,data)
            } catch (error) {
                console.log(error.response ? error.response.data : error, "error in fetching data...");
                        }
        };
        fetchProfile();
        fetchBlogs();
    },[])
    return (
        <AuthContext.Provider value={{ blogs, profile, isAuthenticated }}>{children} </AuthContext.Provider>
    )
    };

    export const useAuth = () => useContext(AuthContext)