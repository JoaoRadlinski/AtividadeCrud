export async function getUsers(apiUrl) {
  const response = await fetch(apiUrl);
  const data = await response.json(); //Essa função apenas le a resposta do json

  if (!response.ok) {
    throw new Error(
      data.error || 'Failed to fetch users'
    );
  }

  return data.users;
}
