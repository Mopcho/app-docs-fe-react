// ** Field Validations ** //
export const validateEmail = (email) => {
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

    const emailResult = emailRegex.test(email);

   if(!emailResult) {
    return {
        errorMsg: 'Invalid email',
        field: 'email'
    }
   }
}

export const validatePassword = (password) => {
    if(password.length < 8) {
        return {
            errorMsg: 'Password must be at least 8 characters long',
            field: 'password'
        }
    }
}

export const validateRePassword = (password,rePassword) => {
    if(password !== rePassword) {
        return {
            errorMsg: 'Repeat password must match password',
            field: 'rePassword'
        }
    }
}

export const validateUsername = (username) => {
    if(username.length < 3) {
        return {
            errorMsg: 'Username must be at least 3 characters long',
            field: 'username'
        }
    }
}

export const validationsHashMap = {
    email: validateEmail,
    username: validateUsername,
    password: validatePassword,
    rePassword: validateRePassword
}