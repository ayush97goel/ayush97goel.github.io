//  UI variables

const UIAmount = document.getElementById('amount');
const UIInterest = document.getElementById('interest');
const UIYears = document.getElementById('years');
const UIMonthlyPayment = document.getElementById('monthly-payment');
const UITotalPayment = document.getElementById("total-payment");
const UITotalInterest = document.getElementById('total-interest');
const UILoanForm = document.getElementById('loan-form');
const UICard = document.querySelector(".card");
const UICardHeading = document.querySelector('.heading');
const UIResultDiv = document.getElementById('result');
const UILoader = document.getElementById('loading');


UILoanForm.addEventListener('submit', function (e) {
  // Hide the results if any
  UIResultDiv.style.display = 'none';
  // show loader as the form is submitted
  UILoader.style.display = 'block';
  setTimeout(calculate, 2000);
  e.preventDefault();
});



function calculate(e) {
  const principal = parseFloat(UIAmount.value);
  const interestRatePerMonth = (parseFloat(UIInterest.value)) / (100 * 12);
  const numOfMonths = (parseFloat(UIYears.value) * 12);
  // formula to calculate EMI
  // EMI = [P x R x (1+R)^N]/[(1+R)^N-1], where P stands for the loan amount or principal, R is the interest rate per month [if the interest rate per annum is 11%, then the rate of interest will be 11/(12 x 100)], and N is the number of monthly instalments.
  const x = Math.pow((1 + interestRatePerMonth), numOfMonths);
  const emi = ((principal * interestRatePerMonth * x) / (x - 1)).toFixed(2);
  // console.log(numOfMonths);
  if (isFinite(emi)) {
    UIMonthlyPayment.value = emi;
    UITotalPayment.value = (emi * numOfMonths).toFixed(2);
    UITotalInterest.value = ((emi * numOfMonths) - principal).toFixed(2);

    // Hide Loader
    UILoader.style.display = 'none';

    // Show result div
    UIResultDiv.style.display = 'block';

  } else {
    // console.log("Please check the input values");
    showError("Please check the input values");
  }
}

function showError(errorMsg) {
  const UIErrorDiv = document.createElement('div');
  UIErrorDiv.className = "alert alert-danger";
  UIErrorDiv.appendChild(document.createTextNode(errorMsg));
  UICard.insertBefore(UIErrorDiv, UICardHeading);
  // Hide Loader
  UILoader.style.display = 'none';
  setTimeout(clearError, 3000);
}

function clearError() {
  document.querySelector('.alert').remove();
}
