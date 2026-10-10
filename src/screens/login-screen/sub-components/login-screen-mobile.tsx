//import Link from "next/link";
//import { useGoogleLogin } from "@react-oauth/google";
import { useRouter } from "next/router";
import { SetStateAction, useContext, useState } from "react";

//import { loginGetOTP, loginGoogle } from "@/api";
import { loginGetOTP } from "@/api";
import { Button, InputText } from "@/components";
//import MobileNumberInput from "@/components/common/mobile-number-input";
import { NOTIFICATION_MESSAGES } from "@/config";
//import { useAuth } from "@/context/auth-context";
import LoaderContext from "@/context/loader-context";
import NotificationContext from "@/context/notification-context";
//import useIsOutsideIndia from "@/hooks/use-is-outside-india";
//import { CountryCode } from "@/interface/country-code";
import {
  //deleteRedirectionRoute,
  //getRedirectionRoute,
  setMobileNumber as setMobileNumberInStorage,
  setRedirectionRoute,
} from "@/local-storage";

const LoginScreenMobileInput: React.FC = ({}) => {
  const { showLoader, hideLoader } = useContext(LoaderContext);
  const { notifyErr } = useContext(NotificationContext);
  //const { notify, notifyErr } = useContext(NotificationContext);
  //const { login } = useAuth();
  //const isOutsideIndia = useIsOutsideIndia();

  const [loginType, setLoginType] = useState("");
  //const [email, setEmail] = useState("");
  //const [mobile, setMobileNumber] = useState<string>("");
  //const [countryCode, setCountryCode] = useState<CountryCode>(CountryCode.IND);
  const { push } = useRouter();

  // const onGoogleSuccess = async (code: string) => {
  //   showLoader();
  //   try {
  //     const res = await loginGoogle(code);
  //     const data = res?.data;
  //     if (!data?.token) throw new Error("No token from server");

  //     login(data.token, data.fname ?? "", data.mno ?? "");
  //     notify(NOTIFICATION_MESSAGES.LOGIN_SUCCESS);
  //     const redirectPath = data.fname
  //       ? getRedirectionRoute() || "/"
  //       : "/profile";
  //     deleteRedirectionRoute();
  //     push(redirectPath);
  //   } catch (err) {
  //     console.log("LoginScreenGoogle", err);
  //     notifyErr(NOTIFICATION_MESSAGES.LOGIN_FAIL);
  //   } finally {
  //     hideLoader();
  //   }
  // };

  // const googleSignIn = useGoogleLogin({
  //   flow: "auth-code",
  //   onSuccess: (r) => onGoogleSuccess(r.code),
  //   onError: () => notifyErr(NOTIFICATION_MESSAGES.LOGIN_FAIL),
  // });

  const onClickHandler = async () => {
    const value = loginType.trim();
    const isEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value);
    const isMobile = /^\d{10}$/.test(value);

    if (!isEmail && !isMobile) {
      notifyErr("Invalid E-mail or Mobile Number");
      return;
    }

    showLoader();
    try {
      setMobileNumberInStorage(value);
      const start = Date.now(); // ← start timer

      const res = await loginGetOTP(value);
      const end = Date.now();
      console.log("2. After API call, time taken:", end - start, "ms");

      //console.log("Sucess :", res.data.sucess);
      if (res?.data?.sucess) {
        push({ pathname: "/login/verify" });
      } else {
        setRedirectionRoute(window.location.pathname);
        push({ pathname: "/registration-form" });
      }
    } catch (err) {
      console.log("LoginScreenMobile", err);
      notifyErr(NOTIFICATION_MESSAGES.SOMETHING_WRONG);
    } finally {
      hideLoader();
    }
  };

  // const onClickHandler = async () => {
  //   showLoader();
  //   try {
  //     if (/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(loginType)) {
  //       setMobileNumberInStorage(loginType);
  //       // It's an email
  //       const res = await loginGetOTP(loginType);
  //       console.log("Message :", res.data.sucess);
  //       if (res.data.sucess) {
  //         push({ pathname: "/login/verify" });
  //       } else {
  //         setRedirectionRoute(window.location.pathname);
  //         push({ pathname: "/registration-form" });
  //       }
  //       //push({ pathname: "/login/verify" });
  //     } else if (/^\d+$/.test(loginType) && loginType.length === 10) {
  //       setMobileNumberInStorage(loginType);

  //       const res = await loginGetOTP(loginType);
  //       console.log("Sucess :", res.data.sucess);
  //       if (res.data.sucess) {
  //         push({ pathname: "/login/verify" });
  //       } else {
  //         setRedirectionRoute(window.location.pathname);
  //         push({ pathname: "/registration-form" });
  //       }
  //       //push({ pathname: "/login/verify" });
  //     } else {
  //       // Invalid input, display an error message
  //       notifyErr("Invalid E-mail or Mobile Number");
  //     }
  //     // Continue with the rest of your logic
  //   } catch (err) {
  //     console.log("LoginScreenMobile", err);
  //     notifyErr(NOTIFICATION_MESSAGES.SOMETHING_WRONG);
  //   }
  //   hideLoader();
  // };

  // const onClickHandler = async () => {
  //   showLoader();
  //   try {
  //     await loginGetOTP(mobile);
  //     setMobileNumberInStorage(mobile);
  //     push({ pathname: "/login/verify" });
  //   } catch (err) {
  //     console.log("LoginScreenMobile", err);
  //     notifyErr(NOTIFICATION_MESSAGES.SOMETHING_WRONG);
  //   }
  //   hideLoader();
  // };

  // const mobileNumberChangeHandler = (
  //   mobileNum: string,
  //   countryCode: CountryCode
  // ) => {
  //   setMobileNumber(mobileNum);
  //   setCountryCode(countryCode);
  // };
  return (
    <div className="w-full flex flex-col items-center p-6">
      <div className="w-full flex flex-col items-center justify-center">
        <h2 className="text-[23px] font-medium">
          {/* Login with E-Mail / Mobile Number */}Login
        </h2>
        <p className="mt-3 text-sm ">
          To experience the best Solitaires in India
        </p>
      </div>
      {/* <MobileNumberInput
        value={mobile}
        countryCode={countryCode}
        onChange={mobileNumberChangeHandler}
        className="mt-12 flex w-full gap-3 [&>div:nth-child(2)]:w-full [&>div>input]:w-full"
      /> */}
      <div className="w-full">
        <InputText
          type="text"
          placeholder="E-Mail / Mobile Number"
          value={loginType}
          //onBlur={}
          onChange={(e: { target: { value: SetStateAction<string> } }) =>
            setLoginType(e.target.value)
          }
          className="w-full mt-12"
        />
      </div>
      <Button
        onClick={onClickHandler}
        themeType="dark"
        classes="!mt-12 py-3 text-lg font-normal leading-6"
      >
        GET VERIFICATION CODE
      </Button>
      {/* {isOutsideIndia && (
        <>
          <div className="w-full flex items-center gap-4 mt-6">
            <div className="flex-1 border-t border-gray-300" />
            <span className="text-gray-500">OR</span>
            <div className="flex-1 border-t border-gray-300" />
          </div>
          <Button
            onClick={() => googleSignIn()}
            themeType="light"
            classes="!mt-6 py-3 text-base md:text-lg font-normal leading-6"
          >
            <span className="flex items-center justify-center gap-3">
              <svg
                width="20"
                height="20"
                viewBox="0 0 48 48"
                aria-hidden="true"
              >
                <path
                  fill="#EA4335"
                  d="M24 9.5c3.5 0 6.6 1.2 9.1 3.6l6.8-6.8C35.8 2.4 30.3 0 24 0 14.6 0 6.5 5.4 2.6 13.2l7.9 6.1C12.4 13.6 17.7 9.5 24 9.5z"
                />
                <path
                  fill="#4285F4"
                  d="M46.5 24.5c0-1.6-.1-3.1-.4-4.5H24v9h12.7c-.6 3-2.3 5.5-4.8 7.2l7.5 5.8c4.4-4.1 7.1-10.1 7.1-17.5z"
                />
                <path
                  fill="#FBBC05"
                  d="M10.5 28.7c-.5-1.5-.8-3-.8-4.7s.3-3.2.8-4.7l-7.9-6.1C.9 16.5 0 20.1 0 24s.9 7.5 2.6 10.8l7.9-6.1z"
                />
                <path
                  fill="#34A853"
                  d="M24 48c6.5 0 11.9-2.1 15.9-5.8l-7.5-5.8c-2.1 1.4-4.8 2.3-8.4 2.3-6.3 0-11.6-4.1-13.5-9.8l-7.9 6.1C6.5 42.6 14.6 48 24 48z"
                />
              </svg>
              CONTINUE WITH GOOGLE
            </span>
          </Button>
        </>
      )} */}

      {/* <div className="text-base md:text-lg font-normal leading-5 tracking-normal text-center py-8">
        <p className="text-gray-500">
          By Continuing I agree,{" "}
          <strong
            style={{
              fontWeight: "bolder",
              color: "black",
              textDecoration: "underline",
            }}
          >
            <Link href="/terms-and-condition" className="pinter">
              Terms & Conditions
            </Link>
          </strong>
        </p>
      </div> */}
    </div>
  );
};

export default LoginScreenMobileInput;
