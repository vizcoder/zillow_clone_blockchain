import React, { useState, ChangeEvent, FormEvent } from "react";
import { FieldErrors, useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { DevTool } from "@hookform/devtools";

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

const SignIn = (props: Props) => {
  // const [formdata, setFormData] = useState<FormValues>({
  //   email: "",
  //   password: "",
  // });
  // const { email, password } = formdata;

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    mode: "onBlur",
  });

  // const onChange = (e: ChangeEvent<HTMLInputElement>) => {
  //   console.log(e.target.value);
  //   console.log(e.target.id);

  //   const { id, value } = e.target;
  //   setFormData((prevState) => ({
  //     ...prevState,
  //     [id]: value,
  //   }));
  // };
  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log(data);
    } catch (error) {
      setError("root", {
        message: "This email is already taken",
      });
    }
  };
  const onError = (errors: FieldErrors<FormValues>) => {
    console.log("Form errors", errors);
  };
  return (
    <div className="flex justify-center flex-wrap items-center px-6 py-12 max-w-6xl mx-auto">
      <div className="md:w-[67%] lg:w-[50%] mb-3 md:mb-6 ">
        <img src="https://images.unsplash.com/flagged/photo-1564767609342-620cb19b2357?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1373&q=80"></img>
      </div>
      <div className="w-full md:w-[67%] lg:w-[40%] lg:ml-20">
        <form onSubmit={handleSubmit(onSubmit, onError)} noValidate>
          <input
            className="w-full px-3 py-3 text-xl text-gray-700 bg-white border-gray-500 rounded-md transition ease-in-out "
            type="email"
            id="email"
            // value={email}
            // onChange={onChange}
            placeholder="Email Address"
            {...register("email")}
          />
          {errors.email && <span>{errors.email?.message}</span>}

          <div></div>
        </form>
        <DevTool control={control}></DevTool>
      </div>
    </div>
  );
};

export default SignIn;
