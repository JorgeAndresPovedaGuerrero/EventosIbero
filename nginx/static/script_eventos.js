async function crearEvento() {
    let nombre = document.getElementById("nombre").value
    let fecha = document.getElementById("fecha").value
    let lugar = document.getElementById("lugar").value

    await fetch(`/events/eventos?nombre=${encodeURIComponent(nombre)}&fecha=${fecha}&lugar=${encodeURIComponent(lugar)}`, {
        method: 'POST'
    });

    cargarEventos()
}

async function editarEventos(id) {
    const nuevoNombre = prompt("Nuevo nombre del evento: ")
    const nuevaFecha = prompt("Nueva fecha (YYY-MM-DD): ")
    const nuevoLugar = prompt("Nuevo lugar del evento: ")

    await fetch(`/events/eventos/${id}?nombre=${encodeURIComponent(nuevoNombre)}&fecha=${encodeURIComponent(nuevaFecha)}&lugar=${encodeURIComponent(nuevoLugar)}`,{
        method: 'PUT'
    })
    cargarEventos()
}

async function eliminarEventos(id) {
    if(confirm("¿Estas seguro que quieres eliminar este evento?")){
        await fetch(`/events/eventos/${id}`, {
            method: 'DELETE'
        })
        cargarEventos()
    }
}

function cerrarSesion(){
    window.location.href = "index.html"
}

async function cargarEventos() {
    const resp = await fetch('/events/eventos')
    const eventos = await resp.json()
    let divEventos =  document.getElementById("eventos")
    divEventos.innerHTML = ""
    eventos.forEach(ev => {
        divEventos.innerHTML += `
        <div class="evento">
            <strong>${ev.nombre}</strong><br>
            📅 ${ev.fecha} -  ${ev.lugar}<br>
            <button onclick="editarEventos('${ev._id}')">🖋️ Editar</button>
            <button onclick="eliminarEventos('${ev._id}')" style="background:red;">🚮 Eliminar</button>
        </div>
        `
    })
}

cargarEventos()

