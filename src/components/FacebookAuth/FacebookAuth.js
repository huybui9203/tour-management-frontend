import React from "react";
import {
    FacebookAuthProvider,
    fetchSignInMethodsForEmail,
    getAuth,
    linkWithCredential,
    signInWithPopup,
} from "firebase/auth";
import app from "../../firebase/index.js";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { EmailAuthProvider } from "firebase/auth/web-extension";
function FacebookAuth() {
    const navigate = useNavigate();
    const handleLoginWithFacebook = async () => {
        try {
            const provider = new FacebookAuthProvider();
            const auth = getAuth(app);

            // Đăng nhập với Facebook
            const result = await signInWithPopup(auth, provider);
            console.log(result);

            const res = await axios.post("http://localhost:8000/api/auth/facebook", {
                email: result.user.email,
                username: result.user.displayName,
            });
            if (res.status === 200) {
                navigate("/");
            } else {
                console.log(res.data.message);
            }
        } catch (error) {
            // email đã đăng ký bằng google account
            if (error.code === "auth/account-exists-with-different-credential") {
                // Lấy lại thông tin nhà cung cấp hiện tại (Facebook)
                const pendingCredential = FacebookAuthProvider.credentialFromError(error);

                // Nhận email đã đăng ký với phương thức khác
                const email = error.customData.email;
                const username = error.customData._tokenResponse.displayName;
                // console.log(username);

                // Kiểm tra xem tài khoản đã được tạo với một phương thức khác
                const auth = getAuth(app);
                const methods = await fetchSignInMethodsForEmail(auth, email);
                const res = await axios.post("http://localhost:8000/api/auth/facebook", {
                    email: email,
                    username: username,
                });
                if (res.status === 200) {
                    navigate("/");
                } else {
                    console.log(res.data.message);
                }

                // Nếu tài khoản đã đăng ký bằng email/password
                if (methods.includes(EmailAuthProvider.EMAIL_PASSWORD_SIGN_IN_METHOD)) {
                    const password = prompt("Nhập mật khẩu của bạn");
                    try {
                        // Đăng nhập bằng email/password
                        const userCredential = await auth.signInWithEmailAndPassword(email, password);
                        // Liên kết thông tin đăng nhập Facebook với tài khoản hiện tại
                        await linkWithCredential(userCredential.user, pendingCredential);
                        const res = await axios.post("http://localhost:8000/api/auth/facebook", {
                            email: email,
                            username: username,
                        });
                        if (res.status === 200) {
                            navigate("/");
                        } else {
                            console.log(res.data.message);
                        }
                        console.log("Liên kết thành công với Facebook!");
                    } catch (linkError) {
                        console.error("Lỗi khi liên kết:", linkError);
                    }
                }
            } else {
                console.error(error);
            }
        }
    };

    return (
        <div className="inline-block px-3 cursor-pointer" onClick={handleLoginWithFacebook}>
            <img
                src="https://www.dpreview.com/files/p/articles/4698742202/facebook.jpeg"
                alt="Facebook"
                className="w-10 h-10 p-0 mt-2 rounded-full object-cover object-center"
            />
        </div>
    );
}

export default FacebookAuth;
