import Cookies from 'js-cookie'


const deleteCookie = (cookieName) => {
    console.log(Cookies.get())
    console.log(Cookies.get("accessToken"))
    console.log(Cookies.get("refreshToken"))
    Cookies.remove(cookieName, { path: '/' })
}

export default deleteCookie