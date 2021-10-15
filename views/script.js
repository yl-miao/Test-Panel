function compute() {
    var principal = document.getElementById("principal");
    if (principal.value == "" || parseInt(principal.value) <= 0) {
        alert("Enter a positive number");
        principal.focus();
        return false;
    }

    var rate = document.getElementById("rate").value;
    var years = document.getElementById("years").value;
    var interest = parseFloat(principal.value) * parseFloat(years) * parseFloat(rate) / 100;
    var year = new Date().getFullYear() + parseInt(years);

    //var amount = parseFloat(principal.value) + parseFloat(interest);

    document.getElementById("result").innerHTML = "If you deposit \<mark\>" + principal.value + "\<\/mark\>, \<br\>at an interest rate of \<mark\>" + rate + "\<\/mark\>%\<br\>You will receive an interest of \<mark\>" + interest + "\<\/mark\>,\<br\>in the year \<mark\>" + year + "\<\/mark\> \<br\>";

    return true;
}

function updateRate() {
    var rateval = document.getElementById("rate").value;
    document.getElementById("rate_val").innerText = rateval + "%";
}