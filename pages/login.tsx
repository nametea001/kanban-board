import React, { useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import { signIn } from "next-auth/react";

export default function Login() {
  const router = useRouter();
  const [formDataLogin, setFormDataLogin] = useState({
    username: "",
    password: "",
  });
  const [isLogin, setIsLogin] = useState<Boolean>(true);

  function LoginInput(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setFormDataLogin({
      ...formDataLogin,
      [name]: value,
    });
  }

  async function LoginSubmit(e: any) {
    e.preventDefault();
    const res: any = await signIn("credentials", {
      redirect: false,
      username: formDataLogin.username,
      password: formDataLogin.password,
    });
    if (res.ok && !res.error) {
      // login success
      router.push("/");
    } else {
      const modal: any = document.getElementById("login_fail_modal");
      modal?.showModal?.(); // Use optional chaining
    }
  }

  return (
    <>
      <Head>
        <title>Login </title>
      </Head>
      <div className="min-h-screen flex items-center justify-center bg-dark">
        <div className="bg-white p-8 shadow-lg rounded-lg w-96">
          {/* <h2 className="text-3xl font-semibold mb-4 text-black flex items-center justify-center">
          Login
        </h2> */}
          <div className="grid grid-cols-2 gap-2 place-content-center mb-5">
            <button
              // type="reset"
              onClick={() => {
                setIsLogin(true);
              }}
              className={`btn btn-outline btn-primary text-white w-full rounded-md ${
                isLogin == true ? "btn-active" : ""
              }`}
            >
              Log In
            </button>
            <button
              onClick={() => {
                setIsLogin(false);
              }}
              className={`btn btn-outline btn-primary text-white w-full rounded-md ${
                isLogin == false ? "btn-active" : ""
              }`}
            >
              Registor
            </button>
          </div>
          {isLogin == true ? (
            <form onSubmit={LoginSubmit}>
              <div className="mb-4">
                <label className="text-gray-600">Username</label>
                <input
                  type="text"
                  className="w-full p-2 border rounded-md mt-2 bg-white text-black"
                  placeholder="Username"
                  name="username"
                  value={formDataLogin.username}
                  onChange={LoginInput}
                />
              </div>
              <div className="mb-4">
                <label className="text-gray-600">Password</label>
                <input
                  type="password"
                  className="w-full p-2 border rounded-md mt-2 bg-white text-black"
                  placeholder="Password"
                  name="password"
                  value={formDataLogin.password}
                  onChange={LoginInput}
                />
              </div>
              <button
                type="submit"
                // onClick={() => {
                //
                // }}
                // className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-md w-full mt-4"
                className="btn bg-blue-500 hover:bg-blue-600 text-white w-full mt-4 rounded-md"
              >
                Log In
              </button>
            </form>
          ) : (
            <form>
              <div className="mb-4">
                <label className="text-gray-600">Username</label>
                <input
                  type="text"
                  className="w-full p-2 border rounded-md mt-2 bg-white text-black"
                  placeholder="Username"
                />
              </div>
              <div className="mb-4">
                <label className="text-gray-600">Password</label>
                <input
                  type="password"
                  className="w-full p-2 border rounded-md mt-2 bg-white text-black"
                  placeholder="Password"
                />
              </div>
              <div className="mb-4">
                <label className="text-gray-600">Confirm password</label>
                <input
                  type="password"
                  className="w-full p-2 border rounded-md mt-2 bg-white text-black"
                  placeholder="Confirm password"
                />
              </div>
              <div className="mb-4">
                <label className="text-gray-600">First name</label>
                <input
                  type="text"
                  className="w-full p-2 border rounded-md mt-2 bg-white text-black"
                  placeholder="First name"
                />
              </div>
              <div className="mb-4">
                <label className="text-gray-600">Last name</label>
                <input
                  type="text"
                  className="w-full p-2 border rounded-md mt-2 bg-white text-black"
                  placeholder="First name"
                />
              </div>
              <button
                // className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-md w-full mt-4"
                className="btn btn-success text-white w-full mt-4 rounded-md"
              >
                Registor
              </button>
            </form>
          )}
        </div>
      </div>

      {/* modal login fail */}
      <dialog id="login_fail_modal" className="modal">
        <div className="modal-box bg-gray">
          <h3 className="font-bold text-lg">Error</h3>
          <p className="py-4 text-red-500">Login fail</p>
        </div>
      </dialog>
    </>
  );
}
