export async function deleteUser(apiUrl, id) {
  const response = await fetch(
    `${apiUrl}?id=${id}`,//pega o id imbutido na criação do card para assim saber qual deve ser deletado
    { method: 'DELETE' }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.error || 'Failed to delete user'//mesma logica dos outros apenas tratamento de erros 
    );
  }

  return data;
}