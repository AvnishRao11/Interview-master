import { useContext } from "react";
import { AuthContext } from "../auth.context.jsx";
import { register, login, logout, refreshToken, getUser } from "../services/auth.api.js";
import { useEffect } from "react";

export const useAuth = () => {
    const { user, setUser, loading, setLoading } = useContext(AuthContext);


    const handleLogin = async ({ email, password }) => {

        setLoading(true);
        try {
            const data = await login({ email, password })
            setUser(data.user);
        }
        catch (error) {
            console.error("Login failed:", error);
        }
        finally {
            setLoading(false);
        }
    }
    const handleRegister = async ({ username, email, password }) => {
        setLoading(true);
        try {

            const data = await register({ username, email, password })
            setUser(data.user);
        }
        catch (error) {
            console.error("Registration failed:", error);
        } finally {

            setLoading(false);
        }
    }
    const handleLogout = async () => {
        setLoading(true);
        try {

            await logout();
            setUser(null);
        }
        catch (error) {
            console.error("Logout failed:", error);
        } finally {

            setLoading(false);
        }
    }
    useEffect(() => {
        const getAndSetUser = async () => {
            try {
                const data = await getUser();
                setUser(data.user);
            } catch (error) {
                setUser(null);
            } finally {
                setLoading(false);
            }
        }
        getAndSetUser();
    }, [])

    return { user, setUser, loading, setLoading, handleLogin, handleRegister, handleLogout };

}

