import TitlePage from "../Components/TitlePage";
import { MainCard } from "../Components/MainCard";
import { BtnPrimary, BtnSecondary } from "../Components/Button";
import { Link } from "react-router-dom";
import { useOutletContext } from "react-router-dom";

const Profile = () => {
    const outlineContext = useOutletContext();

    const changeProfile = () => {
        const inputFile = document.getElementById("profilePictInpt");
        const imgElm = document.getElementById("profilePictImg");
        const iconElm = document.getElementById("profileIcon");
        const iconElmNav = document.getElementById("profileIconNav");
        const imgElmNav = document.getElementById("profilePictNav");

        inputFile.click();
            
        inputFile.addEventListener("change", () => {
            const [file] = inputFile.files;

            if (file){
                const fileURL = URL.createObjectURL(file);
                imgElm.src = fileURL;
                imgElmNav.src = fileURL;

                iconElm.classList.add("hidden");
                iconElmNav.classList.add("hidden");

                imgElm.classList.remove("hidden");
                imgElmNav.classList.remove("hidden");
                
                
            }
        })
    }

    console.log(outlineContext);
    return (
        <>
            <TitlePage title={"Profile"}/>

            <MainCard>
                    <Link to={"/Dashboard"} className="text-primary-text mb-3">{"< Kembali"}</Link>
                <div className="flex flex-wrap md:flex-nowrap gap-4 w-full justify-center md:justify-normal mt-3">
                    <div className="w-60 h-52 bg-slate-400 rounded-md cursor-pointer flex justify-center items-center relative" onClick={changeProfile}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewBox="0 0 24 24" id="profileIcon"><path fill="currentColor" d="M9.175 10.825Q8 9.65 8 8t1.175-2.825T12 4t2.825 1.175T16 8t-1.175 2.825T12 12t-2.825-1.175M4 20v-2.8q0-.85.438-1.562T5.6 14.55q1.55-.775 3.15-1.162T12 13t3.25.388t3.15 1.162q.725.375 1.163 1.088T20 17.2V20z"/></svg>

                        <img src={"..."} alt="profile-pict" className="w-full h-full rounded-md hidden" id="profilePictImg"/>

                        <div className="absolute bottom-2 right-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M5 21q-.825 0-1.412-.587T3 19V5q0-.825.588-1.412T5 3h8.925l-2 2H5v14h14v-6.95l2-2V19q0 .825-.587 1.413T19 21zm4-6v-4.25l9.175-9.175q.3-.3.675-.45t.75-.15q.4 0 .763.15t.662.45L22.425 3q.275.3.425.663T23 4.4t-.137.738t-.438.662L13.25 15zM21.025 4.4l-1.4-1.4zM11 13h1.4l5.8-5.8l-.7-.7l-.725-.7L11 11.575zm6.5-6.5l-.725-.7zl.7.7z"/></svg>
                        </div>
                    </div>
                    <form action="" method="post" className="flex flex-col gap-3 w-full">
                        <div className="flex flex-col gap-1">
                            <label htmlFor="name">Username</label>
                            <input type="text" id="name" className="w-full h-8 border-[0.8px] border-gray-300 rounded-md px-3 py-5 outline-primary" placeholder="Username"/>
                        </div>
                        <div className="flex flex-col gap-1">
                            <label htmlFor="email">Email</label>
                            <input type="text" id="email" className="w-full h-8 border-[0.8px] border-gray-300 rounded-md px-3 py-5 outline-primary" placeholder="Email"/>
                        </div>
                        <div className="flex gap-2 justify-end">
                             <button className="flex bg-primary text-white rounded-md p-2 items-center justify-center shadow-sm active:translate-y-[2px] transition duration-75" type="button" onClick={outlineContext.openConfEmailModal}>
                                Change Password
                            </button>
                            <button className="flex bg-blue-500 text-white rounded-md p-2 items-center justify-center shadow-sm active:translate-y-[2px] transition duration-75" type="button">
                               Save
                            </button>
                        </div>
                    </form>
                </div>
            </MainCard>


            <input type="file" className="hidden" name="profilePictInpt" id="profilePictInpt"/>
        </>
    )
}


export default Profile;