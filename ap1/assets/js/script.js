import { ProductCard } from "./components/Card.js";
import { addFavorite, removeFavorite, isFavorite, getFavoriteProducts, getTheme, setTheme } from "./favorites.js";
import { Header } from "./components/Header.js";
import { fetchProdutos, fetchFavoritos } from "./api.js";  

function handleFavoriteClick(event) {
    const favoriteButton = event.target.closest('.favorite-btn');
    if (!favoriteButton) return;

    const productId = Number(favoriteButton.dataset.productId);

    if (isFavorite(productId)) {
        removeFavorite(productId);
        favoriteButton.classList.remove('favorited');
    } else {
        addFavorite(productId);
        favoriteButton.classList.add('favorited');
    }
}

function aplicarFiltro(produtos, termo) {
  const termoLower = termo.toLowerCase();
  return produtos.filter(p =>
    p.title.toLowerCase().includes(termoLower) || 
    p.category.toLowerCase().includes(termoLower)
  );
}

async function carregarProdutos(container) {
  try {
    const produtos = await fetchProdutos();
    exibirProdutos(produtos);

    const input = document.getElementById('search-filter');

    input.addEventListener('input', () => {
      const termo = input.value;
      const filtrados = aplicarFiltro(produtos, termo);
      exibirProdutos(filtrados);
    });
  } catch (error) {
    console.error("Erro ao carregar e exibir produtos:", error);
  }
}

function exibirProdutos(produtos) {
    const container = document.getElementById('product-list');
    container.innerHTML = '';
    produtos.forEach(p => container.appendChild(ProductCard(p)));
}

async function exibirFavoritos() {
    try {
      const favoritos = await fetchFavoritos(getFavoriteProducts);
      const favoriteList = document.getElementById('favorite-list');
      favoriteList.innerHTML = '';

      favoritos.forEach(produto => {
          favoriteList.appendChild(ProductCard(produto));
      });
    } catch(error) {
      console.error("Erro ao exibir favoritos:", error);
    }
}

function init() {
    const headerContainer = document.getElementById('header-container');
    headerContainer.appendChild(Header());
    
    const theme = getTheme();
    document.body.dataset.theme = theme;

    const toggleModeBtn = document.getElementById('toggleMode');
    toggleModeBtn.addEventListener('click', () => {
        const newTheme = document.body.dataset.theme === 'dark' ? 'light' : 'dark';    // botoes da header
        setTheme(newTheme);
    }); 
    const favoriteBtn = document.getElementById('favorite');
    const allProductsBtn = document.getElementById('allProducts');
    const productsPage = document.getElementById('products-page');
    const favoritesPage = document.getElementById('favorites-page');


    favoriteBtn.addEventListener('click', () => {
        productsPage.classList.add('hidden');
        favoritesPage.classList.remove('hidden');
        exibirFavoritos();
    });

    allProductsBtn.addEventListener('click', () => {
        favoritesPage.classList.add('hidden');
        productsPage.classList.remove('hidden');
    });

    const productListContainer = document.getElementById('product-list');
    if (productListContainer) {
        carregarProdutos(productListContainer);
    }

    const appContainer = document.getElementById('app');
    appContainer.addEventListener('click', handleFavoriteClick);
}

init();