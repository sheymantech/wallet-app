"use strict";

const account1 = {
  owner: "Jonas Schmedtmann",
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    "2023-11-18T21:31:17.178Z",
    "2023-12-23T07:42:02.383Z",
    "2023-01-28T09:15:04.904Z",
    "2023-04-21T10:17:24.185Z",
    "2023-05-22T14:11:59.604Z",
    "2023-11-26T17:01:17.194Z",
    "2023-11-25T23:36:17.929Z",
    "2023-11-26T10:51:36.790Z",
  ],
  currency: "EUR",
  locale: "pt-PT", // de-DE
};

const account2 = {
  owner: "Jessica Davis",
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    "2019-11-01T13:15:33.035Z",
    "2019-11-30T09:48:16.867Z",
    "2019-12-25T06:04:23.907Z",
    "2020-01-25T14:18:46.235Z",
    "2020-02-05T16:33:06.386Z",
    "2020-04-10T14:43:26.374Z",
    "2020-06-25T18:49:59.371Z",
    "2020-07-26T12:01:20.894Z",
  ],
  currency: "USD",
  locale: "en-US",
};

const account3 = {
  owner: "Steven Thomas Williams",
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
  movementsDates: [
    "2019-11-01T13:15:33.035Z",
    "2019-11-30T09:48:16.867Z",
    "2019-12-25T06:04:23.907Z",
    "2020-01-25T14:18:46.235Z",
    "2020-02-05T16:33:06.386Z",
    "2020-04-10T14:43:26.374Z",
    "2020-06-25T18:49:59.371Z",
    "2020-07-26T12:01:20.894Z",
  ],
  currency: "USD",
  locale: "en-US",
};

const account4 = {
  owner: "Sarah Smith",
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
  movementsDates: [
    "2019-11-01T13:15:33.035Z",
    "2019-11-30T09:48:16.867Z",
    "2019-12-25T06:04:23.907Z",
    "2020-01-25T14:18:46.235Z",
    "2020-02-05T16:33:06.386Z",
    "2020-04-10T14:43:26.374Z",
    "2020-06-25T18:49:59.371Z",
    "2020-07-26T12:01:20.894Z",
  ],
  currency: "USD",
  locale: "en-US",
};
const account5 = {
  owner: "Olaniyan Sheyi",
  movements: [430, 1000, 700, 50, 90, 23, 45],
  interestRate: 1,
  pin: 5555,
  movementsDates: [
    "2019-11-01T13:15:33.035Z",
    "2019-11-30T09:48:16.867Z",
    "2019-12-25T06:04:23.907Z",
    "2020-01-25T14:18:46.235Z",
    "2020-02-05T16:33:06.386Z",
    "2020-04-10T14:43:26.374Z",
    "2020-06-25T18:49:59.371Z",
    "2020-07-26T12:01:20.894Z",
  ],
  currency: "USD",
  locale: "en-US",
};

// const user = account4.owner.toLowerCase().split(' ').map(name =>  name[0]
// ).join('')
const accounts = [account1, account2, account3, account4, account5];

// Elements
const labelWelcome = document.querySelector(".welcome");
const labelDate = document.querySelector(".date");
const labelBalance = document.querySelector(".balance__value");
const labelSumIn = document.querySelector(".summary__value--in");
const labelSumOut = document.querySelector(".summary__value--out");
const labelSumInterest = document.querySelector(".summary__value--interest");
const labelTimer = document.querySelector(".timer");

const containerApp = document.querySelector(".app");
const containerMovements = document.querySelector(".history-wrapper1");

const btnLogin = document.querySelector(".login__btn");
const btnTransfer = document.querySelector(".form__btn--transfer");
const btnLoan = document.querySelector(".form__btn--loan");
const btnClose = document.querySelector(".form__btn--close");
const btnSort = document.querySelector(".btn--sort");

const inputLoginUsername = document.querySelector(".login__input--user");
const inputLoginPin = document.querySelector(".login__input--pin");
const inputTransferTo = document.querySelector(".form__input--to");
const inputTransferAmount = document.querySelector(".form__input--amount");
const inputLoanAmount = document.querySelector(".form__input--loan-amount");
const inputCloseUsername = document.querySelector(".form__input--user");
const inputClosePin = document.querySelector(".form__input--pin");



