import { useState } from 'react';

const Login = () => {
    const [input, setInput] = useState({
        email: "",
        password: "",
        lastname: "",
        firstname: ""
    });

    const handleSubmitEvent = (e: any) => {
        e.preventDefault();
        if (input.email !== "" && input.password !== "") {
            //dispatch action from hooks
        }
        console.log("Input: ", input);
        alert("please provide a valid input");
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
                <label htmlFor="firstname">First name:</label>
                <input
                    type="firstname"
                    id="firstname"
                    name="firstname"
                    aria-describedby="user-firstname"
                    aria-invalid="false"
                    onChange={handleInput}
                />
            </div>
            <div className="form_control">
                <label htmlFor="lastname">Last name:</label>
                <input
                    type="lastname"
                    id="lastname"
                    name="lastname"
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