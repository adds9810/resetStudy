let myMoney = 10000;
let vendingchange = 1000;
let inputCoin = 0;
const msgTxt = {
  inCoin: "돈을 투입해주세요",
  lackMoney: "돈이 부족합니다.",
  noInput: "투입한 돈이 없습니다.",
  selDrink: "음료를 선택해주세요",
  noMoney: "지갑에 돈이 부족합니다",
  noStock: "선택한 음료 재고가 없습니다.",
  noChange: "음료자판기에 잔돈이 부족해서 선택한 음료를 구매할 수 없습니다.",
  outChange: "잔돈이 나옵니다.",
  complete: "선택한 음료가 나왔습니다. 잔돈이 나옵니다.",
};
const msgWrap = document.querySelector(".state .msg .txt");
let msg = msgTxt.inCoin;
let minPrice;

function init() {
  base();
  addEvent();
}
function base() {
  roadData();
  renderCoin(myMoney, vendingchange, inputCoin);
  resetSlideTxt();
}
function addEvent() {}
async function roadData() {
  const res = await fetch("http://localhost:3000/drink");
  const resData = await res.json();
  renderList(resData);
}
function renderList(data) {
  const col = 4;
  let totalData = Math.floor(data.length / col);
  if (totalData !== 0) {
    for (let i = 0; i < totalData; i++) {
      data.push({
        id: data.length + 1,
        name: "",
        price: "",
        count: "",
        color: "",
      });
    }
  }
  const li = [];
  const colWifth = 100 / col + "%";
  for (item of data) {
    let signal = item.count > 0 ? "#DEDEDE" : "red";
    li.push(`<li style="width:${colWifth}">`);
    if (item.name !== "") {
      li.push(`<span style="background:${item.color};" class="drink"></span>`);
    }
    li.push(`<span class="name"><span>${item.name}</span></span>`);
    li.push(
      `<span class="pricebox"><span class="price">${item.price}</span>원</span>`
    );
    li.push(
      `<a href="javascript:;" style="background:${signal};" onclick="selDrink(${item.id});" class="signal">재고 : <span class="count">${item.count}</span></a>`
    );
    li.push(`</li>`);
  }
  document.getElementById("drinkList").innerHTML = li.join("");
  if (inputCoin > 0) {
    openDrink(inputCoin);
  }
}
function renderCoin(myMoney, vendingchange, inputCoin) {
  document.querySelector("#myMoney").innerText = myMoney;
  document.querySelector("#vendingchange").innerText = vendingchange;
  document.querySelector("#inputCoin").innerText = inputCoin;
}
function resetSlideTxt() {
  setTimeout(function () {
    msgWrap.innerText = msgTxt.inCoin;
    document.querySelector(".state .msg").classList.add("slide");
  }, 1500);
}
function inCoin(money) {
  document.querySelector(".state .msg").classList.remove("slide");
  if (myMoney > money) {
    myMoney = myMoney - money;
    vendingchange = vendingchange + money;
    inputCoin = inputCoin + money;
    renderCoin(myMoney, vendingchange, inputCoin);
    openDrink(inputCoin);
  } else {
    msgWrap.innerText = msgTxt.noMoney;
    resetSlideTxt();
  }
}
function outChange() {
  let msg;
  document.querySelector(".state .msg").classList.remove("slide");
  if (inputCoin === 0) {
    msg = msgTxt.noInput;
  } else if (inputCoin > vendingchange) {
    msg = msgTxt.noChange;
  } else {
    let money = inputCoin;
    myMoney = myMoney + money;
    vendingchange = vendingchange - money;
    inputCoin = inputCoin - money;
    msg = msgTxt.outChange;
    renderCoin(myMoney, vendingchange, inputCoin);
    openDrink(inputCoin);
  }
  msgWrap.innerText = msg;
  resetSlideTxt();
}
function openDrink(inputCoin) {
  const drinkList = document.querySelector("#drinkList");
  let msg = msgTxt.inCoin;
  for (let num = 1; num < drinkList.querySelectorAll("li").length; num++) {
    let price = drinkList.querySelectorAll(
      "li:nth-child(" + num + ") .price"
    )[0].textContent;
    let count = drinkList.querySelectorAll(
      "li:nth-child(" + num + ") a .count"
    )[0].textContent;
    let openColor;
    if (inputCoin >= price && count > 0) {
      openColor = "green";
      msg = msgTxt.selDrink;
    } else if (count <= 0) {
      openColor = "red";
    } else {
      openColor = "#DEDEDE";
    }

    drinkList.querySelectorAll(
      "li:nth-child(" + num + ") a"
    )[0].style.background = openColor;
  }

  msgWrap.innerText = msg;
}

async function selDrink(id) {
  event.preventDefault();
  let taeget = event.target;
  let msg;
  if (taeget.style.background !== "green") {
    if (taeget.style.background === "red") {
      msg = msgTxt.noStock;
      if (inputCoin <= 0) {
        document.querySelector(".state .msg").classList.remove("slide");
        resetSlideTxt();
      }
    } else if (inputCoin === 0) {
      msg = msgTxt.inCoin;
    } else {
      msg = msgTxt.lackMoney;
    }

    msgWrap.innerText = msg;
    return false;
  }
  let name = document.querySelector(
    "#drinkList li:nth-child(" + id + ") .name"
  ).textContent;
  let price = document.querySelector(
    "#drinkList li:nth-child(" + id + ") .price"
  ).textContent;
  let count =
    Number(
      document.querySelectorAll(
        "#drinkList li:nth-child(" + id + ") a .count"
      )[0].textContent
    ) - 1;
  let color = document.querySelectorAll(
    "#drinkList li:nth-child(" + id + ") .drink"
  )[0].style.background;
  let data = {
    id: id,
    name: name,
    price: price,
    count: count,
    color: color,
  };
  const res = await fetch(`http://localhost:3000/drink/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
    headers: {
      "content-type": "application/json;charset=UTF-8",
    },
  });
  //   .then((res) => roadData())
  //   .then((res) => );
  if (res.ok) {
    inputCoin = inputCoin - price;
    renderCoin(myMoney, vendingchange, inputCoin);
    roadData();
  } else {
    alert("자판기에 문제가 발생했습니다.");
  }
}
init();
