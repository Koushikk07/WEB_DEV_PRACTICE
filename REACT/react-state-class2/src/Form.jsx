import { useState } from "react";

export default function Form()
{

    let [formData,setFormData] = useState({
        fullName:"",
        userName:"",
        password:""

    });

    let handleInputChange = (event) =>{
        let fieldName = event.target.name;
        //fullname;
        let fieldValue = event.target.value;
         //value

        setFormData(
            (currData)=>{
                
                 ///computed property name.
                 return {...currData,[fieldName] : fieldValue};
            }
        );
    }

    let handleSubmit = (event)=>{
        event.preventDefault();
        console.log(formData);
        setFormData({
            fullName:"",
            userName:"",
            password:""
        });
    }
    /* let [fullName,setFullName] = useState("");
    let [userName,setUserName] = useState("");
    let [password,setPassword] = useState("");

    let handleNameChange = (event)=>{
        console.log(event.target.value);
        setFullName(event.target.value);
    }

    let handleUserNameChange = (event)=>{
        console.log(event.target.value);
        setUserName(event.target.value);
    }

    let handlePassword = (event)=>{
        console.log(event.target.value);
        setPassword(event.target.value);
    } */

    return(
        <form onSubmit={handleSubmit}>
            <label htmlFor="fullname">Full Name: </label>
            <input type="text" placeholder="Enter The Full Name " value={formData.fullName}  id="fullname" name="fullName" onChange={handleInputChange}/><br /><br />
            <label htmlFor="username">Username:</label>
            <input type="text" placeholder="Enter The Username: " value={formData.userName}   id="username" name="userName" onChange={handleInputChange}/><br /><br />
            <label htmlFor="password">Password: </label>
            <input type="password" placeholder="Enter The Password " value={formData.password}  id="password" name="password"  onChange={handleInputChange}/><br /><br /><br />
            <button>Submit</button>
        </form>
    );
}