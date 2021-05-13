document.getElementById('get-jokes').addEventListener('click', function (e) {
  // Get number from form input
  const number = document.getElementById('number').value,
    firstName = document.getElementById('first-name').value,
    lastName = document.getElementById('last-name').value;

  const url = `https://api.icndb.com/jokes/random/${number}?firstName=${firstName}&lastName=${lastName}`

  // create XHR and fetch the number of jokes from API
  const xhr = new XMLHttpRequest();
  xhr.open('GET', url, true);
  xhr.onload = function () {
    if (this.status === 200) {
      const response = JSON.parse(this.responseText);
      console.log(response);
      let output = '';
      if (response.type === "success") {
        response.value.forEach(function (joke) {
          output += `<li class='collection-item'>${joke.joke}</li>`
        })
      }
      else {
        output += 'Something went wrong!';
      }
      document.getElementById('jokes').innerHTML = output;
    }
  }

  xhr.send();
  e.preventDefault()
})
