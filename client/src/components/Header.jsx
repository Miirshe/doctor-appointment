import { useEffect, useState } from "react";
import { MdClose, MdOutlineMonitorHeart } from "react-icons/md";
import { Link } from "react-router-dom";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { FaRegUser, FaUserMd } from "react-icons/fa";
import { CiMenuFries } from "react-icons/ci";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
const Header = () => {
    const [patientAuth, setPatientAuth] = useState(false);
    const patientToken = Cookies.get('patientToken');
    const userToken = Cookies.get('userToken');
    const doctorToken = Cookies.get('doctorToken');
    const [doctorAuth, setDoctorAuth] = useState(false);

    const [userAuth, setUserAuth] = useState(false);
    useEffect(() => {
        if (patientToken) {
            setPatientAuth(true);
        } else {
            setPatientAuth(false);
        }
    }, [])

    useEffect(() => {
        if (userToken) {
            setUserAuth(true);
        } else {
            setUserAuth(false);
        }
    }, [])


    useEffect(() => {
        if (doctorToken) {
            setDoctorAuth(true);
        } else {
            setDoctorAuth(false);
        }
    }, [])

    const [scrolling, setShowScrolling] = useState(false);
    useEffect(() => {
        const handleWindowScrolling = () => {
            if (window.scrollY > 0) {
                setShowScrolling(true);
            } else {
                setShowScrolling(false);
            }
        }
        window.addEventListener('scroll', handleWindowScrolling)
        return () => window.removeEventListener('scroll', handleWindowScrolling);
    }, [])
    const [message, setMessage] = useState(false);
    useEffect(() => {
        if (message) {
            toast.success('successfully logged out');
        }
    }, [message])
    const handlePatientLogout = () => {
        Cookies.remove('patientToken');
        setMessage(true);
        setTimeout(() => {
            setMessage(false);
            window.location.reload();
        }, 1000);
    }

    const [showMenu, setShowMenu] = useState(true);
    const [showRegisteLinks, setShowRegisteLinks] = useState(false);
    const RegisterLinks = (
        <div className="bg-[#F2F4F6] hidden lg:block z-20 lg:w-[20%] absolute right-0 top-14" onMouseLeave={() => setShowRegisteLinks(false)}>
            <div className="w-full flex flex-col justify-start items-start gap-5 shadow rounded-md px-3 py-5">
                <Link className="w-full flex flex-row justify-start items-start gap-3 
                p-2 hover:bg-slate-200 transition-all ease-in-out" to='doctor-login'>
                    <FaUserMd className="inline" size={20} /> <span>Doctor Login</span></Link>
                <hr className="w-full" />
                <Link className="w-full flex flex-row justify-start items-start gap-3 
                p-2 hover:bg-slate-200 transition-all ease-in-out" to='patient-login'>
                    <FaRegUser className="inline" size={20} /> <span>Patient Login</span></Link>
                <hr className="w-full" />
                <Link className="w-full flex flex-row justify-start items-start gap-3 
                p-2 hover:bg-slate-200 transition-all ease-in-out" to='user-login'>
                    <FaRegUser className="inline" size={20} /> <span>User Login</span></Link>
            </div>
        </div>
    )
    return (
        <div className={`w-full fixed left-0 top-0 right-0 z-20 p-4 bg-[#F2F4F6] ${scrolling && 'shadow bg-white transition-all ease-in-out'}`}>
            <div className="w-full md:w-[95%] lg:w-[90%] mx-auto p-1 relative">
                <div className="w-full flex flex-col lg:flex-row justify-between items-center gap-5">
                    <div className="w-full lg:w-[30%]">
                        <div className="w-full flex flex-row justify-start items-center gap-3 relative">
                            <MdOutlineMonitorHeart className=" text-blue-600" size={30} />
                            <p className="w-full text-xl"> <span>Medi</span> <span className="text-blue-600">Hub</span></p>
                            {
                                showMenu ? (<CiMenuFries onClick={() => setShowMenu(!showMenu)} className="block lg:hidden cursor-pointer absolute right-0 top-0" size={25} />)
                                    : (<MdClose onClick={() => setShowMenu(!showMenu)} className="block lg:hidden cursor-pointer absolute right-0 top-0" size={25} />)
                            }
                        </div>
                    </div>
                    <div className={`w-full lg:w-[70%] text-base font-light flex flex-col lg:flex-row justify-start items-start lg:justify-end lg:items-center gap-8
                    ${showMenu ? 'hidden lg:flex lg:flex-row' : 'block h-screen mt-10 lg:h-fit lg:mt-0'}`} onClick={() => setShowMenu(!showMenu)}>
                        <Link to='/' className="hover:text-blue-600 transition-all ease-in-out">Home</Link>
                        <Link to='/doctors-page' className="hover:text-blue-600 transition-all ease-in-out">Doctors</Link>
                        <Link to='/about' className="hover:text-blue-600 transition-all ease-in-out">About us</Link>
                        <Link to='/contact' className="hover:text-blue-600 transition-all ease-in-out">Contact us</Link>
                        {
                            (!patientAuth && !userAuth && !doctorAuth) && (
                                <>
                                    <div className="w-[20%] hidden lg:block">
                                        <button className="bg-blue-600 text-white px-5 py-2 rounded" onClick={() => setShowRegisteLinks(!showRegisteLinks)}>
                                            Login
                                            {
                                                showRegisteLinks ? (<IoIosArrowUp className="ml-2 inline" size={18} />) : (<IoIosArrowDown className="ml-2 inline" size={20} />)
                                            }
                                        </button>
                                        {
                                            showRegisteLinks && RegisterLinks
                                        }
                                    </div>
                                    <div className="w-full lg:hidden flex flex-col justify-start items-start gap-5">
                                        <Link className="w-full flex flex-row justify-start items-start gap-3 
                p-2 hover:text-blue-600 transition-all ease-in-out" to='doctor-login'>
                                            <FaUserMd className="inline" size={20} /> <span>Doctor Login</span></Link>
                                        <hr className="w-full" />
                                        <Link className="w-full flex flex-row justify-start items-start gap-3 
                p-2 hover:text-blue-600 transition-all ease-in-out" to='patient-login'>
                                            <FaRegUser className="inline" size={20} /> <span>Patient Login</span></Link>
                                        <Link className="w-full flex flex-row justify-start items-start gap-3 
                p-2 hover:bg-slate-200 transition-all ease-in-out" to='user-login'>
                                            <FaRegUser className="inline" size={20} /> <span>User Login</span></Link>
                                    </div>
                                </>
                            )
                        }
                        {
                            patientAuth && <>
                                <Link to='/patient-appointment' className="hover:text-blue-600 transition-all ease-in-out">Appointments</Link>
                                <button className="bg-blue-600 text-white px-5 py-2 rounded shadow" onClick={handlePatientLogout}>Logout</button>
                            </>
                        }
                        {
                            userAuth && <Link to='/dashboard' className="hover:text-blue-600 transition-all ease-in-out">
                                Dashboard
                            </Link>
                        }
                        {
                            doctorAuth && <Link to='/dashboard' className="hover:text-blue-600 transition-all ease-in-out">
                                Dashboard
                            </Link>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header