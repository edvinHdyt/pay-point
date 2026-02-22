import { LoginCard, MainCard } from "../../Components/MainCard";
import { Link } from "react-router-dom";        

const ForgotPassword = () => {

    const getImageUrl = (name) => {
        return new URL(`../../assets/images/illustration/${name}`, import.meta.url).href;
    }

    return (
        <div className="flex md:flex-row flex-col h-[92vh] overflow-hidden w-full">
            <div className="w-[50%]  bg-primary hidden md:flex justify-center items-center">
                <img src={getImageUrl("forgot-pass-ill.svg")} alt="forgot-password-illustration" className="w-10/12 h-80"/>
            </div>
            <div className="md:w-[50%] h-screen lg:border-[0.8px] lg:border-gray-300 lg:shadow-md rounded-[2rem] z-20 flex justify-center items-center lg:bg-slate-100 bg-transparent">
                <LoginCard>
                    <div className="flex flex-col item-center justify-center items-center">
                        <h1 className="text-primary-text text-xl">Forgot Password</h1>
                        <p className="text-md text-tersier-text">Pelase confirm your email!</p>
                    </div>
                    <form action="" method="post" className="flex flex-col gap-3">
                        <div className="flex flex-col gap-2 justify-start">
                            <label htmlFor="email">Email</label>
                            <input type="email" id="email" className="w-full h-8 border-[0.8px] border-gray-300 rounded-md px-3 py-5 outline-primary" placeholder="Email"/>
                        </div>
                        <div className="flex justify-center items-center gap-3">
                            <Link to={'/auth'}>
                                <button type="button" className="flex bg-gray-500 text-white rounded-md p-2 items-center justify-center shadow-sm active:translate-y-[2px] transition duration-75">
                                    Back
                                </button> 
                            </Link>
                            <button type="button" className="flex bg-blue-500 text-white rounded-md p-2 items-center justify-center shadow-sm active:translate-y-[2px] transition duration-75">
                                Submit
                            </button>
                        </div>
                    </form>
                </LoginCard>
            </div>
        </div>
    )
}


export default ForgotPassword;