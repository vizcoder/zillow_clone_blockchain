import React, { useState, ChangeEvent, FormEvent } from "react";
import { FieldErrors, useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { DevTool } from "@hookform/devtools";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";
import OAuth from "../components/OAuth";

type Props = {};

const schema = z.object({
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email("Email format is not valid")
    .refine((value) => value !== "admin@example.com", {
      message: "Enter a different email address",
      // path: ["email"],
    })
    .refine((value) => !value.endsWith("baddomain.com"), {
      message: "This domain is not supported",
      // path: ["email"],
    }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" })
    .refine((value) => /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+/.test(value), {
      message: "Password must contain at least one special character",
    }),
});

type FormValues = z.infer<typeof schema>;
// console.log("FormValues", FormValues);

const SignIn = (props: Props) => {
  const [formdata, setFormData] = useState<FormValues>({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const { email, password } = formdata;

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
    console.log(e.target.id);

    const { id, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  return (
    <section>
      <h1 className="text-3xl text-center mt-6 font-bold">Sign In</h1>
      <div className="flex justify-center flex-wrap items-center px-6 py-12 max-w-6xl mx-auto">
        <div className="md:w-[67%] lg:w-[50%] mb-12 md:mb-6">
          <img
            src="https://images.unsplash.com/flagged/photo-1564767609342-620cb19b2357?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1373&q=80"
            alt="key"
            className="w-full rounded-2xl"
          />
        </div>
        <div className="w-full md:w-[67%] lg:w-[40%] lg:ml-20">
          <form className="w-full ">
            {/* border-2 border-solid border-red-500 */}
            <input
              type="email"
              id="email"
              value={email}
              onChange={onChange}
              placeholder="Email address"
              className="mb-6 w-full px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded transition ease-in-out "
              // border-2 border-solid border-blue-700
            />
            <div className="relative ">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={onChange}
                placeholder="Password"
                className="mb-6 w-full px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded transition ease-in-out "
                // border-2 border-solid border-blue-700
              />
              <div
                className="absolute right-3 top-4 "
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </div>
            </div>
            <div className="flex justify-between whitespace-nowrap text-sm sm:text-lg">
              <p className="mb-6">
                Don't have a account?
                <Link
                  to="/sign-up"
                  className="text-red-600 hover:text-red-700 transition duration-200 ease-in-out ml-1"
                >
                  Register
                </Link>
              </p>
              <p>
                <Link
                  to="/forgot-password"
                  className="text-blue-600 hover:text-blue-800 transition duration-200 ease-in-out"
                >
                  Forgot password?
                </Link>
              </p>
            </div>
            <button
              className="w-full bg-blue-600 text-white px-7 py-3 text-sm font-medium uppercase rounded shadow-md hover:bg-blue-700 transition duration-150 ease-in-out hover:shadow-lg active:bg-blue-800"
              type="submit"
            >
              Sign in
            </button>
            <div className="flex items-center  my-4 before:border-t before:flex-1 before:border-gray-300 after:border-t after:flex-1 after:border-gray-300">
              <p className="text-center font-semibold mx-4">OR</p>
            </div>
            <OAuth></OAuth>
          </form>
        </div>
      </div>
    </section>
  );

  // return (
  //   <div className="flex justify-center flex-wrap items-center px-6 py-12 max-w-6xl mx-auto">
  //     <div className="md:w-[67%] lg:w-[50%] mb-12 md:mb-6 ">
  //       <img src="https://images.unsplash.com/flagged/photo-1564767609342-620cb19b2357?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1373&q=80" className="w-full rounded-2xl"></img>
  //     </div>
  //     <div className="w-full md:w-[67%] lg:w-[40%] lg:ml-20">
  //       <form onSubmit={handleSubmit(onSubmit, onError)} noValidate>
  //         <input
  //           // className="w-full px-3 py-3 text-xl text-gray-700 bg-white border-gray-500 rounded-md transition ease-in-out "
  //           type="email"
  //           id="email"
  //           // value={email}
  //           // onChange={onChange}
  //           placeholder="Email Address"
  //           {...register("email")}
  //         />
  //         {errors.email && <span>{errors.email?.message}</span>}

  //         <div></div>
  //       </form>
  //       <DevTool control={control}></DevTool>
  //     </div>
  //   </div>
  // );
};

export default SignIn;
