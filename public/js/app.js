console.log("Client side javascript file is loaded!");

const weatherForm = document.querySelector("form");
const message = document.querySelector("#message");

weatherForm.addEventListener("submit", e => {
  e.preventDefault();

  const location = weatherForm.children[0].value;

  message.innerHTML = "<i>Loading...</i>";

  fetch(`/weather?address=${location}`).then(response => {
    response.json().then(data => {
      if (data.error) {
        message.innerHTML = `<b class="error">${data.error}<b>`;
      } else {
        message.innerHTML = `
          <b>${data.forecast}</b>
          <br>
          <i>${data.location}</i>
        `;
      }
    });
  });
});
