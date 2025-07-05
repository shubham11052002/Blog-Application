    import axios from "axios";
    import React,{ createContext, useContext, useEffect, useState} from "react";
    export const AuthContext = createContext();

    export const AuthProvider = ({children}) => {
        const [blogs,setBlogs] = useState();
        const [profile, setProfile] = useState(null);
        const [isAuthenticated, setIsAuthenticated] = useState(false);
        const [loading, setLoading] = useState(true);

    useEffect(()=>{
        const fetchProfile = async () => {
            try {
              const response = await axios.get("https://blog-application-23z7.onrender.com/my-profile", {
                withCredentials: true,
                headers: {
                  "Content-Type": "application/json"
                }
              });
              // console.log("Fetched profile data:", response.data);
              setProfile(response.data.user);
              setIsAuthenticated(true);
            } catch (error) {
              console.log(
                error.response ? error.response.data : error,
                "error in fetching data..."
              );
            } finally {
                setLoading(false);
            }
          };
          
          
        const fetchBlogs = async () =>{
            try {
                const data = await axios.get("https://blog-application-23z7.onrender.com/all-blogs", {
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
        <AuthContext.Provider value={{ blogs, profile,setProfile, isAuthenticated,setIsAuthenticated }}>{children} </AuthContext.Provider>
    )
    };

    export const useAuth = () => useContext(AuthContext)