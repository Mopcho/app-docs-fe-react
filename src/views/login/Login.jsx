import DarkModeSwitcher from "@/components/dark-mode-switcher/Main";
import dom from "@left4code/tw-starter/dist/js/dom";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { ErrorMessage } from "../../components/ErrorMessage/ErrorMessage";
import { SuccessfulOperation } from "../../components/SuccessfulOperation/SuccessfulOperation";
import useService from "../../service";
import { FormInput } from "../../components/FormInput/FormInput";

export const Login = () => {
  // onBlur => Validate field => Show errorMessage if any
  // When formData passes validation => unblock login and register
  // 
  useEffect(() => {
    dom("body").removeClass("main").removeClass("error-page").addClass("login");
  }, []);

  const {service} = useService();
  const navigate = useNavigate();
  const [globalErrors, setGlobalErrors] = useState(null);
  const [glabalSuccess, setglabalSuccess] = useState(null);

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [touched, setTouched] = useState({
    email: false,
    password: false,
  })
  const [errors, setErrors] = useState({
    email: false,
    password: false,
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

    if(value.length <= 0) {
      const newErrors = {
        ...errors,
        [name]: `${name} cant be empty`
      }
      setErrors(oldErrors => newErrors);
    }
  }

  const onBlur = (ev) => {
    const value = ev.target.value;
    const name = ev.target.name;

    const newTouched = {
      ...touched,
      [name]: true
    }
    setTouched(oldTouched => newTouched);

    if(value.length <= 0) {
      const newErrors = {
        ...errors,
        [name]: `${name.charAt(0).toUpperCase() + name.slice(1)} cant be empty`
      }
      setErrors(oldErrors => newErrors);
    }

    const newErrors = {
      ...errors,
      [name]: false
    }
    setErrors(oldErrors => newErrors);
  }

  const canLogin = () => {
    const allFieldsTouched = touched.email && touched.password;
    const allErrorsFalse = !errors.email && !errors.password;
    return (allFieldsTouched && allErrorsFalse);
  }

  const onLogin = async (ev) => {
    ev.preventDefault();

    if(!canLogin()) {
      return setGlobalErrors('You must pass all validations in order to register');
    }

    const dataResponse = await service.create('auth/login/password', formData);

    console.log('dataResponse', dataResponse);

    if(dataResponse.status >= 400) {
      return setGlobalErrors('Invalid email or password');
    }

    navigate('/active/image');

    return dataResponse;
  }

  const {mutate: login} = useMutation({
    mutationFn: onLogin,
    onError: (err) => {
      console.log(err);
    }
  });

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
                  Sign In
                </h2>
                <div className="intro-x mt-2 text-slate-400 xl:hidden text-center">
                  A few more clicks to sign in to your account
                </div>
                <div className="intro-x mt-8">
                <FormInput placeholder={"Email"} name={"email"} type={"email"} onChange={onChange} onBlur={onBlur} error={errors.email}></FormInput>
                <FormInput placeholder={"Password"} name={"password"} type={"password"} onChange={onChange} onBlur={onBlur} error={errors.password}></FormInput>
                </div>
                <div className="intro-x flex text-slate-600 dark:text-slate-500 text-xs sm:text-sm mt-4">
                  <div className="flex items-center mr-auto">
                  </div>
                </div>
                <div className="intro-x mt-5 xl:mt-8 text-center xl:text-left flex align-bottom items-end">
                  <input type="button" value="Login" className="btn btn-outline-secondary py-3 px-4 w-full xl:w-32 mt-3 xl:mt-0 align-top" onClick={login} disabled={!canLogin()} />
                  <span className="mx-5 text-sm">Don't have an account? <NavLink to="/register" className="text-blue-600 underline">Sing Up Now !</NavLink></span>
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
