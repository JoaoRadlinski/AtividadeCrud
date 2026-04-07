export async function createUser(apiUrl, { name, age, email }) { 
  try {
    const response = await axios.post(apiUrl, {
      name,
      age: Number(age),
      email
    });

    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || 'Erro ao criar usuário '
    );
  }
}