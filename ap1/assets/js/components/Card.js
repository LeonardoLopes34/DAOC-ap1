import { isFavorite } from '../favorites.js';

export function ProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';

    const favoritedClass = isFavorite(product.id) ? 'favorited' : '';

    card.innerHTML = `
        <img src="${product.image}" alt="${product.title}" class="product-card__image">
        <div class="product-card__info">
            <h3 class="product-card__title">${product.title}</h3>
            <p class="product-card__price">R$ ${product.price.toFixed(2)}</p>
            <p class="product-card__rating">Avaliação: ${product.rating.rate} ★</p>
            <p class="product-card__category">Categoria: ${product.category}</p>
        </div>
        <div class="product-card__actions">
            <button class="favorite-btn ${favoritedClass}" data-product-id="${product.id}">
                ★
            </button>
        </div>
    `;
    
    return card;
}