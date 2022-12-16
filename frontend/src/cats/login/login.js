import {useAuth} from "../../contexts/context";
import {useState} from "react";
import {Link} from "react-router-dom";

function Login() {
    const { login } = useAuth();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    // const [error, setError] = useState(false);

    const submit = async () => {
        try {
            await login(username, password);
        } catch (error) {
            console.log(username, password);
            console.log(error);
        }
    };

    return(
        <div>
            <h2>Login</h2>
            <input
                placeholder="Username"
                size="sm"
                onChange={(e) => setUsername(e.target.value)}
            />
            <input
                placeholder="Password"
                size="sm"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={() => submit()}>
                Login
            </button>
            <div>
                Don't have an account? Register{" "}
                <Link to="/register">
                    <u>here</u>
                </Link>!
            </div>
        </div>
    )
}
export default Login