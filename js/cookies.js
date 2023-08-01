function setCookie(name, value, expirationDate) {
    document.cookie = `${name}=${value}; expires=${expirationDate.toUTCString()}; path=/`;
  }

  function getCookie(name) {
    const cookieName = `${name}=`;
    const decodedCookie = decodeURIComponent(document.cookie);
    const cookieArray = decodedCookie.split(';');
  
    for (let i = 0; i < cookieArray.length; i++) {
      let cookie = cookieArray[i].trim();
      if (cookie.indexOf(cookieName) === 0) {
        return cookie.substring(cookieName.length, cookie.length);
      }
    }
    return null;
  }
  
  function cookieExists(name) {
    return getCookie(name) !== null;
  }
    function deleteCookie(name) {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`;
  }
  
  export { setCookie, getCookie, cookieExists, deleteCookie };