import {useState} from "react";

export default function CommentForm()
{
    let [formData,setFormData]=useState({
        username:"",
        remarks:"",
        rating:5,
    });


    let handleInputChange = (event)=>{
        setFormData((currData)=>{
            return {...currData,[event.target.name]:event.target.val}
        })
    }

    let handleSubmit = (event)=>{
        console.log(formData);
        event.preventDefault();
        setFormData({
            username:"",
            remarks:"",
            rating:5,
        });
    }
    return(
        <div>
            <h2>Give a Comment</h2>
            <form action="" onSubmit={handleSubmit}>
                <label htmlFor="username">Username: </label>
                <input type="text" placeholder="username" value={formData.username} id="username" onChange={handleInputChange}/><br /><br />
                <label htmlFor="rating">Rating</label>
                <input type="number" placeholder="rating" min={1} max={5} value={formData.rating} id="rating" onChange={handleInputChange

                }/><br /><br />
                <label htmlFor="remarks">remarks</label>
                <input type="textarea" placeholder="remarks" value={formData.remarks} id="remarks" onChange={handleInputChange}/><br /><br />
                <button>Add Comment</button>
            </form>
        </div>
    );
}