import {
  Form,
  Link,
  json,
  redirect,
  useActionData,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithCredential,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../firebase";
import googleLogo from "../assets/googleLogo.png";
import { useGoogleLogin } from "@react-oauth/google";
import { useState } from "react";
import PageBackground from "./PageBackground";
import withPageBackground from "../hoc/withPageBackground";

const Login = () => {
  const [searchParams] = useSearchParams();
  // const [user, setUser] = useState();
  // const [profileInfo, setProfileInfo] = useState();
  const [googleLoginError, setGoogleLoginError] = useState("");
  // const navigate = useNavigate();
  const googleLogin = useGoogleLogin({
    onSuccess: (response) => {
      console.log(response);
      const accessToken = response.access_token;
      const credential = GoogleAuthProvider.credential(null, accessToken);
      signInWithCredential(auth, credential)
        .then((response) => {
          // navigate("/browse");
        })
        .catch((error) => {
          // Handle Errors here.
          const errorCode = error.code;
          const errorMessage = error.message;
          setGoogleLoginError(`${errorCode}: ${errorMessage}`);
        });
    },
    onError: (err) => setGoogleLoginError(err),
  });
  const { message: { errors, errorMsg } = {} } = useActionData() || {};
  const showLogin = searchParams.get("mode") === "login";
  const formTitle = showLogin ? "Sign In" : "Sign Up";

  // useEffect(() => {
  //   const fetchUserDetails = async () => {
  //     const response = await fetch(
  //       "https://www.googleapis.com/oauth2/v1/userinfo",
  //       {
  //         headers: {
  //           Authorization: `Bearer ${user.access_token}`,
  //           "Content-Type": "application/json",
  //         },
  //       }
  //     );
  //     const userInfo = await response.json();
  //     setProfileInfo(userInfo);
  //     navigate("/");
  //   };
  //   if (user) {
  //     fetchUserDetails();
  //   }
  // }, [user]);

  return (
    <div className="pt-24">
      <Form
        className="bg-black bg-opacity-80 rounded-md flex flex-col gap-10 m-auto max-w-md p-16 text-gray-400"
        method="post"
      >
        <h2 className="text-3xl text-white font-semibold">{formTitle}</h2>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <input
              className={`bg-gray-700 rounded-md p-3 ${
                errors?.email ? "border border-red-500" : ""
              }`}
              name="email"
              type="text"
              required
              placeholder="Email or phone number"
              defaultValue={"test@test.com"}
            />
            {errors?.email && <p className="text-red-500">{errors.email}</p>}
          </div>

          <div className="flex flex-col gap-1">
            <input
              className={`bg-gray-700 rounded-md p-3 ${
                errors?.password ? "border border-red-500" : ""
              }`}
              name="password"
              type="password"
              required
              placeholder="Password"
              defaultValue={"Netflix123#"}
            />
            {errors?.password && (
              <p className="text-red-500">{errors.password}</p>
            )}
          </div>

          {!showLogin && (
            <div className="flex flex-col gap-1">
              <input
                className={`bg-gray-700 rounded-md p-3 ${
                  errors?.cnfPassword ? "border border-red-500" : ""
                }`}
                name="cnfPassword"
                type="password"
                required
                placeholder="Confirm Password"
                defaultValue={"Netflix123#"}
              />
              {errors?.cnfPassword && (
                <p className="text-red-500">{errors.cnfPassword}</p>
              )}
            </div>
          )}
        </div>
        {errorMsg && <p className="text-red-500">{errorMsg}</p>}

        <button className="text-white bg-red-600 rounded-md p-3 font-semibold">
          {formTitle}
        </button>

        <div className="flex flex-col gap-2">
          {showLogin && (
            <p>
              <span>New to Netflix?</span>{" "}
              <Link className="text-white" to="?mode=signup">
                Sign up now.
              </Link>
            </p>
          )}
          {!showLogin && (
            <p>
              <span>Already registered?</span>{" "}
              <Link className="text-white" to="?mode=login">
                Sign in now.
              </Link>
            </p>
          )}
          <div className="flex flex-col gap-1">
            <h3>Sign in with:</h3>
            <button
              onClick={googleLogin}
              className="w-7 h-7 rounded-full overflow-hidden"
              type="button"
            >
              <img src={googleLogo} alt="Google Sign In" />
            </button>
            {googleLoginError && (
              <p className="text-red-500">{googleLoginError}</p>
            )}
          </div>
        </div>
      </Form>
    </div>
  );
};

const checkAuthDataValidity = (authData) => {
  const errors = {};
  if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(authData.email)) {
    errors["email"] = "Invalid Email";
  }
  if (
    !/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(
      authData.password
    )
  ) {
    errors["password"] = "Invalid Password";
  }
  if (
    authData.cnfPassword &&
    !(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(
        authData.cnfPassword
      ) && authData.password === authData.cnfPassword
    )
  ) {
    errors["cnfPassword"] = "Invalid or doesn't match with password";
  }
  return Object.keys(errors).length === 0 ? null : errors;
};

export const authAction = async ({ request }) => {
  const formData = await request.formData();
  const isLoginMode = new URL(request.url).searchParams.get("mode") === "login";

  const authData = {
    email: formData.get("email"),
    password: formData.get("password"),
  };
  if (!isLoginMode) {
    authData.cnfPassword = formData.get("cnfPassword");
  }

  const errors = checkAuthDataValidity(authData);
  if (errors) {
    return json({ message: { errors } }, { status: 422 });
  }

  const authApi = isLoginMode
    ? signInWithEmailAndPassword
    : createUserWithEmailAndPassword;

  try {
    await authApi(auth, authData.email, authData.password);
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    return json({ message: { errorMsg: `${errorCode}: ${errorMessage}` } });
  }

  return redirect("/browse");
};

export default withPageBackground(Login);