const formatCur = function (value, locale, currency) {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currency,
  }).format(value);
};

const formatMovementDate = function (date, locale) {
  const calcDaysPassed = (date1, date2) =>
    Math.round((date2 - date1) / (1000 * 60 * 60 * 24));

  const daysPassed = Math.abs(calcDaysPassed(new Date(), date));

  // console.log(daysPassed);

  if (daysPassed === 0) return "today";
  if (daysPassed === 1) return "yesterday";
  if (daysPassed <= 7) return `${Math.abs(daysPassed)} days ago`;

  return new Intl.DateTimeFormat(locale).format(date);

  // else {
  //   const day = date.getDate();
  //   const month = `${date.getMonth() + 1}`.padStart(2, 0);
  //   const year = `${date.getFullYear()}`.padStart(2, 0);

  //   return `${day}/${month}/${year}`;
  // }

  // const date = new Date(acc.movementsDates[i]);
};

const displayMovement = function (acc, sort = false) {
  containerMovements.innerHTML = "";

  const movs = sort
    ? acc.movements.slice().sort((a, b) => a - b)
    : acc.movements.slice().sort((a, b) => b - a);

  movs.forEach(function (mov, i) {
    const type = mov > 0 ? "deposit" : "withdraw";
    const date = new Date(acc.movementsDates[i]);
    const date2 = new Date();

    const displayDate = formatMovementDate(date, date2);

    const formattedMovement = formatCur(mov, acc.locale, acc.currency);

    const html = `
                   <div class="history-wrapper2 row">
                  <div class="movement-${type} col-lg-2">${i + 1} ${type}</div>
                  <div class="movement-date col-lg-2">${displayDate}</div>
                  <div class="movement-value col-lg-7">
                    <h5 class="movement-value2">${formattedMovement}</h5>
                  </div>
                </div>
    
    `;

    containerMovements.insertAdjacentHTML("Afterbegin", html);
  });
};

// displayMovement(accounts);
// const movements = account1.movements;

const calcPrintBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);

  document.querySelector(".balance-value").textContent = formatCur(
    acc.balance,
    acc.locale,
    acc.currency
  );
};
// calcPrintBalance(account1.movements);

const depositIn = document.querySelector(".in");
//display deposit
const depositOut = document.querySelector(".out");
const sumInterest = document.querySelector(".interest");
const calcDisplaySummary = function (acc) {
  const income = acc.movements
    .filter((mov) => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  depositIn.textContent = formatCur(income, acc.locale, acc.currency);
  const outcomes = acc.movements
    .filter((mov) => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);

  depositOut.textContent = formatCur(outcomes, acc.locale, acc.currency);

  const interest = acc.movements
    .filter((mov) => mov > 0)
    .map((deposit) => (deposit * acc.interestRate) / 100)
    // down here i.e the each interest rate should be more than 1 before it can get added

    .filter((mov) => mov > 1)
    .reduce((acc, int) => acc + int, 0);

  sumInterest.textContent = formatCur(interest, acc.locale, acc.currency);
};
// calcDisplaySummary(account1.movements);

//the find mettod

// const firstWithdraw = movements.find((mov) => mov < 0);
// console.log(movements);
// console.log(firstWithdraw);

// console.log(accounts);

// const account = accounts.find((acc) => acc.owner === "Jessica Davis");
// console.log(account);

//event handler

const createUserName = function (acc) {
  acc.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(" ")
      .map((word) => word[0])
      .join("");
  });
};
createUserName(accounts);

const updateUi = function (acc) {
  //display movement
  displayMovement(acc);

  //display balance
  calcPrintBalance(acc);

  //display summary

  calcDisplaySummary(acc);
};

