import { getUsers } from '../api/read.js';

let usersCache = [];

export function findUserById(id) {
  return usersCache.find(
    (user) => user.id === id
  );
}

export async function renderUsers(apiUrl) {
  const users = await getUsers(apiUrl);
  usersCache = users;

  const usersSection = document.getElementById('users');

  if (users.length === 0) {
    usersSection.innerHTML = `
      <div class="col-12 py-5 text-center">
        <div class="text-muted bg-light rounded-4 p-5 d-inline-block shadow-sm" style="border: 2px dashed #dee2e6;">
          <h4 class="mb-2 fw-bold text-dark">Nenhum Usuário Encontrado</h4>
          <p class="mb-0">Cadastre um novo usuário para começar.</p>
        </div>
      </div>
    `;
    return;
  }

  usersSection.innerHTML = '';

  users.forEach((user) => {
    const userDiv = document.createElement('div');
    userDiv.classList.add('col-12', 'col-sm-6', 'col-lg-4', 'col-xl-3', 'mb-4');

    userDiv.innerHTML = `
      <div class="card user-card h-100 shadow-sm border-0 rounded-4 overflow-hidden" id="${user.id}" style="transition: transform 0.2s, box-shadow 0.2s;">
        <div class="card-body p-4">
          <h5 class="card-title text-primary fw-bolder mb-3 fs-5">${user.name}</h5>
          
          <div class="mb-3">
            <small class="text-uppercase fw-bold text-muted d-block" style="font-size: 0.75rem; letter-spacing: 0.5px;">Idade</small>
            <span class="fs-6 text-dark">${user.age} anos</span>
          </div>
          
          <div class="mb-1">
            <small class="text-uppercase fw-bold text-muted d-block" style="font-size: 0.75rem; letter-spacing: 0.5px;">E-mail</small>
            <span class="fs-6 text-dark text-break">${user.email}</span>
          </div>
        </div>
        <div class="card-footer bg-white border-0 px-4 pt-0 pb-4 d-flex gap-2 w-100">
          <button class="btn btn-outline-primary btn-sm flex-fill fw-semibold rounded-pill w-50" data-action="edit">Editar</button>
          <button class="btn btn-danger btn-sm flex-fill fw-semibold rounded-pill w-50 shadow-sm" data-action="delete">Excluir</button>
        </div>
      </div>
    `;

    userDiv.addEventListener('mouseenter', () => {
      const card = userDiv.querySelector('.card');
      card.style.transform = 'translateY(-5px)';
      card.classList.replace('shadow-sm', 'shadow');
    });

    userDiv.addEventListener('mouseleave', () => {
      const card = userDiv.querySelector('.card');
      card.style.transform = 'translateY(0)';
      card.classList.replace('shadow', 'shadow-sm');
    });

    usersSection.appendChild(userDiv);
  });
}