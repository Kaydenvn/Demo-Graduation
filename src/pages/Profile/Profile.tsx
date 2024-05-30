import { Button } from "antd";
import React from "react";

export default function Profile() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <div className="border w-full  md:w-[60%]  flex border-gray-300 items-center rounded-lg p-4 flex-col justify-center gap-4  mt-8 mg:mt-10">
        <div className="w-full flex flex-col md:flex-row items-center gap-3">
          <div className="w-full py-2 border-b border-gray-300 flex items-center gap-2">
            <input
              type="text"
              required
              placeholder="Email"
              className="h-full w-full  bg-transparent pl-2 text-textColor outline-none border-none placeholder:text-gray-400"
            />
          </div>
        </div>
        <div className="w-full flex flex-col md:flex-row items-center gap-3">
          <div className="w-full py-2 border-b border-gray-300 flex items-center gap-2">
            <input
              type="password"
              required
              placeholder="Password"
              className="h-full w-full  bg-transparent pl-2 text-textColor outline-none border-none placeholder:text-gray-400"
            />
          </div>
        </div>
        <div className="w-full flex flex-col md:flex-row items-center gap-3">
          <div className="w-full py-2 border-b border-gray-300 flex items-center gap-2">
            <input
              type="new-password"
              required
              placeholder="New Password"
              className="h-full w-full  bg-transparent pl-2 text-textColor outline-none border-none placeholder:text-gray-400"
            />
          </div>
        </div>
        <div className="flex justify-center items-center w-full h-full">
          <label
            htmlFor="file-upload"
            className="flex flex-col justify-center items-center w-full h-full rounded-lg  cursor-pointer"
          >
            <div className="flex flex-col justify-center items-center pt-5 pb-6 gap-2">
              <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                <span className="font-semibold">Click here to upload</span>
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {" "}
                PNG, JPG or GIF (MAX. 800x400px)
              </p>
            </div>
            <input
              id="file-upload"
              name="uploadimage"
              type="file"
              accept="image/*"
              className="hidden"
            />
          </label>
        </div>
      </div>

      <div className=" mt-10 items-center justify-center">
        <Button>Submit</Button>
      </div>
    </div>
  );
}
