function showLoading(){
//----- document.createElement cria qualquer elemento de qualquer tag do DOM
    const div = document.createElement("div");
    div.classList.add("loading","centralize");
    const label = document.createElement("label");
//----Escreve um texto no elemento ------------------------------------------ Informação interessante
    label.innerText = "Carregando...";
    div.appendChild(label);
    document.body.appendChild(div);

}

function hideLoading(){

    const loadings = document.getElementsByClassName("loading");
    if (loadings.length){
        loadings[0].remove();
    }

}