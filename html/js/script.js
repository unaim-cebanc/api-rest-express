document.querySelectorAll("form").forEach((form) => {
    form.addEventListener("submit", async (e) => {
        e.preventDefault();
        
        const num = document.getElementById('id_get');
        const id = num.valueAsNumber;
        const metodo = form.dataset.method;
        
        console.log(metodo);
        
        if (metodo === 'GET') {
            const url = `/productos/${id}`;
            cargarProducto(url);
        }
        
        if (metodo === 'POST') {
            const url = '/api/productos'
            añadirProducto(url);
        }
    });
});

async function cargarDatos() {
    const respuesta = await fetch('/api/productos');
    const productos = await respuesta.json();
    const contenedor = document.getElementById('contenedor_todos');
    productos.forEach(producto => {
        const ul = document.createElement('ul');
        Object.entries(producto).forEach(([clave, valor]) => {
            const li = document.createElement('li');
            li.textContent = `${clave}: ${valor}`
            ul.appendChild(li);
        });
        contenedor.appendChild(ul);
        const p = document.createElement('p');
        p.textContent = '-'.repeat(20);
        contenedor.appendChild(p);
    });
}

async function cargarProducto(url) {
    const respuesta = await fetch(url);
    const producto = await respuesta.json();
    const contenedor = document.getElementById('contenedor_busqueda');
    contenedor.replaceChildren();
    
    const ul = document.createElement('ul');
    Object.entries(producto).forEach(([clave, valor]) => {
        const li = document.createElement('li');
        li.textContent = `${clave}: ${valor}`;
        ul.appendChild(li);
    });
    contenedor.appendChild(ul);
}

async function añadirProducto(url) {
    const respuesta = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            nombre: document.getElementById('nombre_post').value,
            precio: Number(document.getElementById('precio_post').value),
            categoriaId: Number(document.getElementById('categoriaId_post').value)
        })
    });
    const label = document.getElementById('respuesta_post');
    label.textContent = respuesta.status.toString();
}

cargarDatos();