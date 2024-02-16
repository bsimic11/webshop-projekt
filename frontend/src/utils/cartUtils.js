export const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2);
}

export const updateCart = (state) => {
    // Računanje cijene proizvoda
    state.itemsPrice = addDecimals(state.cartItems.reduce((acc,item) =>
    acc + item.price * item.qty, 0));

    // Računanje cijene shippinga (priko 100€ besplatno, inače 10€)
    state.shippingPrice = addDecimals(state.itemsPrice > 100 ? 0 : 10);

    // Računanje poreza (25% PDV)
    state.taxPrice = addDecimals(Number((0.25 * state.itemsPrice).toFixed(2)));

    // Računanje ukupne cijene
    state.totalPrice = (
        Number(state.itemsPrice) +
        Number(state.shippingPrice) +
        Number(state.taxPrice)
    ).toFixed(2);
    
    localStorage.setItem('cart', JSON.stringify(state));

    return state;
}