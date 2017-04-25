function init(data1,data2,type,price){
  cart =[]
  localStorage.setItem("cart", JSON.stringify(cart));
  cart = JSON.parse(localStorage.getItem('cart'));
  console.log(cart)
  addProduct(data1,data2,type,price)
}

function addProduct(data1,data2,type,price){
  if (typeof(Storage) !== "undefined") {
    try {
      cart = JSON.parse(localStorage.getItem('cart'));
      cart.push([data1,data2,type,price])
      console.log(cart)
      localStorage.setItem("cart", JSON.stringify(cart));
    } catch (e) {
      console.log(e);
      init(data1,data2,type,price)
    }
  } else {
    console.log("Sorry, your browser does not support Web Storage...");
  }
}
