import { useState } from "react";



export default function LikeButton()
{
    let[isLiked,setisLiked]=useState(false);
   
    let toggleLike = ()=>{
        setisLiked(!isLiked);
        
    };
    let likeStyle = {color:"red"}; 
    return(
        <div>
            <p onClick={toggleLike}>
                {isLiked ? (<i class="fa-solid fa-heart" style={likeStyle}></i>):(<i class="fa-regular fa-heart"></i>)}
                
                
            </p>
        </div>
    );
}