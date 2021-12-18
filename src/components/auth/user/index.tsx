import axios from "axios";
import { IUserProfileResult } from "./types";
import { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router";

// let UserProfile: IUserProfileResult = {
    //     email: "",
    //     name: "",
    // }
    
const UserProfilePage = () => {
    
    const navigator = useNavigate();

    const [userProfile, setUserProfile] = useState<IUserProfileResult>({
        name: "",
        email: ""
    });

    const getUserToken  = async () => {
        try {
            if(localStorage.Token !== "") {
                const res = await axios
                .get('http://local.laravel.spu911.com/api/auth/user-profile', { headers: {"Authorization" : `Bearer ${localStorage.Token}`} })
                const {data} = res;
                const UserProfile: IUserProfileResult = {
                    email: data.email,
                    name: data.name,
                };
                //SetUser(tk, data);
                console.log(UserProfile.name, UserProfile.email);
                setUserProfile(UserProfile);
            }        
        }
        catch(ex) {
            console.log("Problem", ex);
        }
    }

    const Exit = () => {
        localStorage.Token = "";
        navigator("/");
        window.location.reload();
        //navigator("/user-profile");
    }

    useEffect(() => {
        getUserToken();
    }, []);

    return (
        <div>
            <div className="alert alert-primary" role="alert">
                Name: {userProfile.name}
            </div>
            <div className="alert alert-primary" role="alert">
                Email: {userProfile.email}
            </div>
            <Button variant="contained" color="error" onClick={Exit}>
                Logout
            </Button>
    </div>
    );
}


export default UserProfilePage;

