import DarkModeSwitcher from "@/components/dark-mode-switcher/Main";
import dom from "@left4code/tw-starter/dist/js/dom";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ErrorMessage } from "../../components/ErrorMessage/errorMessage";
import { SuccessfulOperation } from "../../components/SuccessfulOperation/SuccessfulOperation";
import useService from "../../service";

function Main() {
  useEffect(() => {
    dom("body").removeClass("main").removeClass("error-page").addClass("login");
  }, []);

  const navigate = useNavigate();
  const [errors, setErrors] = useState({
    email: null,
    password : null
  });
  const {service} = useService();

  const [globalErrors, setGlobalErrors] = useState(null);
  const [glabalSuccess, setglabalSuccess] = useState(null);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const onChange = (ev) => {
    ev.preventDefault();
    const value = ev.target.value;
    const field = ev.target.name;

    const newFormData = {
      ...formData,
      [field] : value
    }
    setFormData(old => newFormData);
  }

  const onLogin = async (ev) => {
    ev.preventDefault();

    const dataResponse = await service.create('auth/login/password', formData);

    console.log('dataResponse', dataResponse);

    if(dataResponse.status >= 400) {
      return setGlobalErrors('Invalid email or password');
    }

    navigate('/active/image');

    return dataResponse;
  }

  const onRegister = async (ev) => {
    ev.preventDefault();

    const registerResponse = await service.create('auth/register', formData);

    if(registerResponse.status >= 400) {
      return setGlobalErrors(registerResponse.data.message);
    }

    onLogin(ev);
    
    navigate('/active/image');
  }

  const {mutate: register} = useMutation({
    mutationFn: onRegister,
    onError: (err) => {
      console.log(err);
    }
  })

  const {mutate: login} = useMutation({
    mutationFn: onLogin,
    onError: (err) => {
      console.log(err);
    }
  });

  const validate = () => {
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

    const emailResult = emailRegex.test(formData.email);

    let newErrors = {
      ...errors,
    }

    if(!emailResult) {
      newErrors.email = 'Invalid email';
    } else {
      newErrors.email = null;
    }

    if(formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters long';
    } else {
      newErrors.password = null;
    }
    setErrors(newErrors);
  }


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
                  <input
                    type="text"
                    name="email"
                    className="intro-x login__input form-control py-3 px-4 block"
                    placeholder="Email"
                    onChange={onChange}
                    onBlur={validate}
                  />
                  {errors.email ? <p className="text-red-500 text-sm pt-2 pl-2">{errors.email}</p> : null}
                  <input
                    type="password"
                    name="password"
                    className="intro-x login__input form-control py-3 px-4 block mt-4"
                    placeholder="Password"
                    onBlur={validate}
                    onChange={onChange}
                  />
                  {errors.password ? <p className="text-red-500 text-sm pt-2 pl-2">{errors.password}</p> : null}
                </div>
                <div className="intro-x flex text-slate-600 dark:text-slate-500 text-xs sm:text-sm mt-4">
                  <div className="flex items-center mr-auto">
                  </div>
                </div>
                <div className="intro-x mt-5 xl:mt-8 text-center xl:text-left">
                  <button className="btn btn-primary py-3 px-4 w-full xl:w-32 xl:mr-3 align-top" onClick={login}>
                    Login
                  </button>
                  <button className="btn btn-outline-secondary py-3 px-4 w-full xl:w-32 mt-3 xl:mt-0 align-top" onClick={register}>
                    Register
                  </button>
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

export default Main;
