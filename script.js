const label = document.querySelectorAll(".dataLabel");
const campos = document.querySelectorAll(".dataInput");
const errorText = document.querySelectorAll(".errorText");
const btn = document.getElementById("arrow");

const day = document.getElementById("day");
const month = document.getElementById("month");
const year = document.getElementById("year");
const diasDoMes = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

const functionYear = document.getElementById("functionYear");
functionYear.innerHTML = '- -'
const functionMonth = document.getElementById("functionMonth");
functionMonth.innerHTML = '- -'
const functionDay = document.getElementById("functionDay");
functionDay.innerHTML = '- -'

const functionDateError = {
 messageDefault: function () {
  functionDay.innerHTML = '- -'
  functionMonth.innerHTML = '- -'
  functionYear.innerHTML = '- -'
 }
}

const styleError = {
 addStyle: function (index) {
  label[index].classList.add('labelError');
  campos[index].classList.add('errorInput');
  btn.style.top = '140px';
 }
};

btn.addEventListener("click", function () {
 errorText.forEach(function (error, index) {
  error.innerHTML = '';
  label[index].classList.remove('labelError');
  campos[index].classList.remove('errorInput');
  btn.style.top = '';
 });

 campos.forEach(function (campo, index) {
  if (campo.value === '') {
   errorText[index].innerHTML = 'Obrigatório.';
   styleError.addStyle(index);
   functionDateError.messageDefault()
  }

  if (campo.id === 'day' && (campo.value === '0' || campo.value > diasDoMes[month.value - 1])) {
   errorText[index].innerHTML = "Dia inválido.";
   styleError.addStyle(index);
   functionDateError.messageDefault()
  };

  if (campo.id === 'month' && (campo.value === '0' || campo.value > 12)) {
   errorText[index].innerHTML = "Mês inválido.";
   styleError.addStyle(index);
   functionDateError.messageDefault()
  };

  if (campo.id === 'year' && (campo.value === '0' || campo.value > 2024)) {
   errorText[index].innerHTML = "Ano inválido.";
   styleError.addStyle(index);
   functionDateError.messageDefault()
  };
 });

 btn_calc()
});

function btn_calc() {
 const requirements = true;

 errorText.forEach(function (error, index) {
  if (error.innerHTML !== '') {
   requirements = false;
  }
 });

 campos.forEach(function (campo) {
  if (campo.value === '') {
   requirements = false;
  }
 });

 if (requirements) {
  const inputDay = parseInt(day.value, 10);
  const inputMonth = parseInt(month.value, 10);
  const inputYear = parseInt(year.value, 10);

  const inputDate = new Date(inputYear, inputMonth - 1, inputDay)
  const dataAtual = new Date()

  const difference = dataAtual - inputDate;

  const yearsDifference = Math.floor(difference / (365.25 * 24 * 60 * 60 * 1000));
  const monthsDifference = Math.floor((difference % (365.25 * 24 * 60 * 60 * 1000)) / (30.44 * 24 * 60 * 60 * 1000));
  const daysDifference = Math.floor((difference % (30.44 * 24 * 60 * 60 * 1000)) / (24 * 60 * 60 * 1000));

  functionYear.innerHTML = yearsDifference;
  functionMonth.innerHTML = monthsDifference;
  functionDay.innerHTML = daysDifference;
 }
}