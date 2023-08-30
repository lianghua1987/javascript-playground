const messageInput = document.querySelector('#message-input');
const linkInput = document.querySelector('#link-input');
const showContainer = document.querySelector('#show-container');
const messageContainer = document.querySelector('#message-container');
const linkContainer = document.querySelector('#link-container');
const h1 = document.querySelector('h1');
const {hash} = window.location;
const decrypted = atob(hash.slice(1));
if (hash && decrypted) {
  showContainer.classList.remove("hide");
  messageContainer.classList.add("hide");
  h1.innerHTML = decrypted;
}

document.querySelector('form').addEventListener('submit', e => {
  e.preventDefault();
  const encrypted = btoa(messageInput.value)
  linkInput.value = `${window.location}#${encrypted}`;
  linkInput.select();
  linkContainer.classList.remove("hide");
  messageContainer.classList.add("hide");
});