"use client";
import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import GoogleIcon from "../../../public/assest/GoogleIcon";
import TwitterIcon from "../../../public/assest/TwitterIcon";
import { Toaster, toast } from "react-hot-toast";
import config from "../../config";
// import { Hide, Show } from "../components/icon";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();

  const onSubmit = async (data) => {
    //! ilgili url'e register için istek yap dönen veriyi json'a çevir ve data değişkenine Aktar.
    try {
      const res = await fetch(`${config.API_BASE_URL}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const responseData = await res.json();

      if (responseData.error === false) {
        document.cookie = `accessToken=${responseData.bearer.accessToken}; path=/`;
        document.cookie = `refreshToken=${responseData.bearer.refreshToken}; path=/`;
        toast.success("Logged in successfully", {
          position: "top-left",
        });
        router.push("/");
      } else {
        toast.error("Invalid Credential", {
          position: "top-left",
        });
      }
    } catch (error) {
      toast.error("Something went wrong", {
        position: "top-left",
      });
      console.error(error);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <section className="py-10 h-[100vh]">
      <div className="px-6 h-full text-gray-800">
        <div className="flex xl:justify-center justify-center items-center flex-wrap h-full gap-4">
          <div className="hidden lg:flex  items-center shrink-1 mb-12 grow-0 basis-auto md:mb-0 md:w-4/12 md:shrink-0 lg:w-4/12 xl:w-4/12 bg-slate-100 h-full">
            <Image
              height={300}
              width={300}
              src="/assest/register-logo.png"
              className=" w-1/ bg-transparent shadow-sm mx-auto"
              alt="Sample image"
            />
          </div>

          <div className="xl:ml-10 xl:w-5/12 lg:w-5/12 md:w-8/12 mb-12 md:mb-0 max-w-sm">
            <div className="flex justify-end">
              <div className="w-9 h-9 rounded-full bg-slate-400"></div>
            </div>
            <div className="my-6">
              <h1 className="text-3xl font-bold">Create an account</h1>
              <p className="text-sm">
                Alrady have an account?{" "}
                <Link href="/login" className="cursor-pointer text-gray-700">
                  Log in
                </Link>
              </p>
            </div>
            <button
              className="flex justify-center items-center  border border-gray-500 text-gray-900 text-sm custom-input mt-[15px] rounded-[30px] w-full p-1 font-[600] cursor-pointer"
              type="button"
            >
              <GoogleIcon color="currentColor" className="mr-3" />
              Continue with Google
            </button>
            <button
              className="flex justify-center items-center  border border-gray-500 text-gray-900 text-sm custom-input  mt-[15px] rounded-[30px] w-full  p-1 font-[600] cursor-pointer"
              type="button"
            >
              <TwitterIcon color="currentColor" className="mr-3" />
              Continue with Google
            </button>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginTop: "2rem",
                marginBottom: "1rem",
              }}
            >
              <div
                style={{ borderBottom: "1px solid #ccc", width: "45%" }}
              ></div>
              <div style={{ padding: "0 10px" }}>or</div>
              <div
                style={{ borderBottom: "1px solid #ccc", width: "45%" }}
              ></div>
            </div>
            <form className="max-w-sm" onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-5">
                <label
                  htmlFor="username"
                  className="block mb-2 text-sm font-medium"
                >
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  {...register("username", { required: true })}
                  className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ${
                    errors.username ? "border-red-500" : ""
                  }`}
                  placeholder="rachel kawen"
                  required=""
                />
                {errors.username && (
                  <span className="text-red-500 text-sm">
                    Username is required
                  </span>
                )}
              </div>
              <div className="mb-5">
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  {...register("email", {
                    required: true,
                    pattern: /^\S+@\S+$/i,
                  })}
                  className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ${
                    errors.email ? "border-red-500" : ""
                  }`}
                  placeholder="rachel.kawen@gmail.com"
                  required=""
                  autoComplete="email"
                />
                {errors.email && (
                  <span className="text-red-500 text-sm">
                    Please enter a valid email address
                  </span>
                )}
              </div>
              <div className="relative">
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium"
                >
                  Password
                </label>
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  {...register("password", {
                    required: true,
                    pattern:
                      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/,
                  })}
                  className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ${
                    errors.password ? "border-red-500" : ""
                  }`}
                  required=""
                  name="password"
                  placeholder="******"
                />

                <button
                  type="button"
                  className="absolute inset-y-0 right-0 top-6 flex items-center pr-3 focus:outline-none"
                  onClick={togglePasswordVisibility}
                >
                  {!showPassword ? (
                    <svg
                      fill="#8b8989"
                      width="20px"
                      height="20px"
                      viewBox="0 -16 544 544"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <title>show</title>
                      <path d="M272 400Q205 400 151 361 96 322 64 256 96 190 151 151 205 112 272 112 336 112 392 153 448 193 480 256 448 319 392 360 336 400 272 400ZM272 352Q312 352 340 324 368 296 368 256 368 216 340 188 312 160 272 160 232 160 204 188 176 216 176 256 176 296 204 324 232 352 272 352ZM272 312Q249 312 233 296 216 279 216 256 216 233 233 217 249 200 272 200 295 200 312 217 328 233 328 256 328 279 312 296 295 312 272 312Z" />
                    </svg>
                  ) : (
                    <svg
                      fill="#8b8989"
                      width="20px"
                      height="20px"
                      viewBox="0 -16 544 544"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <title>hide</title>
                      <path d="M108 60L468 420 436 452 362 378Q321 400 272 400 208 400 154 361 99 322 64 256 79 229 102 202 124 174 144 160L76 92 108 60ZM368 256Q368 216 340 188 312 160 272 160L229 117Q254 112 272 112 337 112 392 152 446 192 480 256 474 269 461 288 448 307 434 322L368 256ZM272 352Q299 352 322 338L293 309Q283 312 272 312 249 312 233 296 216 279 216 256 216 247 220 236L190 206Q176 229 176 256 176 296 204 324 232 352 272 352Z" />
                    </svg>
                  )}
                </button>
                {errors.password && errors.password.type === "required" && (
                  <span className="text-red-500 text-sm">
                    Password is required
                  </span>
                )}
              </div>
              {errors.password && errors.password.type === "pattern" && (
                <span className="text-red-500 text-sm">
                  Password must contain at least one lowercase letter, one
                  uppercase letter, one number, and one special character
                  (@$!%*?&) and must be at least 8 characters long
                </span>
              )}
              <p className="text-sm my-5">
                By Creating an account, you agree to our{" "}
                <span
                  href="/register"
                  className="cursor-pointer text-gray-700 underline underline-offset-2"
                >
                  Term of use
                </span>{" "}
                and{" "}
                <span
                  href="/register"
                  className="cursor-pointer text-gray-700 underline underline-offset-2"
                >
                  Privacy Policy
                </span>
              </p>
              <button
                type="submit"
                className="text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-[2rem] text-sm w-full sm:w-[8rem] px-5 py-2.5 text-center "
              >
                Sign Up
              </button>
              <p className="text-sm mt-2">
                Alrady have an account?{" "}
                <Link href="/login" className="cursor-pointer text-gray-700">
                  Log in
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
      <Toaster toastOptions={{ duration: 3000 }} />
    </section>
  );
};

export default Register;
