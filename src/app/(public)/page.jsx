import {getProduct} from "@/lib/api";


export default async function ProductDetails({params}){


const product = await getProduct(params.slug);



return(

<div className="p-10">


<h1 className="text-4xl font-bold">
{product.name}
</h1>


<pre>
{JSON.stringify(product,null,2)}
</pre>


</div>

)

}