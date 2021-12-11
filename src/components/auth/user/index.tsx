import axios from "axios";
import { IUserProfileResult } from "./types";

let UserProfile: IUserProfileResult = {
    email: "",
    name: "",
}

export const getUserToken  = async (tk:string) => {
    try {
        const res = await axios
        .get('http://local.laravel.spu911.com/api/auth/user-profile', { headers: {"Authorization" : `Bearer ${tk}`} })
        const {data} = res;
        UserProfile = {
            email: data.email,
            name: data.name,
        };
        console.log("Email:", UserProfile.email);  
        console.log("Name:", UserProfile.name);  
    }
    catch(ex) {
        console.log("Problem", ex);
    }
    
}

const UserProfilePage = () => {
    
    return (
        <>
            <div className="alert alert-primary" role="alert">
                Name: {UserProfile.name}
            </div>
            <div className="alert alert-primary" role="alert">
                Email: {UserProfile.email}
            </div>
        </>
    );
}


export default UserProfilePage;