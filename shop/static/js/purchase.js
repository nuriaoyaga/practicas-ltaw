function init(){
  cart =[]
  localStorage.setItem("cart", JSON.stringify(cart));
  cart = JSON.parse(localStorage.getItem('cart'));
  console.log(cart)
}

function addProduct(data1,data2,type,price){
  if (typeof(Storage) !== "undefined") {
    cart = JSON.parse(localStorage.getItem('cart'));
    cart.push([data1,data2,type,price])
    console.log(cart)
    localStorage.setItem("cart", JSON.stringify(cart));
  } else {
    console.log("Sorry, your browser does not support Web Storage...");
  }
}
