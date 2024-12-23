import React, { useContext } from "react";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import app from "../../firebase/index.js";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/Auth.js";
function GoogleAuth() {
    const { setUser } = useContext(AuthContext);
    console.log(process.env.REACT_APP_FIREBASE_API_KEY);

    const navigate = useNavigate();
    const handleLoginWithGoogle = async () => {
        try {
            const provider = new GoogleAuthProvider();
            const auth = getAuth(app);
            const result = await signInWithPopup(auth, provider);
            console.log(result.user.displayName, result.user.email);

            const res = await axios.post(
                process.env.REACT_APP_URL + "/auth/google",
                {
                    email: result.user.email,
                    username: result.user.displayName,
                },
                {
                    withCredentials: true,
                }
            );
            if (res.status === 200) {
                setUser(res.data);
                navigate("/");
            } else {
                console.log(res.data.message);
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="inline-block px-3 cursor-pointer" onClick={handleLoginWithGoogle}>
            <img
                src="https://www.freepnglogos.com/uploads/google-logo-png/google-logo-png-suite-everything-you-need-know-about-google-newest-0.png"
                alt="Google"
                className="w-10 h-10 p-0 rounded-full"
            />
        </div>
    );
}

export default GoogleAuth;
