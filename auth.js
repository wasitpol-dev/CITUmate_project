// ========================================
// SUPABASE CONFIG
// ========================================

const SUPABASE_URL =
    "https://puyxirikhjuwyqtwfyyu.supabase.co";

const SUPABASE_KEY =
    "sb_publishable_1upfLu7ZI5cwSUzaoXyC2w_AzXGVAs9";


const supabaseClient =
    supabase.createClient(
        SUPABASE_URL,
        SUPABASE_KEY
    );


// ========================================
// LOGIN
// ========================================

const loginForm =
    document.getElementById("loginForm");


if (loginForm) {

    loginForm.addEventListener(
        "submit",
        async function (event) {

            // ไม่ให้หน้าเว็บรีเฟรช
            event.preventDefault();


            // รับ Email
            const email =
                document
                    .getElementById("loginEmail")
                    .value
                    .trim();


            // รับ Password
            const password =
                document
                    .getElementById("loginPassword")
                    .value;


            // Login ด้วย Supabase
            const { data, error } =
                await supabaseClient.auth
                    .signInWithPassword({

                        email: email,

                        password: password

                    });


            // ถ้า Login ไม่สำเร็จ
            if (error) {

                alert(
                    "Login ไม่สำเร็จ\n\n" +
                    error.message
                );

                return;
            }


            // Login สำเร็จ
            alert("Login สำเร็จ!");


            console.log("User:", data.user);

        }
    );

}


// ========================================
// SIGN UP
// ========================================

const signupForm =
    document.getElementById("signupForm");


if (signupForm) {

    signupForm.addEventListener(
        "submit",
        async function (event) {

            // ไม่ให้หน้าเว็บรีเฟรช
            event.preventDefault();


            // รับ Full Name
            const fullName =
                document
                    .getElementById("fullName")
                    .value
                    .trim();


            // รับ Username
            const username =
                document
                    .getElementById("username")
                    .value
                    .trim();


            // รับ Email
            const email =
                document
                    .getElementById("signupEmail")
                    .value
                    .trim();


            // รับ Password
            const password =
                document
                    .getElementById("signupPassword")
                    .value;


            // รับ Confirm Password
            const confirmPassword =
                document
                    .getElementById("confirmPassword")
                    .value;


            // ========================================
            // CHECK PASSWORD
            // ========================================

            if (password !== confirmPassword) {

                alert("Password ไม่ตรงกัน");

                return;
            }


            if (password.length < 6) {

                alert(
                    "Password ต้องมีอย่างน้อย 6 ตัวอักษร"
                );

                return;
            }


            // ========================================
            // CREATE ACCOUNT
            // ========================================

            const { data, error } =
                await supabaseClient.auth.signUp({

                    email: email,

                    password: password,

                    options: {

                        data: {

                            full_name: fullName,

                            username: username

                        }

                    }

                });


            // ========================================
            // ERROR
            // ========================================

            if (error) {

                alert(
                    "สมัครสมาชิกไม่สำเร็จ\n\n" +
                    error.message
                );

                console.error(error);

                return;
            }


            // ========================================
            // SUCCESS
            // ========================================

            alert(
                "สมัครสมาชิกสำเร็จ!\n\n" +
                "กรุณาตรวจสอบ Email เพื่อยืนยันบัญชี"
            );


            // กลับไปหน้า Login
            window.location.href =
                "index.html";

        }
    );

}