export async function deleteUser(apiUrl, id) { 
  try {
    const response = await axios.delete(`${apiUrl}?id=${id}`);
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.error || "Failed to delete user"
    );
  }
}