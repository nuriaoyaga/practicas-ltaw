
var cart = JSON.parse(localStorage.getItem('cart'));
var content = document.getElementById('items')
var total = 0;


if (cart.length == 0){
  content.innerHTML="";
  parr = document.createElement("p");
  text = document.createTextNode("El carro está vacío");
  parr.appendChild(text);
  content.appendChild(parr);
} else{
  table = document.getElementById('products')
  for (i = 0; i < cart.length; i++) {
    product = cart[i]
    row = document.createElement('tr');
    for (j = 0; j < product.length; j++){
      column = document.createElement('td');
      if (i == cart.length-1){
        column.style.paddingBottom="20px";
      }
      if (j==2){
        text = document.createTextNode(product[j].charAt(0).toUpperCase() + product[j].slice(1));
      } else if (j==3) {
        total = Math.round((total + parseFloat(product[j])) * 100) / 100
        text = document.createTextNode(product[j]+" €")
      } else {
        column.setAttribute("class", "data");
        text = document.createTextNode(product[j])
      }

      column.appendChild(text)
      row.appendChild(column)
    }
    table.appendChild(row)
  }
  row = document.createElement('tr');
  column = document.createElement('td');
  column.colSpan = 3;
  row.appendChild(column)
  column = document.createElement('td');
  column.setAttribute("id", "total")
  text = document.createTextNode(total +" €")
  column.appendChild(text)
  row.appendChild(column)
  table.appendChild(row)

}
