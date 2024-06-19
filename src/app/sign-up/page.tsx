"use client";
import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useSession, SignUp } from '@clerk/nextjs';
import { setActive } from '@clerk/nextjs';


function CustomSignUp() {
  const [fullName, setfullName] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");
  const [createHidePassword, setcreateHidePassword] = useState(true);
  const [confirmHidePassword, setconfirmHidePassword] = useState(true);

  const handleFullNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setfullName(event.target.value);
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setemail(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setpassword(event.target.value);
  };

  const handleConfirmPasswordChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setconfirmPassword(event.target.value);
  };

  const handleSignUp = async () => {
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const signUp = await SignUp.create({
        emailAddress: email,
        password,
      });

      if (signUp.status === 'pending') {
        alert("Verification email sent. Please check your inbox.");
      } else if (signUp.status === 'complete') {
        alert("Signup successful!");
      }
    } catch (error) {
      console.error("Signup error:", error);
      alert("Signup failed. Please try again.");
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div className="w-full max-w-[413px] ">
        <div className="w-full flex flex-col items-center ">
          <div className="w-full text-[40px] font-semibold ">
            Create an account
          </div>
          <div className=" w-full flex flex-col gap-4 pt-13 pt-10">
            <button className=" w-full hover:border-[#3D53DB] flex flex-row text-[14px] font-semibold border-[1px] border-[#F5F5F7] rounded-[10px] px-5 pt-4 pb-[13px] items-center justify-center gap-4">
              <div className="">
                <img
                  className="w-[19px] h-[19px] object-contain"
                  src="/signInUp/google.png"
                  alt="Sample Image"
                />
              </div>
              <div className="">Sign up with Google</div>
            </button>

            <button className="w-full hover:border-[#3D53DB] flex flex-row gap-2 text-[14px] font-semibold border-[1px] border-[#F5F5F7] rounded-[10px] px-5 pt-4 pb-[13px] items-center justify-center ">
              <div>
                <img
                  src="/signInUp/facebook.png"
                  className="w-[19px] h-[19px] object-contain"
                  alt="Sample Image"
                />
              </div>
              <div>Sign up with Facebook</div>
            </button>
          </div>
          <div className="w-full flex flex-row pt-4 gap-2 items-center justify-center">
            <div className="h-px bg-[#DFE1F3] border-[1px] flex-grow"></div>
            <div className="text-[14px] font-normal justify-center">
              or sign up with email
            </div>
            <div className="h-px bg-[#DFE1F3] border-[1px] flex-grow"></div>
          </div>

          <div className="w-full flex flex-col flex-grow gap-3 pt-4">
            <div className="w-full flex flex-col gap-4">
              <div className="w-full text-[14px] font-semibold">Full Name</div>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={fullName}
                onChange={handleFullNameChange}
                placeholder="Johnny Mobbin"
                className="w-full outline-[#3D53DB] border-[1px] border-[#F5F5F7] rounded-[10px] px-5 pt-[14.5px] pb-[14.5px] "
              />
            </div>
            <div className="w-full flex flex-col gap-4">
              <div className="w-full text-[14px] font-semibold">Email</div>
              <input
                type="text"
                id="email"
                name="email"
                value={email}
                onChange={handleEmailChange}
                placeholder="name@email.com"
                className="w-full outline-[#3D53DB] border-[1px] border-[#F5F5F7] rounded-[10px] px-5 pt-[14.5px] pb-[14.5px] "
              />
            </div>
            <div className="w-full flex flex-col gap-4">
              <div className="w-full text-[14px] font-semibold">Password</div>
              <span className="relative flex flex-row items-center">
                <input
                  type={createHidePassword ? "password" : "text"}
                  id="password"
                  name="password"
                  value={password}
                  onChange={handlePasswordChange}
                  placeholder="Create Password"
                  className="w-full pr-12 outline-[#3D53DB] border-[1px] border-[#F5F5F7] rounded-[10px] px-5 pt-[14.5px] pb-[14.5px] "
                />
                <button
                  onClick={() => {
                    setcreateHidePassword(!createHidePassword);
                  }}
                  className="absolute right-5"
                >
                  {createHidePassword ? (
                    <FaEyeSlash className="text-[16px] text-[#8E92BC]" />
                  ) : (
                    <FaEye className="text-[16px] text-[#8E92BC]" />
                  )}
                </button>
              </span>
              <span className="relative flex flex-row items-center">
                <input
                  type={confirmHidePassword ? "password" : "text"}
                  id="confirmPassword"
                  name="confirmPassword"
                  value={confirmPassword}
                  onChange={handleConfirmPasswordChange}
                  placeholder="Confirm Password"
                  className="w-full pr-12 outline-[#3D53DB] border-[1px] border-[#F5F5F7] rounded-[10px] px-5 pt-[14.5px] pb-[14.5px] "
                />
                <button
                  className="absolute right-5"
                  onClick={() => {
                    setconfirmHidePassword(!confirmHidePassword);
                  }}
                >
                  {confirmHidePassword ? (
                    <FaEyeSlash className="text-[16px] text-[#8E92BC]" />
                  ) : (
                    <FaEye className="text-[16px] text-[#8E92BC]" />
                  )}
                </button>
              </span>
            </div>

            <div className=" w-full flex flex-row items-center gap-3 pt-8">
              <input type="checkbox" className="w-6 h-6 accent-[#3D53DB]" />
              <div className="w-full text-[14px] font-normal text-[#54577A]">
                I've read and agree with the{" "}
                <span className="font-medium text-[#10197A]">
                  Terms and Conditions
                </span>{" "}
                and the
                <span className="font-medium text-[#10197A]">
                  {" "}
                  Privacy Policy.
                </span>
              </div>
            </div>
            <div className="w-full flex flex-row items-center gap-3 pt-3">
              <input type="checkbox" className="w-6 h-6 accent-[#3D53DB]" />
              <div className="w-full text-[14px] font-normal text-[#54577A]">
                Sign up to receive email notifications on our latest updates
              </div>
            </div>
            <div className="w-full flex flex-col pt-8">
              <button className="w-full bg-[#3D53DB] rounded-[10px] py-[13px] text-[#FFFFFF] text-4 font-semibold items-center justify-center">
                Get started
              </button>
            </div>
          </div>
          <div className="w-full flex flex-col pt-6">
            <div className=" w-full flex flex-row items-center justify-center gap-2">
              <div className="h-px bg-[#DFE1F3] border-[1px] flex-grow"></div>
              <div className="flex text-[14px] font-normal">
                Have an account already?
              </div>
              <div className="h-px bg-[#DFE1F3] border-[1px] flex-grow"></div>
            </div>

            <div className="w-full flex flex-col pt-4">
              <button className="w-full hover:border-[#3D53DB] bg-[#FFFFFF] border-[#C2C6E8] border-[1px] px-[163.5px] py-[13px] rounded-[10px] text-[#54577A] text-4 font-semibold">
                Log in
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );  
}

export default SignUp;
