import './style.css'


// =========================
// HOME PAGE MOBILE MENU
// =========================

const menuBtn = document.getElementById("menuBtn");
const mobileMenu = document.getElementById("mobileMenu");

if (menuBtn) {

    menuBtn.addEventListener("click", () => {

        mobileMenu.classList.toggle("hidden");

    });

}


// =========================
// LOGIN
// =========================

const loginForm = document.getElementById("loginForm");

if (loginForm) {

    loginForm.addEventListener("submit", function (event) {

        event.preventDefault();

        window.location.href = "dashboard.html";

    });

}


// =========================
// STARTING VALUES
// =========================

let totalIncome = 35000;
let totalExpense = 10500;


// =========================
// ELEMENTS
// =========================

const balanceElement = document.getElementById("balance");
const incomeElement = document.getElementById("income");
const expenseElement = document.getElementById("expense");


// =========================
// UPDATE DASHBOARD
// =========================

function updateDashboard() {

    const balance = totalIncome - totalExpense;

    if (incomeElement) {

        incomeElement.textContent =
            "₹" + totalIncome.toLocaleString();

    }


    if (expenseElement) {

        expenseElement.textContent =
            "₹" + totalExpense.toLocaleString();

    }


    if (balanceElement) {

        balanceElement.textContent =
            "₹" + balance.toLocaleString();

    }

}


// =========================
// INCOME MODAL
// =========================

const addIncomeBtn =
    document.getElementById("addIncomeBtn");

const incomeModal =
    document.getElementById("incomeModal");

const closeIncome =
    document.getElementById("closeIncome");


if (addIncomeBtn) {

    addIncomeBtn.addEventListener("click", () => {

        incomeModal.classList.remove("hidden");

    });

}


if (closeIncome) {

    closeIncome.addEventListener("click", () => {

        incomeModal.classList.add("hidden");

    });

}


// =========================
// EXPENSE MODAL
// =========================

const addExpenseBtn =
    document.getElementById("addExpenseBtn");

const expenseModal =
    document.getElementById("expenseModal");

const closeExpense =
    document.getElementById("closeExpense");


if (addExpenseBtn) {

    addExpenseBtn.addEventListener("click", () => {

        expenseModal.classList.remove("hidden");

    });

}


if (closeExpense) {

    closeExpense.addEventListener("click", () => {

        expenseModal.classList.add("hidden");

    });

}


// =========================
// ADD INCOME
// =========================

const incomeForm =
    document.getElementById("incomeForm");


if (incomeForm) {

    incomeForm.addEventListener("submit", function (event) {

        event.preventDefault();


        const name =
            document.getElementById("incomeName").value;

        const amount =
            Number(
                document.getElementById("incomeAmount").value
            );


        totalIncome += amount;


        addTransaction(
            "💰",
            name,
            "Income",
            amount,
            "income"
        );


        updateDashboard();


        incomeForm.reset();


        incomeModal.classList.add("hidden");

    });

}


// =========================
// ADD EXPENSE
// =========================

const expenseForm =
    document.getElementById("expenseForm");


if (expenseForm) {

    expenseForm.addEventListener("submit", function (event) {

        event.preventDefault();


        const name =
            document.getElementById("expenseName").value;

        const amount =
            Number(
                document.getElementById("expenseAmount").value
            );

        const category =
            document.getElementById("expenseCategory").value;


        totalExpense += amount;


        addTransaction(
            "💸",
            category,
            name,
            amount,
            "expense"
        );


        updateDashboard();


        expenseForm.reset();


        expenseModal.classList.add("hidden");

    });

}


// =========================
// ADD TRANSACTION FUNCTION
// =========================

function addTransaction(
    icon,
    title,
    description,
    amount,
    type
) {

    const transactionList =
        document.getElementById("transactionList");


    if (!transactionList) return;


    const transaction =
        document.createElement("div");


    transaction.className =
        "transaction-item flex justify-between border-b pb-3";


    let amountColor =
        type === "income"
            ? "text-green-600"
            : "text-red-500";


    let sign =
        type === "income"
            ? "+"
            : "-";


    transaction.innerHTML = `

        <div>

            <h3 class="font-semibold">

                ${icon} ${title}

            </h3>

            <p class="text-sm text-slate-500">

                ${description}

            </p>

        </div>


        <span class="${amountColor} font-bold">

            ${sign} ₹${amount.toLocaleString()}

        </span>

    `;


    transactionList.prepend(transaction);

}