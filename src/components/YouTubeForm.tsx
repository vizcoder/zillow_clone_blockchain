import React, { useEffect } from "react";
import { FieldErrors, useForm, SubmitHandler } from "react-hook-form";
import { DevTool } from "@hookform/devtools";

import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
type Props = {};

const schema = z.object({
  username: z.string().min(1, { message: "Username is required" }),
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

  channel: z
    .string()
    .min(1, { message: "channel is required" })
    .refine((value) => value.length >= 8, {
      message: "channel must be at least 8 characters long",
    }),
  // .min(1, { message: "Channel is required" }),
});
// .refine((value) => value.email !== "admin@example.com", {
//   message: "Enter a different email address",
//   path: ["email"],
// })

type FormValues = z.infer<typeof schema>;

const YouTubeForm = (props: Props) => {
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

  // const onSubmit = (data: FormValues) => {
  //   console.log("Form Submitted", data);
  // };

  const onError = (errors: FieldErrors<FormValues>) => {
    console.log("Form errors", errors);
  };

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

  // // Log the errors object structure
  // useEffect(() => {
  //   console.log("Errors object:", errors);
  // }, [errors]);

  return (
    <div>
      <h1>YouTube Form</h1>

      <form onSubmit={handleSubmit(onSubmit, onError)} noValidate>
        <label htmlFor="username">Username</label>
        <input type="text" id="username" {...register("username")} />
        {errors.username && <span>{errors.username?.message}</span>}

        <label htmlFor="email">E-mail</label>
        <input type="email" id="email" {...register("email")} />
        {/* <span>{errors.email?.message}</span> */}
        {errors.email && <span>{errors.email?.message}</span>}

        <label htmlFor="channel">Channel</label>
        <input type="text" id="channel" {...register("channel")} />
        <span>{errors.channel?.message}</span>

        <button type="submit" disabled={isSubmitting}>
          Submit
        </button>
      </form>
      <DevTool control={control}></DevTool>
    </div>
  );
};

export default YouTubeForm;
