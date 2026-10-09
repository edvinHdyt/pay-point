
const getCookie = () => {
    const userLogin = localStorage.getItem(import.meta.env.VITE_KEY_USERLOGIN) == null ? null :  JSON.parse(localStorage.getItem(import.meta.env.VITE_KEY_USERLOGIN));
    const apiuri = import.meta.env.VITE_API_URL;

    return {userLogin, apiuri};
}


export default getCookie;