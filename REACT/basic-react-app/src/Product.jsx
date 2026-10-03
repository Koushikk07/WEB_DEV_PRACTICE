import "./Product.css"

function Product({title,price,feature})
{
    //const list = features.map((feature)=>{feature}</li>

    /* if(price>=30000){

        return (
        <div className="Product">
        <h3>{title}</h3>
        <h5>Price: {price }</h5>
        <h5>Discounted Price: {price*(90/100) }</h5>
        <p>{feature}</p> {/* {list} */
        /* <p>{features.a}</p> */
       /*  </div>
    );
    }else{
        return (
        <div className="Product">
        <h3>{title}</h3>
        <h5>Price: {price }</h5>
       
        <p>{feature}</p> {/* {list} */
        /* <p>{features.a}</p> */
        /* </div>
    );
    } */ 
   /*  console.log(); */

   let isDiscount = price>=30000 ? price*(90/100) : price;

   let styles = {backgroundColor:"grey"};
     return (
        <div className="Product" style={styles}>
        <h3 >{title}</h3>
        <h5>Price: {price }</h5>
        <h5>Discounted Price: {isDiscount }</h5>

        {/* {price>=30000? <p>"Discounted Price: {price*(90/100): null}"</p>} */}
        <p>{feature}</p> {/* {list} */}
        {/* <p>{features.a}</p> */}
         </div>
    );
}

export default Product;