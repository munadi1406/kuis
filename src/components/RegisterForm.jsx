import { useMutation } from '@tanstack/react-query'
import WithQuery from '../utils/WithQuery'
import { useState, useEffect } from 'react'
import axios from 'axios';

const RegisterForm = () => {
  const [data, setdata] = useState({})
  const [msg, setMsg] = useState("");
  const handleChange = (e) => {
    const name = e.target.name;
    setdata((prev) => ({
      ...prev, [name]: e.target.value
    }))
  }
  const mutation = useMutation({
    mutationFn: async (event) => {
      event.preventDefault()
      const regist = await axios.post(`api/auth/register`, data);
      return regist
    },
    onSuccess: () => {
      window.location.href = '/'
    },
    onError: (error) => {
      setMsg(error.response.data.message)
    }
  })

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center sm:py-12">
      <div className="p-10 xs:p-0 mx-auto md:w-full md:max-w-md">
        <h1 className="font-bold text-center text-2xl mb-5 font-poppins">
          KUIS SDNPU
        </h1>
        <div className="bg-white shadow w-full rounded-lg ">
          <div className="w-full flex justify-center items-center p-2">
            <h2 className="text-xl font-medium text-blue-500 font-poppins">
              Register
            </h2>
          </div>
          <div>
            <p className='text-xs font-poppins text-red-500 w-full text-center'>
              {msg}
            </p>
          </div>
          <form className="px-5 py-7" onSubmit={mutation.mutate} method='post'>
            <label className="text-sm text-gray-600 pb-1 block font-poppins">Email</label>
            <input
              type="text"
              name="email"
              onChange={handleChange}
              className="border font-poppins focus:outline-none rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
            />
            <label className="font-poppins text-sm text-gray-600 pb-1 block">Password</label>
            <input
              type="password"
              name="password"
              onChange={handleChange}
              className="border font-poppins focus:outline-none rounded-lg px-3 p-2 mt-1 mb-5 text-sm w-full"
            />
            <label className="font-poppins text-sm text-gray-600 pb-1 block">Konfirmasi Password</label>
            <input
              type="password"
              name="passwordConfirm"
              onChange={handleChange}
              placeholder="Silhkan Ketik Password Sekali Lagi"
              className="border font-poppins focus:outline-none rounded-lg px-3 p-2 mt-1 mb-5 text-sm w-full"
            />
            <div className="pb-2 flex items-end justify-end w-full">
              <a
                href="/"
                className="text-xs font-poppins text-blue-600 underline block">Sudah Punya Akun ?</a>
            </div>
            <button
              type="submit"
              className="transition duration-200 bg-blue-500 hover:bg-blue-600 focus:bg-blue-700 focus:shadow-sm focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 text-white w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-semibold text-center inline-block">
              <span className="inline-block mr-2">Register</span>

            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
export default WithQuery(RegisterForm)
