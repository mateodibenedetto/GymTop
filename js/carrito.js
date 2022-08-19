/* <======== Carrito ========> */
let carrito = [];
carrito = JSON.parse(localStorage.getItem('carrito')) || [];


/* <======== Mostrar Carrito ========> */
function mostrar_carrtito() {

  main.innerHTML = "";
  let container = document.createElement('div');
  container.classList.add('carrito');
  let containerCarrito = document.createElement('div');
  containerCarrito.classList.add('checkout-container');
  let footerCarrito = document.createElement('div');
  footerCarrito.classList.add('footerCarrito');
  container.innerHTML = `<h2 class="h2">Checkout</h2>`;

  carrito.forEach(e => {
    containerCarrito.innerHTML += ` 
            <div class="producto">
                <div class="btn-container-borrar">
                    <button id="${e.id}" class="btn-borrar">X</button>
                </div>
                <div class="listaProducto">
                    <img class="img" src="${e.img}">
                    <h4>${e.nombre}</h4>
                    <p class="precio">${e.precio}</p>
                     
                </div>
                <div class="cantidad">
                <span class="menos">-</span><p class="p">${cantidad}</p><span class="mas">+</span>
                </div>  
            </div>
       
           `;
    container.appendChild(containerCarrito);

  })

  container.appendChild(footerCarrito);

  main.appendChild(container);


  footerCarrito.innerHTML = '';

  if (carrito.length === 0) {
    footerCarrito.innerHTML = '<h2 class="empty">El carrito está vacío, agregue algo para llenarlo</h2>';
  }
  if (carrito.length > 0) {
    footerCarrito.innerHTML += `
      <div class="total">Total a pagar: $<span id="suma_total"></span></div>
      <div class="opciones">
          <button id="btn-compra" class="btn-compra">Finalizar Compra</button>
          <button id="borrar-todo" class="btn-borrar-todo">Eliminar Todo</button>
      </div>
      `;

    let botones_borrar = document.querySelectorAll('.btn-borrar');

    for (const boton of botones_borrar) {
      boton.addEventListener('click', borrar_producto);
    }
   
    actualizar_total_carrito()

    }
}

/* <========  Agregar Carrito ========> */
function agregar_carrito(e) {

  let hijo = e.target,
    padre = hijo.parentNode.parentNode;

  let id = padre.querySelector(".btn").id,
    nombre_producto = padre.querySelector('.nombre').textContent,
    precio = padre.querySelector('.precio').textContent,
    img = padre.querySelector('img').src;

  let producto = {
    id,
    nombre: nombre_producto,
    precio,
    cantidad: 1,
    img
  }

  carrito.push(producto);

  let arr_json = JSON.stringify(carrito);
  localStorage.setItem("carrito", arr_json);

}

/* <========  Actualizar Precio Total ========> */
function actualizar_total_carrito() {
  let total = 0;
  const totalCarrito = document.getElementById('suma_total');
  const itemsCarrito = document.querySelectorAll('.producto');

  itemsCarrito.forEach(item => {
    const precioItemEl = item.querySelector('.precio');
    const precioItem = Number(precioItemEl.textContent.replace('$', ''));
    const cantidadItemEl = item.querySelector('.p');
    const cantidadItem = Number(cantidadItemEl.textContent); 

    total = total + precioItem * cantidadItem; 
  });

  totalCarrito.innerHTML = `${Math.round(total)}`;
}

/* <========  Borrar Producto ========> */
function borrar_producto(e) {
  let producto = e.target.parentNode.parentNode
  producto.remove();

  let productosLS = JSON.parse(localStorage.getItem('carrito'));
  if (productosLS) {
    let newProductos = productosLS.filter(producto => producto.id !== e.target.id);
    localStorage.setItem('carrito', JSON.stringify(newProductos));

    Swal.fire(
      'Borrado exitosamente!',
      'Ha borrado el item del carrito.',
      'success'
    )
  }
  actualizar_total_carrito()
}

/* <========  Borrar Todo ========> */
function borrar_todo() {
  localStorage.removeItem("carrito");
}

/* <========  Aumentar Cantidad de productos ========> */
function aumentar_cantidad_productos(e) {
  let cantidad = Number(e.target.parentNode.querySelector('.p').textContent);
  cantidad++;
  e.target.parentNode.querySelector('.p').textContent = cantidad;
  actualizar_total_carrito();
}

/* <========  Disminuir Cantidad de productos ========> */
function disminuir_cantidad_productos(e) { 
  let cantidad = Number(e.target.parentNode.querySelector('.p').textContent);
  cantidad--;
  cantidad <= 0 ? (cantidad = 1) : null;
  e.target.parentNode.querySelector('.p').textContent = cantidad;
  actualizar_total_carrito();
}

