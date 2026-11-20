document.querySelectorAll("form").forEach((form) => {
    form.addEventListener("submit", async (e) => {
        e.preventDefault();
        
        const num = document.getElementById('id_get');
        const id = num.valueAsNumber;
        const url = `/productos/${id}`;
        const metodo = form.dataset.method;
        
        if (metodo === 'GET') {
            cargarProducto(url)
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
    const ul = document.createElement('ul');
    Object.entries(producto).forEach(([clave, valor]) => {
        const li = document.createElement('li');
        li.textContent = `${clave}: ${valor}`;
        ul.appendChild(li);
    });
    contenedor.appendChild(ul);
}
cargarDatos();