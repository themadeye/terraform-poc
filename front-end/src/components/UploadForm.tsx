import { useState } from 'react';
import '../App.css'
import axios from 'axios';
import reactLogo from '../assets/react.svg';

const FileUpload  = () => {
    const endpoint = 'https://n38wiq5pie.execute-api.us-east-1.amazonaws.com/dev'
    const [file, setFile] = useState<File | null>(null);

    const onFileChange = (event: any) => {
        setFile(event.target.files[0])
    }

    const onFileUpload = async() => {
        // Create an object of formData
        const formData = new FormData();

        // Update the formData object
        formData.append(
            "myFile",
            file!,
            file!.name
        );

        // Details of the uploaded file
        console.log(file);

        // Request made to the backend api
        const response = await axios.post(`${endpoint}/upload?name=${file!.name}`, formData);
        console.log("Uploading response: ", response);
    }

    return (
        <>
            <div>
                <a href="https://react.dev" target="_blank">
                    <img src={reactLogo} className="logo react" alt="React logo"/>
                </a>
            </div>
            <h1>Vite + React</h1>
            <h3>File Upload using React!</h3>
            <div>
                <input type="file" onChange={onFileChange}/>
                <button onClick={onFileUpload}>
                    Upload!
                </button>
            </div>
        </>
    )
}

export default FileUpload;