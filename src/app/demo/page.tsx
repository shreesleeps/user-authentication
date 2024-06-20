import React from "react";

export default function demo() {
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
            <form className="flex flex-col gap-2">
              <label id="code" className="w-full text-[14px] font-normal">Enter your verification code</label>
              <input
              className="w-full pr-12 outline-[#3D53DB] border-[1px] border-[#F5F5F7] rounded-[10px] px-5 pt-[14.5px] pb-[14.5px] "
                // value={code}
                id="code"
                name="code"
                // onChange={(e) => setCode(e.target.value)}
              />
              <button type="submit" className="w-full bg-[#3D53DB] rounded-[10px] py-[13px] text-[#FFFFFF] text-4 font-semibold items-center justify-center">Verify</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
