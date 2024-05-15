import { getUserdata } from "./Local-storage"

export const isAuthenticate = () => {
    return getUserdata() != null ? true : false;
}