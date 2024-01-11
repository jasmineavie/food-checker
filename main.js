document.querySelector("button").addEventListener("click", getFetch)


function getFetch(){



 const barcode = document.querySelector("input").value

 if(barcode.length < 12){
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

        item.showInfo()
        item.listIngredients()


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
    //testCall(){
     //   console.log(this.ingredients)
   // }


showInfo(){
    document.getElementById("product-img").src = this.image
    document.getElementById("product-name").innerText = this.name

}

listIngredients(){
    let tableRef = document.getElementById("ingredient-table")

    for(let i = 1; i < tableRef.rows.length;){
        tableRef.deleteRow(i);
    }

    if(!(this.ingredients == null)) {


    for(let key in this.ingredients){
        let newRow = tableRef.insertRow(-1)
        let newCell1 = newRow.insertCell(0)
        let newCell2 = newRow.insertCell(1)
        let newIngText = document.createTextNode(
            this.ingredients[key].text
        )
        let vegStatus = !(this.ingredients[key].vegetarian) ? "unknown" : this.ingredients[key].vegetarian
        let newVtext = document.createTextNode(vegStatus)
        newCell1.appendChild(newIngText)
        newCell2.appendChild(newVtext)

    }
}
}

}
