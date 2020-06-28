import React, {useRef} from 'react'
import ReactDOM from 'react-dom'



class RemoveProduct extends React.Component{
    constructor(){
        super();
  

    }
    
    setDelete(id){
       console.log(id);
       fetch('http://localhost:8000/product/' + id,
       {
        method: 'DELETE',
        mode: 'cors'

      }
       )
    .then(result => result.json())
     .then((result) => {
        console.log(result);
    })
    }
    
}

class RemoveOrder extends React.Component{
    constructor(){
        super();
  

    }
    
    setDelete(id){
       console.log(id);
       fetch('http://localhost:8000/orders/' + id,
       {
        method: 'DELETE',
        mode: 'cors'

      }
       )
    .then(result => result.json())
     .then((result) => {
        console.log(result);
    })
    }
    
}



class Products extends React.Component{
    constructor(){
        super();
        this.textInput = null;
        this.setNameInputRef = element => {
          this.NameInput = element; //Name input values
        };
        this.setPriceInputRef = element => {
            this.PriceInput = element; // Price input values
          };
          this.setUrlInputRef = element => {
            this.UrlInput = element; // URL input values
          };
    
        this.state = {
            productsInfo: "",
            selectedArr : [],
            ProductArrLen : 0,
            pages: [],
            currentPage: [],
            currentLimit: [],
            AddForm: "",
            HeaderText: "",
            Orders: []

        };
        
    }

focusTextInput = () => {
        var name = this.NameInput.value;
        var price = this.PriceInput.value;
        var url = this.UrlInput.value;
    
        fetch('http://localhost:8000/product/insert/?product_name=' + name + '&product_url=' + url + '&product_price=' + price)
        .then(result => result.json())
         .then((result) => {
              console.log(result);
        })
        this.updateProduct(this.state.currentPage,this.state.currentLimit) 
        
    
}

updateProduct = (page,limit) =>{
    if (page  >= 1){
        this.setState({HeaderText: "Products Inventory"})
    }

    this.setState({currentLimit: limit})
    this.setState({currentPage: page})
    fetch("http://localhost:8000/product/page/?page=" +page+ "&limit=" +limit )
    .then(result => result.json())
     .then((result) => {
          this.setState({productsInfo: result});
         this.setState({ProductArrLen: this.state.productsInfo.docs.length})
         this.intPageNum(this.state.productsInfo.totalPages)
       // console.log(this.state.ArrLen)
    })
    
}

intPageNum=(pageNum)=>{
    var pageIndex = 0
    console.log("before: " + this.state.pages)
    for (var index = 0; index < pageNum; index++)
    {
        var checkArr = this.state.pages.includes(pageIndex++)
        //console.log(checkArr)
        this.setState({pages: this.state.pages.concat(pageIndex)})
        var cleanPageArray = Array.from(new Set(this.state.pages)); 
        this.setState({pages: cleanPageArray})
    }

}

setPageNum=(page)=>{
console.log(page.target.id)
this.updateProduct(page.target.id,6)
}



  componentDidMount() { //Once update
    this.updateProduct(1,6)
  }



showRemoveButton=(id)=>{
new RemoveProduct().setDelete(id.target.id)
this.updateProduct(this.state.currentPage,this.state.currentLimit) 
this.updateProduct(this.state.currentPage,this.state.currentLimit) //Double call for accurate update
}

//Remove order function
removeOrder=(id)=>{
    new RemoveOrder().setDelete(id.target.id)
    this.showOrders()
    this.showOrders()//Double call for accurate update
}

setAddForm=()=>{
this.setState({AddForm: <div className="form">
<form>
    <h6 className="exitform" onClick={this.removeAddForm}>X</h6>
<h1> Product details</h1>
    <p>Name:</p>
    <input type="text" ref={this.setNameInputRef} ></input>
    <p>Price:</p>
    <input type="text"  ref={this.setPriceInputRef} ></input>
   <p> Image URL: </p>
    <input type="text" ref={this.setUrlInputRef}></input> 
    <h4 className="product-add" onClick={this.focusTextInput}> SUBMIT </h4>
</form>
</div>
})

}

removeAddForm=()=>{
    this.setState({AddForm: ""})
}

showOrders=()=>{ //Manage  orders
    this.setState({HeaderText: "Manage Orders"})
    this.updateProduct(0)
    fetch("http://localhost:8000/orders" )
   .then(result => result.json())
    .then((result) => {
    const len = result.length
            for (var range = 0; range < len; range++){
            
            this.setState({Orders: result})
            
            }
    
  })
}
showallProducts=()=>{
    this.setState({HeaderText: "Products Inventory"})
    this.updateProduct(1,6)
    this.setState({Orders: ""})
}

addToCart=(id)=>{ // save to cart
console.log(id.target.id) 
fetch("http://localhost:8000/orders/save/?id=" + id.target.id )
    .then(result => result.json())
     .then((result) => {
         
       
    })
}




    render(){
        var OrderItems = []
        var pageItems = []
        var productsItems = []
        for(var range = 0; range < this.state.ProductArrLen; range++){

   
           try{
           productsItems.push(<li key={range}> 
            
            <div>
            <img className="product"  src={this.state.productsInfo.docs[range].product_url}/>

            <img src="/images/trash.png" className="delete" id={this.state.productsInfo.docs[range]._id} onClick={this.showRemoveButton}/>

            <img src="/images/edit.png" className="edit" />
            <p className="name"> {this.state.productsInfo.docs[range].product_name} </p> 
            </div>
            <p className="price"> {this.state.productsInfo.docs[range].product_price} php </p> 
            <p id={this.state.productsInfo.docs[range]._id} onClick={this.addToCart}> Add to cart</p>
        
            </li>
            )
           }
           catch(error){
               console.log(error)
           }
        
        }

        for (var pageIndex = 0; pageIndex < this.state.pages.length; pageIndex++){
            pageItems.push(
                    <p id={this.state.pages[pageIndex]} onClick={this.setPageNum}> {this.state.pages[pageIndex]}</p>
                
            )
        }
        for (var OrdersIndex = 0; OrdersIndex < this.state.Orders.length; OrdersIndex++){

            //Remove order
            OrderItems.push(
                <li className="items">
                    <img src={this.state.Orders[OrdersIndex].product_url}></img>
                    <p>{this.state.Orders[OrdersIndex].product_name}</p>
                    <p>{this.state.Orders[OrdersIndex].product_price}php</p>
                    <p className="remove" onClick={this.removeOrder} id={this.state.Orders[OrdersIndex]._id}> REMOVE</p>
                </li>
            )
        }
        //console.log(pageItems)
    return(
        
        <div className="main-content">
            <div className="products">
            <header>{this.state.HeaderText}</header>
            <div className="sidebar">
            <p onClick={this.setAddForm} >Add Product</p>
            <p onClick={this.showallProducts}>All Products</p>
            <p>Categories</p>
            <p onClick={this.showOrders}>Orders</p>
            </div>
            {this.state.AddForm}
            
            <ul>{productsItems}</ul>
            <ul className="orders">{OrderItems}</ul>
            <div className="pagenum">
            <h4>Page:</h4>
            {pageItems}
            </div>
            
            
            </div>
            
        </div>

    )
}
}

export default Products;