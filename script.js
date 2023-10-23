const itensCarrinho = {};

function addCarrinho(itemNome, itemPreco) {
    if (itensCarrinho[itemNome]) {
        itensCarrinho[itemNome].quantity++;
        itensCarrinho[itemNome].precoTotal += itemPreco;
        const liItem = itensCarrinho[itemNome].liItem;
        liItem.querySelector(".quantity").innerHTML = itensCarrinho[itemNome].quantity;
        liItem.querySelector(".preco-total").innerHTML = `R$${itensCarrinho[itemNome].precoTotal.toFixed(2)}`;
    } else {
        const liItem = document.createElement("li");
        liItem.innerHTML = `
        <div class="item">
            <span>${itemNome}</span>
            <button class="add" onclick="addCarrinho('${itemNome}', ${itemPreco})"> + </button>
            <span class="quantity"> 1 </span>
            <button class="remove" onclick="removeCarrinho('${itemNome}', ${itemPreco})"> - </button>
            <span class="preco-total">R$${itemPreco.toFixed(2)}</span>
        </div>
        `;
        document.getElementById("itens-lista").appendChild(liItem);

        itensCarrinho[itemNome] = {
            quantity: 1,
            precoTotal: itemPreco,
            liItem: liItem,
        };
    }

    updatePrecoTotal();
    updateCarrinho();
}

function removeCarrinho(itemNome, itemPreco) {
    if (itensCarrinho[itemNome]) {
        if (itensCarrinho[itemNome].quantity > 1) {
            itensCarrinho[itemNome].quantity--;
            itensCarrinho[itemNome].precoTotal -= itemPreco;
            const liItem = itensCarrinho[itemNome].liItem;
            liItem.querySelector(".quantity").innerHTML = itensCarrinho[itemNome].quantity;
            liItem.querySelector(".preco-total").innerHTML = `R$${itensCarrinho[itemNome].precoTotal.toFixed(2)}`;
        } else {
            document.getElementById("itens-lista").removeChild(itensCarrinho[itemNome].liItem);
            delete itensCarrinho[itemNome];
        }
        updateCarrinho();
    }
}

function updateCarrinho() {
    const contCarrinho = document.getElementById("cont-carrinho");
    let totalItens = 0;
    for (let itemNome in itensCarrinho) {
        totalItens += itensCarrinho[itemNome].quantity;
    }
    contCarrinho.innerHTML = totalItens;
}

function limparCarrinho(){
    document.getElementById("itens-lista").innerHTML = ""
    document.getElementById("preco-total").innerHTML= "Valor Total R$0,00"
    for(let itemNome in itensCarrinho){
        delete itensCarrinho[itemNome]
    }
    updateCarrinho()
}

function toggleCarrinho(){
    const itensCarrinhoDiv = document.getElementById("carrinho-itens")
    if(itensCarrinhoDiv.style.display == "none"){
        itensCarrinhoDiv.style.display = "block"
    }else{
        itensCarrinhoDiv.style.display = "none"
    }
}