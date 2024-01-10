document.querySelector("button").addEventListener("click", getFetch)


function getFetch(){



 const barcode = document.querySelector("input").value

 if(barcode.length !==12){
    alert(`Barcode must be 12 characters!`)
    return;
 }

const url = `https://world.openfoodfacts.org/api/v2/product/${barcode}.json`


fetch(url)
.then(response => response.json())
.then(data => {
    console.log(data)
    if(data.status === 1){
        const item = new ProductInfo(data.product)
        item.testCall()

    } else if(data.status === 0){
        alert(`Product ${barcode} not found. Please try another!`)
    }
})
.catch(err => {
    console.log(`error ${err}`)
})



}

class ProductInfo{
    constructor(productData){ //productData is actually data.product
        this.name = productData.product_name
        this.ingredients = productData.ingredients
        this.image = productData.image_url

    }
    testCall(){
        console.log(this.ingredients)
}



}
