export async function fetchProdutos() {
  const resposta = await fetch("https://fakestoreapi.com/products");
  if (!resposta.ok) throw new Error("Erro ao buscar dados");
  return await resposta.json();
}

export async function fetchFavoritos(getFavoriteProducts) {
  const produtos = await fetchProdutos();
  return getFavoriteProducts(produtos);
}