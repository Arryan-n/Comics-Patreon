const payment = document.getElementById("payment-section");
const paymentBtn = document.getElementById("payment-btn");
const comics = document.getElementById("comics");

const itemArr = [];

document.addEventListener("click", handleClick);
function handleClick(e) {
  if (e.target.dataset.name && e.target.dataset.price) addItem(e);
}

function duplicate(search) {
  let ans = -1;
  itemArr.forEach((curr, index) => {
    if (curr.name === search) ans = index;
  });

  return ans;
}

function handleDelete(index, quantity) {
  if (quantity == 1) {
    itemArr.splice(index, 1);
  } else {
    itemArr[index].quantity -= 1;
  }

  render();
}

function addItem(e) {
  const name = e.target.dataset.name;
  const price = parseInt(e.target.dataset.price);

  if (duplicate(name) === -1) {
    itemArr.push({ name: name, price: price, quantity: 1 });
  } else {
    let index = duplicate(name);
    itemArr[index].quantity += 1;
  }

  render();
}

function render() {
  if (itemArr.length === 0) {
    payment.innerHTML = "";
    return;
  }

  let torender = "";
  let total = 0;

  torender += `
    <h1>Patreon Support</h1>
    `;
  // Each Item div render
  itemArr.forEach((curr, index) => {
    total += curr.price * curr.quantity;
    torender += `
    <div class="payment-item">
        <h3>${curr.name} <span>X ${curr.quantity}</span></h3>
        
        <button class="delete-btn" onclick="handleDelete('${index}','${
      curr.quantity
    }')">
        🗑️
        </button>

        <h3 class="payment-price">$${curr.price * curr.quantity} </h3>
    </div>
    `;
  });

  //total Price Div render
  torender += `<div class="payment-item-total">
    <h3 >Total Patreonic support</h3>
    <h3>$${total}</h3>
    </div>
    `;

  payment.innerHTML = torender;
}

comics.addEventListener("click", () => {
  paymentBtn.style.display = "block";
});
