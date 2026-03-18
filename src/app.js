import { renderUsers } from "./scripts/dom/render.js";

import { createUser } from "./scripts/api/create.js";

import { findUserById } from "./scripts/dom/render.js";

import { deleteUser } from "./scripts/api/delete.js";

const usersSection = document.getElementById("users");
const apiUrl = "http://localhost:8000/api/users";

// Quando o DOM estiver pronto, renderiza
document.addEventListener("DOMContentLoaded", () => renderUsers(apiUrl));

// Adicione ao app.js:

const formError = document.getElementById("form-error");

function showError(message) {
  formError.textContent = message;
  formError.classList.remove("d-none");
}

function hideError() {
  formError.classList.add("d-none");
  formError.textContent = "";
}
// Adicione as referências do DOM:
const form = document.getElementById("create-user-form");

// Adicione o listener:
form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const name = document.getElementById("name").value;
  const age = document.getElementById("age").value;
  const email = document.getElementById("email").value;

  hideError();

  try {
    // Por enquanto, só criação:
    await createUser(apiUrl, { name, age, email });

    form.reset();
    renderUsers(apiUrl);
  } catch (error) {
    showError(error.message);
  }
});

function getUserFromCard(button) {
  const card = button.closest(".user-card");
  return findUserById(Number(card.id));
}

usersSection.addEventListener("click", async (event) => {
  const { target } = event;

  if (target.dataset.action === "delete") {
    const user = getUserFromCard(target);

    if (!confirm("Are you sure you want to " + "delete this user?")) return;

    try {
      await deleteUser(apiUrl, user.id);
      renderUsers(apiUrl);
    } catch (error) {
      showError(error.message);
    }
  }
});