/* <========  Mostrar Formulario ========> */
function mostrar_formulario() {
  let form = d.createElement('form');
  form.classList.add('contact-form');
  main.innerHTML = "";

  form.innerHTML = `
    <legend>Completa el formulario para finalizar la compra</legend>
      <input
        class="input"
        type="text"
        name="name"
        placeholder="Escribe tu nombre"
        title="Nombre sólo acepta letras y espacios en blanco"
        pattern="^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\\s]+$"
        required
      />
      <input
        class="input"
        id="mail"
        type="email"
        name="email"
        placeholder="Escribe tu email"
        title="El Email no es valido"
        pattern="^[a-z0-9]+(\\.[_a-z0-9]+)*@[a-z0-9-]+(\\.[a-z0-9-]+)*(\\.[a-z]{2,15})$"
        required
      />
      <textarea
        name="comments"
        cols="50"
        rows="5"
        placeholder="Escribe alguna aclaracion si quieres..."
        title="Tu comentario no debe exceder los 255 caracteres"
        data-pattern="^.{1,255}$" 
      ></textarea>
      <input class="btn-enviar" type="submit" value="Enviar" />
      <div class="contact-form-loader none">
        <img class="loader" src="./imgs/loader.svg" alt="Cargando" />
      </div>
    `;
  main.appendChild(form);

  function validationsForm() {
    const $form = d.querySelector(".contact-form"),
      $inputs = d.querySelectorAll(".contact-form [required]"),
      $mail = d.getElementById("mail");

    // Agregar un span debajo de cada input
    $inputs.forEach((input) => {
      const $span = d.createElement("SPAN");
      $span.id = input.name;
      $span.textContent = input.title;
      $span.classList.add("contact-form-error", "none");
      input.insertAdjacentElement("afterend", $span);
    });

    d.addEventListener("keyup", (e) => {
      if (e.target.matches(".contact-form [required]")) {
        let $input = e.target,
          pattern = $input.pattern || $input.dataset.pattern;

        if (pattern && $input.value !== "") {
          let regex = new RegExp(pattern);
          return !regex.exec($input.value) ?
            d.getElementById($input.name).classList.add("is-active") // $input.name id del span
            :
            d.getElementById($input.name).classList.remove("is-active");
        }

        if (!pattern) {
          return $input.value === "" ?
            d.getElementById($input.name).classList.add("is-active") // $input.name id del span
            :
            d.getElementById($input.name).classList.remove("is-active");
        }
      }
    });

    d.addEventListener("submit", async (e) => {
      e.preventDefault();

      const $loader = d.querySelector(".contact-form-loader"),
        $response = d.querySelector(".contact-form-response");

      $loader.classList.remove("none");

      try {
        let options = {
          method: "POST",
          headers: {
            "Content-type": "application/json; charset=utf-8"
          },
          body: new FormData(e.target)
        }
        let res = await fetch(`https://formsubmit.co/ajax/${$mail.value}`, options)
        let json = await res.json();

        if (!res.ok) throw {
          status: res.status,
          statusText: res.statusText
        };

        $loader.classList.add("none");
        Swal.fire(
          'Compra finalizada!',
          'Gracias por comprar en GymTop!',
          'success'
        )
        $form.reset();
        setTimeout(() => window.location.reload(), 4000);

      } catch (err) {
        let message = err.statusText || "Ocurrio un error al enviar intenta nuevamente";
        $response.innerHTML = `Error ${err.status}: ${message}`;
      } finally {
        setTimeout(() => {
          $response.classList.add("none");
          $response.innerHTML = "";
        }, 3000);
      }
    })
  }
  validationsForm();
}


/******** EVENTOS ********/
document.getElementById('carrito').addEventListener('click', mostrar_carrtito);

document.addEventListener('click', (e) => {

  if (e.target.matches('#carrito *')) mostrar_carrtito();

  if (e.target.matches('.btn')) {
    Swal.fire({
      title: 'Agregado!',
      text: "El producto se ha agregado al carrito",
      icon: 'success'
    })
    agregar_carrito(e);

    let btn = document.querySelector('.btn');
    btn.classList.add('btn-agregado');
    btn.disabled = true;
    btn.textContent = "Agregado";
  }

  if (e.target.matches('#borrar-todo')) {

    Swal.fire({
      title: 'Está seguro que quiere borrar todo?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Borrar',
      denyButtonText: `No Borrar`,
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire('Borrado!', '', 'success')
        borrar_todo();
        setTimeout(() => window.location.reload(), 3000);
      } else if (result.isDenied) {
        Swal.fire('No se borró el carrito', '', 'info')
      }
    })
  }

  if (e.target.matches('#btn-compra')) {
    Swal.fire({
      title: 'Desea terminar su compra?',
      text: "Presione si para continuar",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, continuar!'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Perfecto aguarde un momento, será trasladado a un formulario!',
          'Será trasladado al formulario.',
          'success'
        )

        borrar_todo();
        setTimeout(() => mostrar_formulario(), 2000);
      }
    })
  }

  if (e.target.matches('.mas')){
    aumentar_cantidad_productos(e);
  }
  
  if (e.target.matches('.menos')) {
    disminuir_cantidad_productos(e);
  }
});



