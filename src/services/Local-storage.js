export const storeId = (id) => {
    localStorage.setItem('idToken', id);
}

export const getUserdata = () => {
    return localStorage.getItem('idToken');
}

export const logoutUser = (id) => {
    localStorage.removeItem('idToken')
}