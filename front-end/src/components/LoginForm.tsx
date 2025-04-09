import { useState } from 'react';
import axios from 'axios';

const Login = () => {
    const [input, setInput] = useState({
        email: "",
        password: "",
        lastName: "",
        firstName: ""
    });

    const handleSubmitEvent = async (e: any) => {
        const header = {
            'Access-Control-Allow-Origin':'*',
            "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept",
            "Content-Type": "application/json"
        }
        e.preventDefault();
        if (input.email === "" || input.password === "" || input.lastName === "" || input.firstName === "") {
            //dispatch action from hooks
            alert('Please enter valid info!');
            return;
        }
        console.log("input: ", input);
        const url = `http://localhost:8081/api/users`;
        const response = await axios.post(url, input, {
            headers: header
        });

        console.log("Response: ", response);
        localStorage.setItem('user', response.data.token);
        return response.status;
    };

    const handleInput = (e: any) => {
        const { name, value } = e.target;
        setInput((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    return (
        <form onSubmit={handleSubmitEvent}>
            <div className="form_control">
                <label htmlFor="user-email">Email:</label>
                <input
                    type="email"
                    id="user-email"
                    name="email"
                    placeholder="example@yahoo.com"
                    aria-describedby="user-email"
                    aria-invalid="false"
                    onChange={handleInput}
                />
                <div id="user-email" className="sr-only">
                    Please enter a valid username. It must contain at least 6 characters.
                </div>
            </div>
            <div className="form_control">
                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    aria-describedby="user-password"
                    aria-invalid="false"
                    onChange={handleInput}
                />
                <div id="user-password" className="sr-only">
                    your password should be more than 6 character
                </div>
            </div>
            <div className="form_control">
                <label htmlFor="firstName">First name:</label>
                <input
                    type="firstName"
                    id="firstName"
                    name="firstName"
                    aria-describedby="user-firstname"
                    aria-invalid="false"
                    onChange={handleInput}
                />
            </div>
            <div className="form_control">
                <label htmlFor="lastName">Last name:</label>
                <input
                    type="lastName"
                    id="lastName"
                    name="lastName"
                    aria-describedby="user-lastname"
                    aria-invalid="false"
                    onChange={handleInput}
                />
            </div>
            <button className="btn-submit">Submit</button>
        </form>
    )
}

export default Login;