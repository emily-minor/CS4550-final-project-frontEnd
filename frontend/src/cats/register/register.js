import {useAuth} from "../../contexts/context";
import {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {API_URL, API_KEY} from "../homepage/homepage";

function Register() {
    const { register } = useAuth();
    const navigate = useNavigate();

    const [breeds, setBreeds] = useState([]);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [favBreeds, setFavBreeds] = useState(new Set());

    useEffect(() => {
        const fetchData = async () => {
            const breeds = await fetch(API_URL+'/breeds',
                {headers: {
                        'x-api-key': API_KEY
                    }})
            const json = await breeds.json();
            setBreeds(json);
        }
        fetchData()
            .catch(console.error);
    }, [])

    const submit = async () => {
        try {
            await register({username, password, phone, email, favBreeds: Array.from(favBreeds)});
            navigate("/");
        } catch (error) {
            console.log(error);
        }
    };
    return(
        <div>
            <h2>Register</h2>
            <div>
                <h6>Username:</h6>
                <input
                    placeholder="Username"
                    size="sm"
                    onChange={(e) => setUsername(e.target.value)}
                />
            </div>
            <br/>
            <div>
                <h6>Password:</h6>
                <input
                    placeholder="Password"
                    size="sm"
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <br/>
            <div>
                <h6>Phone Number:</h6>
                <input
                    placeholder="Phone"
                    size="sm"
                    onChange={(e) => setPhone(e.target.value)}
                />
            </div>
            <br/>
            <div>
                <h6>Email Address:</h6>
                <input
                    placeholder="Email"
                    size="sm"
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            <br/>
            <div>
                <h6>Select your favorite cat breeds:</h6>
                <ul>
                        {
                            breeds.map((breed, index) =>
                                <div key={index}>
                                    <input type="checkbox"
                                           id={breed.id}
                                           name={breed.name}
                                           onChange={() =>
                                           {
                                               if (favBreeds.has(breed.id)) {
                                                   favBreeds.delete(breed.id);
                                                   setFavBreeds(new Set(favBreeds))
                                               }
                                               else {
                                                   favBreeds.add(breed.id)
                                                   setFavBreeds(new Set(favBreeds))
                                               }

                                           }}
                                    />
                                    <label htmlFor={breed.name}>{breed.name}</label>
                                </div>
                            )}
                </ul>
            </div>
            <button onClick={() => submit()}>
                Register
            </button>
            <div>
                Already have an account? Login{" "}
                <Link to="/login">
                    <u>here</u>
                </Link>!
            </div>
        </div>
    )
}
export default Register;