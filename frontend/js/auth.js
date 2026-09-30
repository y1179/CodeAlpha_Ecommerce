
const AUTH_API_URL = "http://localhost:5000/api";


// ============================================
// REGISTER
// ============================================

const registerForm =
    document.getElementById("register-form");


if (registerForm) {

    registerForm.addEventListener(
        "submit",
        async function (event) {

            event.preventDefault();


            const name =
                document
                    .getElementById("name")
                    .value
                    .trim();


            const email =
                document
                    .getElementById("email")
                    .value
                    .trim();


            const password =
                document
                    .getElementById("password")
                    .value;


            const confirmPassword =
                document
                    .getElementById("confirm-password")
                    .value;


            // -------------------------------
            // Validation
            // -------------------------------

            if (
                !name ||
                !email ||
                !password ||
                !confirmPassword
            ) {

                showAuthMessage(
                    "Please fill in all fields.",
                    "error"
                );

                return;
            }


            if (
                password !==
                confirmPassword
            ) {

                showAuthMessage(
                    "Passwords do not match.",
                    "error"
                );

                return;
            }


            if (password.length < 6) {

                showAuthMessage(
                    "Password must be at least 6 characters.",
                    "error"
                );

                return;
            }


            try {

                showAuthMessage(
                    "Creating your account...",
                    "success"
                );


                const response =
                    await fetch(
                        `${AUTH_API_URL}/auth/register`,
                        {
                            method: "POST",

                            headers: {
                                "Content-Type":
                                    "application/json"
                            },

                            body:
                                JSON.stringify({

                                    name,

                                    email,

                                    password

                                })
                        }
                    );


                const data =
                    await response.json();


                if (!response.ok) {

                    showAuthMessage(
                        data.message ||
                        "Registration failed.",
                        "error"
                    );

                    return;
                }


                showAuthMessage(
                    "Account created successfully! 🎉",
                    "success"
                );


                registerForm.reset();


                // Redirect to login
                setTimeout(
                    () => {

                        window.location.href =
                            "login.html";

                    },
                    1200
                );


            } catch (error) {

                console.error(
                    "Registration error:",
                    error
                );


                showAuthMessage(
                    "Unable to connect to the server. Please make sure the backend is running.",
                    "error"
                );

            }

        }
    );

}


// ============================================
// LOGIN
// ============================================

const loginForm =
    document.getElementById("login-form");


if (loginForm) {

    loginForm.addEventListener(
        "submit",
        async function (event) {

            event.preventDefault();


            const email =
                document
                    .getElementById("email")
                    .value
                    .trim();


            const password =
                document
                    .getElementById("password")
                    .value;


            // -------------------------------
            // Validation
            // -------------------------------

            if (!email || !password) {

                showAuthMessage(
                    "Please enter email and password.",
                    "error"
                );

                return;
            }


            try {

                showAuthMessage(
                    "Logging you in...",
                    "success"
                );


                const response =
                    await fetch(
                        `${AUTH_API_URL}/auth/login`,
                        {
                            method: "POST",

                            headers: {
                                "Content-Type":
                                    "application/json"
                            },

                            body:
                                JSON.stringify({

                                    email,

                                    password

                                })
                        }
                    );


                const data =
                    await response.json();


                if (!response.ok) {

                    showAuthMessage(
                        data.message ||
                        "Invalid email or password.",
                        "error"
                    );

                    return;
                }


                // -------------------------------
                // Save login information
                // -------------------------------

                localStorage.setItem(
                    "token",
                    data.token
                );


                localStorage.setItem(
                    "currentUser",
                    JSON.stringify(
                        data.user
                    )
                );


                showAuthMessage(
                    `Welcome back, ${data.user.name}! 🍦`,
                    "success"
                );


                // Redirect to home
                setTimeout(
                    () => {

                        window.location.href =
                            "index.html";

                    },
                    1000
                );


            } catch (error) {

                console.error(
                    "Login error:",
                    error
                );


                showAuthMessage(
                    "Unable to connect to the server. Please make sure the backend is running.",
                    "error"
                );

            }

        }
    );

}


// ============================================
// LOGOUT
// ============================================

function logoutUser() {

    localStorage.removeItem(
        "token"
    );

    localStorage.removeItem(
        "currentUser"
    );


    window.location.href =
        "index.html";
}


// ============================================
// GET CURRENT USER
// ============================================

function getCurrentUser() {

    const user =
        localStorage.getItem(
            "currentUser"
        );


    if (!user) {
        return null;
    }


    try {

        return JSON.parse(user);

    } catch (error) {

        console.error(
            "User data error:",
            error
        );

        return null;
    }

}


// ============================================
// CHECK LOGIN
// ============================================

function isLoggedIn() {

    return !!localStorage.getItem(
        "token"
    );

}


// ============================================
// SHOW MESSAGE
// ============================================

function showAuthMessage(
    message,
    type
) {

    const messageElement =
        document.getElementById(
            "login-message"
        ) ||
        document.getElementById(
            "register-message"
        );


    if (!messageElement) {
        return;
    }


    messageElement.textContent =
        message;


    messageElement.className =
        `form-message ${type}`;

}

