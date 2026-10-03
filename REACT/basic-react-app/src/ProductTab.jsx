import Product from "./Product.jsx";

function ProductTab()
{
    let options = [<li>hi-Tech</li>,<li>durable</li>,<li>Fast</li>];
    //let options2 = {a:"hi-tech",b:"durable",c:"fast"}  
    return(
        <>
        <Product title="phone" price={30000} feature={options}/>
        <Product title="Laptop"/>
        <Product title="pen"/>
        </>
    );
}

export default ProductTab;