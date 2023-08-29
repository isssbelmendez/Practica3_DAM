//Referencias de elemtnos del formulario y tabla
const btnAgregar = document.querySelector('#btn-agregar');
const btnEditar = document.querySelector('#btn-editar');
const btnEliminar = document.querySelector('#btn-eliminar');
const btnActualizar = document.querySelector('#btn-actualizar');

//Referenciando campos de formulario
const idPersona = document.querySelector("#id-persona");
const nombre = document.querySelector("#nombre");
const apellido = document.querySelector("#apellido");
const genero = document.querySelector("#genero");
const fecha = document.querySelector("#fecha");

//Referenciando elementos de la tabla
const filas = document.querySelector("#filas-personas");

//Objetos para almacenar datos de las personas
const personas = {
    data: [],
    nextId: 0,
    add: function(persona) {
        this.nextId++
        persona.id = this.nextId;
        this.data.push(persona);
    }
};

//Variable para buscar la persona en edicion
let personaEditar = null;

//Funcion para llenar el formulario con los datos de la persona al hacer click en "Editar"
function getDataEdit(id){
    personaEditar = personas.data.find(persona => persona.id === id);
    
    idPersona.value = personaEditar.id;
    nombre.value = personaEditar.nombre;
    apellido.value = personaEditar.apellido;
    genero.value = personaEditar.genero;
    fecha.value = personaEditar.fecha;

    btnEditar.removeAttribute('disable');
    btnAgregar.setAttribute('disable', true);
}

// Evento del boton "Agregar"
btnAgregar.addEventListener('click', function() {
    if (nombre.value === '' || apellido.value === '') {
        return;
    }

    const persona = {
        nombre: nombre.value,
        apellido: apellido.value,
        genero: genero.value,
        fecha: fecha.value
    };

    personas.add(persona);

    mostrarPersonas();
    limpiarFormulario();
});

//Evento para el boton "Editar"
btnEditar.addEventListener('click', function() {
    if (!personaEditar) {
        return;
    }

    personaEditar.nombre = nombre.value;
    personaEditar.apellido = apellido.value;
    personaEditar.genero = genero.value;
    personaEditar.fecha = fecha.value;

    personaEditar = null; //Limpia la persona en edicion
    btnEditar.setAttribute('disable', true);
    btnAgregar.removeAttribute('disable');

    mostrarPersonas();
    limpiarFormulario();
});

//Evento para el boton "Eliminar"
btnEliminar.addEventListener('click', function(){
    if(!personaEditar) {
        return;
    }

    const index = personas.data.findIndex(persona => persona.id === personaEditar.id);
    if (index !== -1){
        personas.data.splice(index, 1);
        mostrarPersonas();
        limpiarFormulario();
    }
});

//Funcion para mostrar personas en la tabla 
function mostrarPersonas() {
    filas.innerHTML = '';
    personas.data.forEach(persona => {
        filas.innerHTML += `
            <tr>
                <td>${persona.id}</td>
                <td>${persona.nombre}</td>
                <td>${persona.apellido}</td>
                <td>${persona.genero}</td>
                <td>${persona.fecha}</td>
                <td>
                    <button class="btn btn-primary" onclick="getDataEdit(${persona.id})" >Editar</button>
                    <button class="btn btn-danger" onclick="eliminarPersona(${persona.id})" >Eliminar</button> 
                </td>
            </tr>
        `;
    });
}

//Funcion para eliminar una persona de la lista
function eliminarPersona(id) {
    const index = personas.data.findIndex(persona => persona.id === id);
    if (index !== -1) {
        personas.data.splice(index, 1);
        mostrarPersonas();
        limpiarFormulario();
    }
}

//Funcion para limpiar los campos del formulario
function limpiarFormulario(){
    idPersona.value = '';
    nombre.value = '';
    apellido.value = '';
    genero.value = '';
    fecha.value = '';
}

