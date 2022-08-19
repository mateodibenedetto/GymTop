/* <======== Variables ========> */
const d = document,
    main = d.getElementById('main');
let cantidad = 1;



/* <========  Mostrar Inicio ========> */
function getInicio() {
    let home = d.createElement('section')
    home.classList.add('home');
    main.innerHTML = ""; 
    home.innerHTML = `<div class="container-home">
        <div class="title">
            <h2 class="h2">GymTop</h2>
            <h5 class="desc">Productos deportivos para tu casa</h5>
        </div>
    </div>
    `;
    main.appendChild(home);
    
}

/* <========  Mostrar Catalogo ========> */
async function getCatalogo() {
    let catalogo = d.createElement('section')
    catalogo.classList.add('productos'); 
    main.innerHTML = ""; 

    try {
        let res = await fetch('./productos.json');
        let json = await res.json();

        json.forEach(el => {
            let cards = d.createElement('div'); 
            cards.className = `producto`; 
            cards.innerHTML = ` 
            ${el.img}
            <h5 class="nombre">${el.title}</h5> 
            <button class="btn-agregar" id="${el.id}">Ver Producto</button>  
            `
            catalogo.appendChild(cards);
        })
        main.appendChild(catalogo); 

    } catch (err) {
        console.log(err);
    }
}

/* <========  Mostrar Producto ========> */
async function mostrarProducto(e) {
    let sectionProducto = d.createElement('section');
    sectionProducto.classList.add('productos');
    main.innerHTML = ""; 

    let card = d.createElement('div');
    card.classList.add('card-container');

    try {
        let res = await fetch('./productos.json');
        let json = await res.json();

        json.forEach(el => {
            if(e.target.id == el.id) {
                card.innerHTML = `
                <div class="btn-back-container">
                <button id="btnBack" class="btn-back"><</button>
                </div>
                <div class="card">
                    <p>${el.img}</p>
                    <h5 class="nombre">${el.title}</h5>
                    <p class="precio">$${el.price}</p>
                    <button id="${el.id}" class="btn">Agregar<span class="material-symbols-outlined">shopping_cart</span></button>
                    </div>   
                </div>  
            
            `
            sectionProducto.appendChild(card);
            
            main.appendChild(sectionProducto);
            }
        })

        let btnAgregar = document.querySelector('.btn');
        let productosLS = JSON.parse(localStorage.getItem('carrito'));
        productosLS.forEach((e) =>  {
            if(e.id === btnAgregar.id) {
                btnAgregar.classList.add('btn-agregado');
                btnAgregar.disabled = true;
                btnAgregar.textContent = "Agregado";
            }
        })

    } catch (error) {
        console.log(error);
    }

}

/******** EVENTOS ********/
d.getElementById('inicio').addEventListener('click',  getInicio);

d.addEventListener('click', (e) => {
    if(e.target.matches('#inicio')) getInicio();
       
    if(e.target.matches('#catalogo') || e.target.matches('#btnBack')) getCatalogo();  

    if(e.target.matches('.btn-agregar')) mostrarProducto(e); 
});


