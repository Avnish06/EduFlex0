import React, { useState } from 'react'
import logo from '../assets/logo.jpg'
// import google from '../assets/google.jpg'
import axios from 'axios'
import { serverUrl } from '../App'
import { MdOutlineRemoveRedEye } from "react-icons/md";

import { MdRemoveRedEye } from "react-icons/md";
import { useNavigate } from 'react-router-dom'
// import { signInWithPopup } from 'firebase/auth'
// import { auth, provider } from '../../utils/Firebase'
import { ClipLoader } from 'react-spinners'
import { toast } from 'react-toastify'
import { useDispatch } from 'react-redux'
import { setUserData } from '../redux/userSlice'
function SignUp() {
    const [name,setName]= useState("")
    const [email,setEmail]= useState("")
    const [password,setPassword]= useState("")
    const [role,setRole]= useState("student")
    const navigate = useNavigate()
    let [show,setShow] = useState(false)
    const [loading,setLoading]= useState(false)
    let dispatch = useDispatch()

    const handleSignUp = async () => {
        setLoading(true)
        try {
            const result = await axios.post(serverUrl + "/api/auth/signup" , {name , email , password , role} , {withCredentials:true} )
            dispatch(setUserData(result.data))

            navigate("/")
            toast.success("SignUp Successfully")
            setLoading(false)
        } 
        catch (error) {
            console.log(error)
            setLoading(false)
            toast.error("error while signing up")
        }
        
    }
    // const googleSignUp = async () => {
    //     try {
    //         const response = await signInWithPopup(auth,provider)
    //         console.log(response)
    //         let user = response.user
    //         let name = user.displayName;
    //         let email=user.email
            
            
    //         const result = await axios.post(serverUrl + "/api/auth/googlesignup" , {name , email ,role}
    //             , {withCredentials:true}
    //         )
    //         dispatch(setUserData(result.data))
    //         navigate("/")
    //         toast.success("SignUp Successfully")
    //     } catch (error) {
    //         console.log(error)
    //         toast.error(error.response.data.message)
    //     }
        
    // }
  return (
    <div className='min-h-screen w-full flex items-center justify-center relative overflow-hidden bg-[#0a0a0a] font-["Outfit"]'>
      {/* Dynamic Background Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-purple-600/20 blur-[120px] animate-pulse"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-blue-600/20 blur-[120px] animate-pulse delay-700"></div>
      
      <div className='relative z-10 w-full max-w-5xl px-4 flex items-center justify-center'>
        <form 
          className='w-full bg-white/5 backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.8)] rounded-3xl flex flex-col md:flex-row overflow-hidden transition-all duration-500 hover:shadow-purple-500/10' 
          onSubmit={(e)=>e.preventDefault()}
        >
            {/* Left Side: Form */}
            <div className='md:w-[55%] w-full p-8 md:p-12 flex flex-col gap-6'>
                <div className="space-y-2">
                    <h1 className='text-3xl md:text-4xl font-bold text-white tracking-tight'>Let's get Started</h1>
                    <p className='text-gray-400 text-lg'>Create your professional account</p>
                </div>

                <div className="flex flex-col gap-5 mt-4">
                    {/* Name Input */}
                    <div className='flex flex-col gap-2'>
                        <label htmlFor="name" className='text-sm font-medium text-gray-300 ml-1'>Full Name</label>
                        <input 
                            id='name' 
                            type="text" 
                            className='w-full bg-white/5 border border-white/10 rounded-xl h-12 px-4 text-white placeholder:text-gray-600 focus:outline-none focus:border-purple-500/50 focus:bg-white/10 transition-all'
                            placeholder='John Doe' 
                            onChange={(e)=>setName(e.target.value)} 
                            value={name} 
                        />
                    </div>

                    {/* Email Input */}
                    <div className='flex flex-col gap-2'>
                        <label htmlFor="email" className='text-sm font-medium text-gray-300 ml-1'>Email Address</label>
                        <input 
                            id='email' 
                            type="email" 
                            className='w-full bg-white/5 border border-white/10 rounded-xl h-12 px-4 text-white placeholder:text-gray-600 focus:outline-none focus:border-purple-500/50 focus:bg-white/10 transition-all'
                            placeholder='john@example.com' 
                            onChange={(e)=>setEmail(e.target.value)} 
                            value={email} 
                        />
                    </div>

                    {/* Password Input */}
                    <div className='flex flex-col gap-2 relative'>
                        <label htmlFor="password" university className='text-sm font-medium text-gray-300 ml-1'>Password</label>
                        <div className="relative">
                            <input 
                                id='password' 
                                type={show?"text":"password"} 
                                className='w-full bg-white/5 border border-white/10 rounded-xl h-12 px-4 text-white placeholder:text-gray-600 focus:outline-none focus:border-purple-500/50 focus:bg-white/10 transition-all' 
                                placeholder='••••••••' 
                                onChange={(e)=>setPassword(e.target.value)} 
                                value={password}
                            />
                            <div 
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white cursor-pointer transition-colors"
                                onClick={()=>setShow(prev => !prev)}
                            >
                                {show ? <MdRemoveRedEye size={20} /> : <MdOutlineRemoveRedEye size={20} />}
                            </div>
                        </div>
                    </div>

                    {/* Role Selection */}
                    <div className='flex items-center gap-3 p-1 bg-white/5 rounded-2xl border border-white/5 w-fit'>
                        <button 
                            type="button"
                            className={`px-6 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${role === 'student' ? "bg-white text-black shadow-lg" : "text-gray-400 hover:text-white"}`} 
                            onClick={()=>setRole("student")}
                        >
                            Student
                        </button>
                        <button 
                            type="button"
                            className={`px-6 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${role === 'educator' ? "bg-white text-black shadow-lg" : "text-gray-400 hover:text-white"}`}  
                            onClick={()=>setRole("educator")}
                        >
                            Educator
                        </button>
                    </div>
                </div>

                <button 
                    className='w-full h-12 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-xl mt-4 hover:opacity-90 active:scale-[0.98] transition-all flex items-center justify-center shadow-lg shadow-purple-500/20' 
                    disabled={loading} 
                    onClick={handleSignUp}
                >
                    {loading ? <ClipLoader size={24} color='white' /> : "Create Account"}
                </button>

                <div className='flex items-center gap-4 my-2'>
                    <div className='flex-1 h-[1px] bg-white/10'></div>
                    <span className='text-sm text-gray-500 font-medium whitespace-nowrap'>Or continue with</span>
                    <div className='flex-1 h-[1px] bg-white/10'></div>
                </div>

                <p className='text-gray-400 text-center text-sm'>
                    Already have an account? 
                    <button 
                        type="button"
                        className='ml-1 text-purple-400 font-semibold hover:text-purple-300 underline-offset-4 hover:underline transition-all' 
                        onClick={()=>navigate("/login")}
                    >
                        Login
                    </button>
                </p>
            </div>

            {/* Right Side: Visual/Logo */}
            <div className='hidden md:flex md:w-[45%] bg-gradient-to-br from-purple-700/20 to-blue-700/20 backdrop-blur-sm items-center justify-center flex-col p-12 relative overflow-hidden'>
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
                <div className="relative z-10 flex flex-col items-center">
                    <div className="w-40 h-40 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-md border border-white/20 mb-8 shadow-2xl animate-bounce-slow">
                        <img src={logo} className='w-24 rounded-2xl' alt="Logo" />
                    </div>
                    <h2 className='text-white text-3xl font-bold tracking-widest text-center'>VIRTUAL<br/>COURSES</h2>
                    <p className="text-gray-400 mt-4 text-center text-sm max-w-[200px]">Unlock your potential with our cutting-edge learning platform.</p>
                </div>
                
                {/* Decorative blobs */}
                <div className="absolute top-[-20%] right-[-20%] w-64 h-64 bg-purple-500/20 rounded-full blur-3xl"></div>
                <div className="absolute bottom-[-20%] left-[-20%] w-64 h-64 bg-blue-500/20 rounded-full blur-3xl"></div>
            </div>
        </form>
      </div>
      
      {/* Footer Branding */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-gray-600 text-[10px] uppercase tracking-[0.3em] pointer-events-none">
        Powered by EduFlex Platform
      </div>
    </div>
  )
}

export default SignUp
