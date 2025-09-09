function getFavorites() {
    return JSON.parse(localStorage.getItem('favorites')) || [];
}

function saveFavorites(favorites) {
    localStorage.setItem('favorites', JSON.stringify(favorites));
}

export function isFavorite(productId) {
    return getFavorites().includes(productId);
}

export function addFavorite(productId) {
    const favorites = getFavorites();
    if(!favorites.includes(productId)) {
        favorites.push(productId);
        saveFavorites(favorites);
    }
}

export function removeFavorite(productId) {
    let favorites = getFavorites();
    favorites = favorites.filter(id => id !== productId);
    saveFavorites(favorites);
}

export function getFavoriteProducts(allProducts) {
    const favoriteIds = getFavorites();
    return allProducts.filter(product => favoriteIds.includes(product.id));
}

export function getTheme() {
    return localStorage.getItem('theme') || 'light';
}

export function setTheme(theme) {
    localStorage.setItem('theme', theme);
    document.body.dataset.theme = theme;
}