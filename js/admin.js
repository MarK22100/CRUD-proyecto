import { validarImgUrl, validarInpDescrip, validarInpPrecio, validarTodo, validarinputRequerido } from "./hellpers.js";

let arrProductos = JSON.parse(localStorage.getItem('productos')) || [];
let bodyTabla =  document.querySelector('tbody')
let inpCodigo = document.getElementById('codigo');
let inpNombre = document.getElementById('nombre');
let inpDescrip = document.getElementById('descripcion');
let inpPrecio = document.getElementById('precio');
let inpImgProd = document.getElementById('imgProd');

inpCodigo.value=generarCodigo();

let form = document.querySelector('form');

console.log(form);


form.addEventListener('submit', guardarProducto);

inpCodigo.addEventListener('blur',()=>{
   validarinputRequerido(inpCodigo);
});

inpNombre.addEventListener('blur',()=>{
    validarinputRequerido(inpNombre);
})
inpDescrip.addEventListener('blur',()=>{
    validarInpDescrip(inpDescrip);
})
inpPrecio.addEventListener('blur',()=>{
   validarInpPrecio(inpPrecio);
})
inpImgProd.addEventListener('blur',()=>{
    validarImgUrl(inpImgProd)
})

ListarProductos();

let esEdicion = false

function guardarProducto(e){
    e.preventDefault(); 

    if (validarTodo(inpCodigo, inpNombre, inpDescrip, inpPrecio, inpImgProd)) 
    {
        if (esEdicion) {
            guardarProductoEditado();
        }
        else{
            crearProducto();
        }
    }
    else{
        Swal.fire({
            title: "Ups",
            text: "Todos los campos son requeridos",
            icon: "error"
          });
    }
}

function crearProducto(){
    const nuevoProducto = {
       codigo : inpCodigo.value,
       nombre : inpNombre.value,
       descripcion : inpDescrip.value,
       precio : inpPrecio.value,
       imgProd : inpImgProd.value

    };
    arrProductos.push(nuevoProducto);
    Swal.fire({
        title: "Exito",
        text: "El producto se guardo correctamente",
        icon: "success"
      });
    LimpiaFormulario();
    ListarProductos();
}
function guardarProductoEditado(){
    let indexProducto = arrProductos.findIndex((element) => {
      return element.codigo === inpCodigo.value;
    });
    if (indexProducto !== -1) {
      Swal.fire({
        title: "¿Estas seguro?",
        text: "Vas a cambiar los datos de un producto",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Guardar",
        cancelButtonText: "Cancelar",
      }).then((result) => {
        if (result.isConfirmed) {
          arrProductos[indexProducto].codigo = inpCodigo.value;
          arrProductos[indexProducto].nombre = inpNombre.value;
          arrProductos[indexProducto].descripcion = inpDescrip.value;
          arrProductos[indexProducto].precio = inpPrecio.value;
          arrProductos[indexProducto].imgProd = inpImgProd.value;
          esEdicion = false;
          Swal.fire({
            title: "Exito",
            text: "El producto se actualizo correctamente",
            icon: "success",
          });

          LimpiaFormulario();
          ListarProductos();
        } else {
          esEdicion = false;
          LimpiaFormulario();
        }
      });
    } else {
      console.log(
        "entro en el else de guardar producto editado por q el codigo no existe dentro del arrProductos"
      );
    }
    }


function LimpiaFormulario(){
    form.reset()
    inpCodigo.className='form-control'
    inpCodigo.value = generarCodigo();
    inpNombre.className='form-control'
    inpDescrip.className='form-control'
    inpPrecio.className='form-control'
    inpImgProd.className='form-control'
    GuardarLocalStorage();

}

function GuardarLocalStorage(){
    localStorage.setItem('productos', JSON.stringify(arrProductos));
}
function ListarProductos(){
    bodyTabla.innerHTML="";
    arrProductos.forEach(element => {
        bodyTabla.innerHTML+=`
        <tr class="align-middle">
        <th class="fw-2" scope="row">1</th>
        <td>${element.codigo}</td>
        <td>${element.nombre}</td>
        <td>${element.descripcion}</td>
        <td class="text-wrap">${element.precio}</td>
        <td class="text-wrap"><a href="${element.imgProd}">Ver imagen</td>
        <td class="d-md-grid row-gap-3">
            <button href="#titulo" type="button" class="btn btn-warning" onclick="Edicion('${element.codigo}')">EDITAR</button>
            <button type="button" class="btn btn-danger" onclick="BorrarProducto('${element.codigo}')">BORRAR</button>
        </td>
        </tr>`
    });

    window.Edicion = function(codigo){
        const prodEditar = arrProductos.find((element) =>
        {
            return element.codigo === codigo;
        });

        if (prodEditar !== undefined) {
            inpCodigo.value= prodEditar.codigo;
            inpNombre.value= prodEditar.nombre;
            inpDescrip.value= prodEditar.descripcion;
            inpPrecio.value= prodEditar.precio;
            inpImgProd.value= prodEditar.imgProd;
        }
        esEdicion = true
    }
}

window.BorrarProducto = function(codigo){
    Swal.fire({
        title: "¿Estas seguro?",
        text: "Los cambios no se podrán revertir",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Eliminar",
        cancelButtonText: "Cancelar",
      }).then((result) => {
        if (result.isConfirmed) {
          const nuevoArrProductos = arrProductos.filter(
            (element) => element.codigo !== codigo
          );
          arrProductos = nuevoArrProductos;
          Swal.fire({
            title: "Exito",
            text: "El producto se elimino correctamente",
            icon: "success",
          });
          GuardarLocalStorage();
          ListarProductos();
        }
      });
}

function generarCodigo() {
    let codigo;
    let codigosGenerados = arrProductos.map((element) => element.codigo);
    
    do {
        codigo = Math.floor(0 + Math.random() * 9999);
    } while (codigosGenerados.includes(codigo));
    
    return codigo;
}