export function Header() {
    const header = document.createElement('header');
    header.innerHTML = `
        <button id="favorite">Favoritos</button>
        <button id="allProducts">Produtos</button>
        <button id="toggleMode">Alterar tema</button>
     `;
    return header;
}