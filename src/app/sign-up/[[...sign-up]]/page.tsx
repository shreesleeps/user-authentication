'use client';

import * as React from 'react';
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useSignUp } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { OAuthStrategy } from '@clerk/types';
import { useSignIn } from '@clerk/nextjs';

export default function Page() {
  const { isLoaded, signUp, setActive } = useSignUp();
  const [emailAddress, setEmailAddress] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [verifying, setVerifying] = React.useState(false);
  const [code, setCode] = React.useState('');
  const router = useRouter();

  const [fullName, setfullName] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");
  const [createHidePassword, setcreateHidePassword] = useState(true);
  const [confirmHidePassword, setconfirmHidePassword] = useState(true);

// //oauth

// const { signIn } = useSignIn();

//   if (!signIn) return null;
// //   const signInWith = (strategy: OAuthStrategy) => {
// //     return signIn.authenticateWithRedirect({
// //       strategy,
// //       redirectUrl: '/sign-up/sso-callback',
// //       redirectUrlComplete: '/',
// //     });
// //   };

//   const signInWith = async (strategy: OAuthStrategy) => {
//     try {
//       await signIn.authenticateWithRedirect({
//         strategy,
//         redirectUrl: '/sign-up/sso-callback',
//         redirectUrlComplete: '/',
//       });
//     } catch (error: any) {
//       console.error('Authentication Error:', error);
//       if (error.response) {
//         // Log server-side error
//         console.error('Server Error:', error.response.data);
//       } else if (error.request) {
//         // Log network error
//         console.error('Network Error:', error.request);
//       } else {
//         // Log other errors
//         console.error('Error:', error.message);
//       }
//     }
//   };

//   //oauth

  const handleFullNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setfullName(event.target.value);
  };

//   const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setEmail (event.target.value);
//   };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setconfirmPassword(event.target.value);
  };

  // Handle submission of the sign-up form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isLoaded) return;

    // Start the sign-up process using the email and password provided
    try {
      await signUp.create({
        emailAddress,
        password,
      });

      // Send the user an email with the verification code
      await signUp.prepareEmailAddressVerification({
        strategy: 'email_code',
      });

      // Set 'verifying' true to display second form
      // and capture the OTP code
      setVerifying(true);
    } catch (err: any) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2));
    }
  };

  // Handle the submission of the verification form
  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isLoaded) return;

    try {
      // Use the code the user provided to attempt verification
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      });

      // If verification was completed, set the session to active
      // and redirect the user
      if (completeSignUp.status === 'complete') {
        await setActive({ session: completeSignUp.createdSessionId });
        router.push('/');
      } else {
        // If the status is not complete, check why. User may need to
        // complete further steps.
        console.error(JSON.stringify(completeSignUp, null, 2));
      }
    } catch (err: any) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error('Error:', JSON.stringify(err, null, 2));
    }
  };

  // Display the verification form to capture the OTP code
  if (verifying) {
    return (
      <>
      
      <div className="flex flex-col items-center">
        <div className="w-full max-w-[413px] ">
          <div className="w-full flex flex-col ">
            <div className="w-full text-[40px] font-semibold ">
              Create an account
            </div>
            <h1 className="w-full text-[15px] font-semibold pt-10">
              Verify your email
            </h1>
            <form onSubmit={handleVerify} className="flex flex-col gap-2">
              <label id="code" className="w-full text-[14px] font-normal">Enter your verification code</label>
              <input
              className="w-full pr-12 outline-[#3D53DB] border-[1px] border-[#F5F5F7] rounded-[10px] px-5 pt-[14.5px] pb-[14.5px] "
                value={code}
                id="code"
                name="code"
                 onChange={(e) => setCode(e.target.value)}
              />
              <button type="submit" className="w-full bg-[#3D53DB] rounded-[10px] py-[13px] text-[#FFFFFF] text-4 font-semibold items-center justify-center">Verify</button>
            </form>
          </div>
        </div>
      </div>

        {/* <h1>Verify your email</h1>
        <form onSubmit={handleVerify}>
          <label id="code">Enter your verification code</label>
          <input
            value={code}
            id="code"
            name="code"
            onChange={(e) => setCode(e.target.value)}
          />
          <button type="submit">Verify</button>
        </form> */}
      </>
    );
  }

  // Display the initial sign-up form to capture the email and password
  return (
    <>
     {/* <div>
      <button onClick={() => signInWith('oauth_google')}>
        Sign in with Google
      </button>
    </div> */}
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

          <form onSubmit={handleSubmit}>

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

              id="email"
            type="email"
            name="email"
            value={emailAddress}
            onChange={(e) => setEmailAddress(e.target.value)}
            
                
                
                
                // onChange={handleEmailChange}
                placeholder="name@email.com"
                className="w-full outline-[#3D53DB] border-[1px] border-[#F5F5F7] rounded-[10px] px-5 pt-[14.5px] pb-[14.5px] "
              />
            </div>
            <div className="w-full flex flex-col gap-4">
              <div className="w-full text-[14px] font-semibold">Password</div>
              <span className="relative flex flex-row items-center">
                <input
                onChange={(e) => setPassword(e.target.value)}
                id="password"
                name="password"
                // type="password"
                value={password}


                  type={createHidePassword ? "password" : "text"}
                //   onChange={handlePasswordChange}
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
              <button  onSubmit={handleSubmit} type="submit" className="w-full bg-[#3D53DB] rounded-[10px] py-[13px] text-[#FFFFFF] text-4 font-semibold items-center justify-center">
                Get started
              </button>
            </div>
          </div>
          </form>
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


      {/* <h1>Sign up</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Enter email address</label>
          <input
            id="email"
            type="email"
            name="email"
            value={emailAddress}
            onChange={(e) => setEmailAddress(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Enter password</label>
          <input
            id="password"
            // type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <button type="submit">Next</button>
        </div>
      </form> */}
    </>
  );
}