var signinEmail = document.getElementById("signinEmail");
var signinPassword = document.getElementById("signinPassword");
var signupName = document.getElementById("signupName");
var signupEmail = document.getElementById("signupEmail");
var signupPassword = document.getElementById("signupPassword");

let user;
if (localStorage.getItem("users") == null) {
    user = [];
} else {
    user = JSON.parse(localStorage.getItem("users"));
}

var username = localStorage.getItem("sessionUsername");
if (username) {
    document.getElementById('username').innerHTML = "Welcome " + username;
}

function login() {
    if (signinEmail.value == "" || signinPassword.value == "") {
        let fillMsg = document.getElementById("fillMsg");
        fillMsg.classList.replace("d-none", "d-block");
        return false;
    }

    let found = false;
    for (var i = 0; i < user.length; i++) {
        if (user[i].email.toLowerCase() == signinEmail.value.toLowerCase() && user[i].password.toLowerCase() == signinPassword.value.toLowerCase()) {
            localStorage.setItem('sessionUsername', user[i].name);
            found = true;
            window.location.href = "home.html";
            break;
        }
    }

    if (!found) {
        wrongMsg.classList.replace("d-none", "d-block");
    }
}

function signUp() {
    if (userInputsValidation() && !isExist()) {
        let userinfo = {
            name: signupName.value,
            email: signupEmail.value,
            password: signupPassword.value
        };

        user.push(userinfo);
        localStorage.setItem("users", JSON.stringify(user));
        document.getElementById("confirmMsg").classList.replace("d-none", "d-block");
    } else {
        document.getElementById("tryAgainMsg").classList.replace("d-none", "d-block");
    }
}

function logout() {
    localStorage.removeItem('sessionUsername');
}

function usernameValidation() {
    const signupNameAlert = document.getElementById("signupNameAlert");
    let regex = /^[A-Za-z]{3,10}(\s?[A-Za-z]{3,10})?$/;
    if (regex.test(signupName.value) && signupName.value != "") {
        signupName.classList.add("is-valid");
        signupName.classList.remove("is-invalid");
        signupNameAlert.classList.replace("d-block", "d-none");
        return true;
    } else {
        signupName.classList.add("is-invalid");
        signupName.classList.remove("is-valid");
        signupNameAlert.classList.replace("d-none", "d-block");
        return false;
    }
}

function userPasswordValidation() {
    let regex = /^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/;
    const signupPasswordAlert = document.getElementById("signupPasswordAlert");
    if (regex.test(signupPassword.value) && signupPassword.value != "") {
        signupPassword.classList.add("is-valid");
        signupPassword.classList.remove("is-invalid");
        signupPasswordAlert.classList.replace("d-block", "d-none");
        return true;
    } else {
        signupPassword.classList.add("is-invalid");
        signupPassword.classList.remove("is-valid");
        signupPasswordAlert.classList.replace("d-none", "d-block");
        return false;
    }
}

function userEmailValidation() {
    const signupEmailAlert = document.getElementById("signupEmailAlert");
    let regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (regex.test(signupEmail.value) && signupEmail.value != "") {
        signupEmail.classList.add("is-valid");
        signupEmail.classList.remove("is-invalid");
        signupEmailAlert.classList.replace("d-block", "d-none");
        return true;
    } else {
        signupEmail.classList.add("is-invalid");
        signupEmail.classList.remove("is-valid");
        signupEmailAlert.classList.replace("d-none", "d-block");
        return false;
    }
}

function isExist() {
    let accountExistMsg = document.getElementById("accountExistMsg");
    for (let i = 0; i < user.length; i++) {
        if (user[i].name.toLowerCase() == signupName.value.toLowerCase() || user[i].email.toLowerCase() == signupEmail.value.toLowerCase()) {
            accountExistMsg.classList.replace("d-none", "d-block");
            signupName.classList.remove("is-valid");
            signupEmail.classList.remove("is-valid");
            signupPassword.classList.remove("is-valid");
            return true;
        }
    }
    return false;
}

function userInputsValidation() {
    return usernameValidation() && userEmailValidation() && userPasswordValidation();
}


