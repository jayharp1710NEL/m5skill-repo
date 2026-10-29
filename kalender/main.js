const days = document.querySelector(".days");
let currentDate = new Date(2025, 6);

function renderMonth(){
    document.querySelector("#date").textContent = currentDate.toLocaleDateString("en", { month: "long", year: "numeric" });

    const lastDayOfMonth = new Date(currentDate.getFullYear(),currentDate.getMonth() + 1, 1-1);
    const numberOfDays = lastDayOfMonth.getDate();

    const firstDayOfMonth = new Date(currentDate.getFullYear(),currentDate.getMonth(), 1);
    let firstDayOfMonthDay = firstDayOfMonth.getDay();
    if(firstDayOfMonthDay == 0) firstDayOfMonthDay = 7;

    const lastDayPrevMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0).getDate();

    for (let i = 1; i < firstDayOfMonthDay; i++) {
        const emptyDay = document.createElement("li");
        emptyDay.classList.add("empty");
        emptyDay.textContent = lastDayPrevMonth - firstDayOfMonthDay + 1 + i;
        days.appendChild(emptyDay);
    }

    for (let i = 1; i <= numberOfDays; i++) {
        const day = document.createElement("li");
        day.classList.add("day");
        day.textContent = i;
        days.appendChild(day);
    }

    const filled = firstDayOfMonthDay - 1 + numberOfDays;
    const daysNextMonth = (7 - filled % 7) % 7;

    for (let i = 1; i <= daysNextMonth; i++) {
        const emptyDay = document.createElement("li");
        emptyDay.classList.add("empty");
        emptyDay.textContent = i;
        days.appendChild(emptyDay);
    }
}

renderMonth();

const prevButton = document.querySelector("#prev");
const nextButton = document.querySelector("#next");

function nextMonth() {
    days.innerHTML = "";
    currentDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1);
    renderMonth();
}

function prevMonth() {
    days.innerHTML = "";
    currentDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1);
    renderMonth();
}
nextButton.addEventListener("click", nextMonth);
prevButton.addEventListener("click", prevMonth);
