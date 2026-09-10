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

            event.preventDefault();


            // รับ Email หรือ Username
            const identifier =
                document
                    .getElementById("loginIdentifier")
                    .value
                    .trim();


            // รับ Password
            const password =
                document
                    .getElementById("loginPassword")
                    .value;


            let email = identifier;


            // ========================================
            // ถ้ากรอก Username
            // ========================================

            if (!identifier.includes("@")) {

                const { data: profile, error: profileError } =
                    await supabaseClient
                        .from("profiles")
                        .select("email")
                        .eq("username", identifier)
                        .single();


                if (profileError || !profile) {

                    alert(
                        "ไม่พบ Username นี้"
                    );

                    return;
                }


                email = profile.email;
            }


            // ========================================
            // LOGIN SUPABASE
            // ========================================

            const { data, error } =
                await supabaseClient.auth
                    .signInWithPassword({

                        email: email,

                        password: password

                    });


            // ========================================
            // LOGIN ERROR
            // ========================================

            if (error) {

                alert(
                    "Login ไม่สำเร็จ\n\n" +
                    error.message
                );

                return;
            }


            // ========================================
            // LOGIN SUCCESS
            // ========================================

            console.log("User:", data.user);


            // ไปหน้า Booking
            window.location.href =
                "booking.html";

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

            event.preventDefault();


            // Full Name
            const fullName =
                document
                    .getElementById("fullName")
                    .value
                    .trim();


            // Username
            const username =
                document
                    .getElementById("username")
                    .value
                    .trim();


            // Email
            const email =
                document
                    .getElementById("signupEmail")
                    .value
                    .trim();


            // Password
            const password =
                document
                    .getElementById("signupPassword")
                    .value;


            // Confirm Password
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
            // CHECK USERNAME
            // ========================================

            if (username.length < 3) {

                alert(
                    "Username ต้องมีอย่างน้อย 3 ตัวอักษร"
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
            // SAVE PROFILE
            // ========================================

            if (data.user) {

                const { error: profileError } =
                    await supabaseClient
                        .from("profiles")
                        .insert({

                            id: data.user.id,

                            username: username,

                            email: email

                        });


                if (profileError) {

                    console.error(
                        "Profile Error:",
                        profileError
                    );

                }
            }


            // ========================================
            // SUCCESS
            // ========================================

            alert(
                "สมัครสมาชิกสำเร็จ!\n\n" +
                "กรุณาตรวจสอบ Email เพื่อยืนยันบัญชี"
            );


            // กลับ Login
            window.location.href =
                "index.html";

        }
    );

}