const startLogOutTimer = function () {
  const tick = function () {
    const min = String(Math.trunc(time / 60)).padStart(2, 0);
    const second = String(time % 60).padStart(2, 0);
    //in each call back ,print the remaining time to the UI

    labelTimer.textContent = `${min}:${second}`;

    //when 0 seconds, stop timer and logout user

    if (time === 0) {
      clearInterval(timer);

      labelWelcome.textContent = "login to get started";
      containerApp.classList.add("app");
    }

    // decrease time by 1
    time--;
  };

  // set time to 5 minutes

  let time = 300;

  //call the timer every second

  tick();
  const timer = setInterval(tick, 1000);

  return timer;
};

let currentAccount;

let timer;

//----------------------------------------------------------------
// currentAccount = account1;

// updateUi(currentAccount);

// containerApp.classList.remove("app");

// date/month/year

//experimenting API -------------------------------------------------

btnLogin.addEventListener("click", function (e) {
  e.preventDefault();
  currentAccount = accounts.find(
    (acc) => acc.username === inputLoginUsername.value
  );
  // console.log(currentAccount);

  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    //display ui and a welcome message
    labelWelcome.textContent = `Welcome back ! ${
      currentAccount.owner.split(" ")[0]
    }`;
    containerApp.classList.remove("app");

    //Timer

    if (timer) clearInterval(timer);

    timer = startLogOutTimer();

    // update ui

    updateUi(currentAccount);

    //NEW UPDATED CURRENT DATE

    const now = new Date();

    const options = {
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      day: "numeric",
      month: "long",
      year: "numeric",
      weekday: "long",
    };

    // const locale = navigator.language;
    // console.log(locale);

    labelDate.textContent = new Intl.DateTimeFormat(
      currentAccount.locale,
      options
    ).format(now);

    // current date1
    // const now = new Date();

    // const day = now.getDate();
    // const month = now.getMonth() + 1;
    // const year = now.getFullYear();
    // const hour = now.getHours() / 2;
    // const min = now.getMinutes();

    // labelDate.textContent = `${day}/${month}/${year}, ${hour}:${min}`;

    //clear input area
    inputLoginUsername.value = inputLoginPin.value = "";
  }
});

btnLoan.addEventListener("click", function (e) {
  e.preventDefault();
  const amount = Math.floor(inputLoanAmount.value);

  if (
    amount > 0 &&
    currentAccount.movements.some((mov) => mov >= amount * 0.1)
  ) {
    setTimeout(function () {
      //add movement
      currentAccount.movements.push(amount);
      //loan date
      currentAccount.movementsDates.push(new Date().toDateString());
      //update the UI
      updateUi(currentAccount);
    }, 2500);
  }

  // clear  timer

  clearInterval(timer);
  timer = startLogOutTimer();

  inputLoanAmount.value = "";
});

btnTransfer.addEventListener("click", function (e) {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);

  const recieveAcc = accounts.find(
    (acc) => acc.username === inputTransferTo.value
  );
  inputTransferAmount.value = inputTransferTo.value = "";

  if (
    amount > 0 &&
    recieveAcc &&
    currentAccount.balance >= amount &&
    recieveAcc?.username !== currentAccount.username
  ) {
    //doing the transfer ----debit and credit

    currentAccount.movements.push(-amount);
    recieveAcc.movements.push(amount);
    // add transfer date

    currentAccount.movementsDates.push(new Date().toDateString());
    // recieveAcc.movementsDates.push(new Date().toDateString());

    // clear  timer

    clearInterval(timer);
    timer = startLogOutTimer();

    updateUi(currentAccount);
  }
});

btnClose.addEventListener("click", function (e) {
  e.preventDefault();

  if (
    currentAccount.pin === Number(inputClosePin.value) &&
    currentAccount.username === inputCloseUsername.value
  ) {
    const index = accounts.findIndex(
      (acc) => acc.username === currentAccount.username
    );
    console.log(index);
    //delete account
    accounts.splice(index, 1);

    //hide UI
    containerApp.classList.add("app");
  }

  inputClosePin.value = inputCloseUsername.value = "";
});

let sorted = false;

btnSort.addEventListener("click", function () {
  displayMovement(currentAccount.movements, !sorted);
  sorted = !sorted;
});