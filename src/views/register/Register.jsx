import DarkModeSwitcher from "@/components/dark-mode-switcher/Main";
import dom from "@left4code/tw-starter/dist/js/dom";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { ErrorMessage } from "../../components/ErrorMessage/ErrorMessage";
import { FormInput } from "../../components/FormInput/FormInput";
import { SuccessfulOperation } from "../../components/SuccessfulOperation/SuccessfulOperation";
import useService from "../../service";
import { validationsHashMap } from "../../validations/user.validation";

export const Register = () => {
  useEffect(() => {
    dom("body").removeClass("main").removeClass("error-page").addClass("login");
  }, []);

  const navigate = useNavigate();
  const {service} = useService();
  const [globalErrors, setGlobalErrors] = useState(null);
  const [glabalSuccess, setglabalSuccess] = useState(null);

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rePassword: '',
    username: ''
  });
  const [errors, setErrors] = useState({
    email: false,
    password: false,
    rePassword: false,
    username: false
  });
  const [touched, setTouched] = useState({
    email: false,
    password: false,
    rePassword: false,
    username: false
  })

  const onChange = (ev) => {
    ev.preventDefault();
    const value = ev.target.value;
    const name = ev.target.name;

    const newFormData = {
      ...formData,
      [name] : value
    }

    setFormData(old => newFormData);

    const newTouched = {
      ...touched,
      [name]: true
    }
    setTouched(oldTouched => newTouched);

    if(name==='rePassword') {
      const validationResponse = validationsHashMap[name](formData.password, value);

      if(!validationResponse) {
        // Reset error state
        const newErrors = {
          ...errors,
          [name]: false
        }

        return setErrors(oldErrors => newErrors); 
      }

      const newErrors = {
        ...errors,
        [name]: validationResponse.errorMsg
      }

      return setErrors(oldErrors => newErrors);
    }

    const validationResponse = validationsHashMap[name](value);

    if(!validationResponse) {
      // Reset error state
      const newErrors = {
        ...errors,
        [name]: false
      }
      return setErrors(oldErrors => newErrors); 
    }

    const newErrors = {
      ...errors,
      [name]: validationResponse.errorMsg
    }

    return setErrors(oldErrors => newErrors);
  }

  const onBlur = (ev) => {
    const value = ev.target.value;
    const name = ev.target.name;

    const newTouched = {
      ...touched,
      [name]: true
    }
    setTouched(oldTouched => newTouched);

    if(name==='rePassword') {
      const validationResponse = validationsHashMap[name](formData.password, value);

      if(!validationResponse) {
        // Reset error state
        const newErrors = {
          ...errors,
          [name]: false
        }

        return setErrors(oldErrors => newErrors); 
      }

      const newErrors = {
        ...errors,
        [name]: validationResponse.errorMsg
      }

      return setErrors(oldErrors => newErrors);
    }

    const validationResponse = validationsHashMap[name](value);

    if(!validationResponse) {
      // Reset error state
      const newErrors = {
        ...errors,
        [name]: false
      }
      return setErrors(oldErrors => newErrors); 
    }

    const newErrors = {
      ...errors,
      [name]: validationResponse.errorMsg
    }

    return setErrors(oldErrors => newErrors);
  }

  const canRegister = () => {
    const allFieldsTouched = touched.email && touched.password && touched.rePassword && touched.username;
    const allErrorsFalse = !errors.email && !errors.password && !errors.rePassword && !errors.username;
    return (allFieldsTouched && allErrorsFalse);
  }

  const onRegister = async (ev) => {
    ev.preventDefault();

    if(!canRegister()) {
      return setGlobalErrors('You must pass all validations in order to register');
    }

    const registerResponse = await service.create('auth/register', {username: formData.username, email: formData.email, password: formData.password});

    if(registerResponse.status >= 400) {
      return setGlobalErrors(registerResponse.data.message);
    }

    navigate('/login');
  }

  const {mutate: register} = useMutation({
    mutationFn: onRegister,
    onError: (err) => {
      console.log(err);
    }
  })

  return (
    <>
      <div>
        <DarkModeSwitcher />
        <div className="container sm:px-10">
          <div className="block xl:grid grid-cols-2 gap-4">
            {/* BEGIN: Login Info */}
            <div className="hidden xl:flex flex-col min-h-screen">
              <a href="" className="-intro-x flex items-center pt-5">
                <span className="text-white text-lg ml-3"> MopDocs </span>
              </a>
              <div className="my-auto">
                <div className="-intro-x text-white font-medium text-4xl leading-tight mt-10">
                  A few more clicks to <br />
                  sign in to your account.
                </div>
              </div>
            </div>
            {/* END: Login Info */}
            {/* BEGIN: Login Form */}
            <div className="h-screen xl:h-auto flex py-5 xl:py-0 my-10 xl:my-0">
              <div className="my-auto mx-auto xl:ml-20 bg-white dark:bg-darkmode-600 xl:bg-transparent px-5 sm:px-8 py-8 xl:p-0 rounded-md shadow-md xl:shadow-none w-full sm:w-3/4 lg:w-2/4 xl:w-auto">
                {globalErrors ? <ErrorMessage msg={globalErrors}></ErrorMessage> : null}
                {glabalSuccess ? <SuccessfulOperation msg={glabalSuccess}></SuccessfulOperation> : null}
                <h2 className="intro-x font-bold text-2xl xl:text-3xl text-center xl:text-left">
                  Sign Up
                </h2>
                <div className="intro-x mt-2 text-slate-400 xl:hidden text-center">
                  A few more clicks to sign in to your account
                </div>
                <div className="intro-x mt-8">
                 <FormInput placeholder={"Email"} name={"email"} type={"email"} onChange={onChange} onBlur={onBlur} error={errors.email}></FormInput>
                 <FormInput placeholder={"Username"} name={"username"} type={"text"} onChange={onChange} onBlur={onBlur} error={errors.username}></FormInput>
                 <FormInput placeholder={"Password"} name={"password"} type={"password"} onChange={onChange} onBlur={onBlur} error={errors.password}></FormInput>
                 <FormInput placeholder={"Repeat Password"} name={"rePassword"} type={"password"} onChange={onChange} onBlur={onBlur} error={errors.rePassword}></FormInput>
                </div>
                <div className="intro-x flex text-slate-600 dark:text-slate-500 text-xs sm:text-sm mt-4">
                  <div className="flex items-center mr-auto">
                  </div>
                </div>
                <div className="intro-x mt-5 xl:mt-8 text-center xl:text-left flex items-end">
                  <input type="button" value="Register" className="btn btn-outline-secondary py-3 px-4 w-full xl:w-32 mt-3 xl:mt-0 align-top" onClick={register} disabled={!canRegister()} />
                  <span className="mx-5 text-sm">Already have an account? <NavLink to="/login" className="text-blue-600 underline">Sing In Now !</NavLink></span>
                </div>
              </div>
            </div>
            {/* END: Login Form */}
          </div>
        </div>
      </div>
    </>
  );
}
