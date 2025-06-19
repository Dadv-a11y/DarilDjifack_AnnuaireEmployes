let form = document.getElementsByTagName('form')[0];
let nomError = document.getElementById('nomError');
let prenomError = document.getElementById('prenomError');
let emailError = document.getElementById('emailError');
let posteError = document.getElementById('posteError');
let submitButton = document.getElementById('submitButton');
let tableBody = document.getElementById('tableBody');
let emptyPlaceholder = document.getElementById('emptyPlaceholder');


addEventListener('submit', function(event) {
    event.preventDefault();
    let employes = JSON.parse(localStorage.getItem("list")) || [] ;
    // reinitialiser les erreurs
    nomError.textContent = '';
    prenomError.textContent = '';
    emailError.textContent = '';
    posteError.textContent = '';

    // valider les entrees
    let isValid = true;

    if (form.nom.value.trim() === '') {
        nomError.textContent = 'Le nom est requis.';
        isValid = false;
    }
    
    if (form.prenom.value.trim() === '') {
        prenomError.textContent = 'Le prénom est requis.';
        isValid = false;
    }
    
    if (form.email.value.trim() === '' || !form.email.value.includes('@')) {
        emailError.textContent = 'L\'email est requis et doit être valide.';
        isValid = false;
    }
    
    if (form.poste.value.trim() === '') {
        posteError.textContent = 'Le poste est requis.';
        isValid = false;
    }

    if (isValid) {
         emptyPlaceholder.style.display = 'none';
         let employe = { 
            id: (employes.length > 0 ? Math.max(...employes.map(e => e.id)) : 0) + 1,
            nom : form.nom.value.trim(),
            prenom : form.prenom.value.trim(),
            email : form.email.value.trim(),
            poste : form.poste.value.trim(),
        }
        employes.push(employe) ;
        localStorage.setItem("list", JSON.stringify(employes)) ;
        addEmployeeToTable(employe.nom, employe.prenom , employe.email , employe.poste , employe.id)
        
        form.reset();
    }
});

function addEmployeeToTable( nom , prenom , email , poste , id){
    let employes = JSON.parse(localStorage.getItem("list")) || [] ;
     let row = document.createElement('tr'); 
        row.id = `row-${id}`;
        row.innerHTML = `
        <td><span class="initials">${email[0]+email[1]}</span></td>
        <td>${nom}</td>
        <td>${prenom}</td>
        <td>${email}</td>
        <td>${poste}</td>
        <td>
            <button type="button" class="delete-btn">Supprimer</button>
        </td>
    `;
    
    row.querySelector('.delete-btn').addEventListener('click', function() {
        tableBody.removeChild(row);
        employes = employes.filter(emp => emp.id !==  id);
        localStorage.setItem("list", JSON.stringify(employes));
    });
    
    tableBody.appendChild(row);
}

document.addEventListener("DOMContentLoaded",()=>{
    let employes = JSON.parse(localStorage.getItem("list")) || [] ;
    if (employes.length === 0) {
        emptyPlaceholder.style.display = 'block';
    } else {
        emptyPlaceholder.style.display = 'none';
    }
    employes.forEach((employe) =>{
        addEmployeeToTable(employe.nom, employe.prenom , employe.email , employe.poste , employe.id)
    })
})