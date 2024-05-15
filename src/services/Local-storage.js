export const storeId = (id) => {
    localStorage.setItem('idToken', id);
}

export const getUserdata = () => {
    return localStorage.getItem('idToken');
}