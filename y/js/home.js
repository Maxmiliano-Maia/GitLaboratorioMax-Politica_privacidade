function logout(){
    firebase.auth().signOut().then(()=>{
        window.location.href = "../../index.html";
    }).catch(()=>{
        alert('Erro ao fazer logout');
    })  
}


firebase.auth().onAuthStateChanged(user=>{
    if (user){
         findtransactions(user);
    }
})

function newTransaction(){
    window.location.href = "../transaction/transaction.html"
}

function game(){
    window.location.href = "../game/RTS_Ecomerce.html"
}


function findtransactions(user){
    showLoading();
    firebase.firestore()
        .collection('transactions')
        .where('user.uid', '==', user.uid)
        .orderBy('date','desc')
        .get()
        .then(snapshot=>{
                hideLoading();
                const transaction = snapshot.docs.map(doc => doc.data());
                console.log(transaction)
                addTransactionsToScreen(transaction);
    })
    .catch(error => {
        hideLoading();
        console.log(error);
        console.log("O usuário logado é "+user.uid);
        alert('Erro ao recuperar transações');
    })
}


function addTransactionsToScreen(transaction){
    const orderedList = document.getElementById('transactions');

    transaction.forEach(transaction=>{
        const li = document.createElement('li');
        li.classList.add(transaction.type);

        const date = document.createElement('p');
        date.innerHTML = formatdate(transaction.date);
        li.appendChild(date);

        const money = document.createElement('p');
        money.innerHTML = formatMoney(transaction.money);
        li.appendChild(money);

        const type = document.createElement('p');
        type.innerHTML = transaction.type;
        li.appendChild(type);

        if (transaction.description){
            const description = document.createElement('p');
            description.innerHTML = transaction.description;
            li.appendChild(description);
           
        }
        orderedList.appendChild(li);
       
    });
}

function formatdate(date){
    return new Date(date).toLocaleDateString('pt-br');
}

function formatMoney(money){
    return `${money.currency} ${money.value}`;
}

