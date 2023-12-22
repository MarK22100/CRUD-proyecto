
export function validarinputRequerido(input){
    if (input.value.trim().length>3  && input.value.trim().length <= 30) {
        input.className ="form-control is-valid"
        return true;
    }
    else{
        input.className ="form-control is-invalid"
        return false;
    }
}

export function validarInpDescrip(input){
    if(input.value.trim().length >= 10 && input.value.trim().length <= 200){
        input.className='form-control is-valid';
        return true;
    }else{
        input.className='form-control is-invalid';
        return false
    }
}
export function validarInpPrecio(input){
    const regExPrecio=/^(\d{1,9}(?:\,\d{1,2})?|\d{1,2}(?:\,\d{1,2})?)$/;
    if (regExPrecio.test(input.value)) {
        input.className='form-control is-valid';
        return true;
    }else{
        input.className='form-control is-invalid';
        return false;
    }
}
export function validarImgUrl(input){
    const regExURL=/^https?:\/\/[\w\-]+(\.[\w\-]+)+[/#?]?.*$/;

    if (regExURL.test(input.value)) {
        input.className='form-control is-valid';
        return true;
    }else{
        input.className='form-control is-invalid';
        return false;
    }

    
}
export function validarTodo(inpCodigo, inpNombre, inpDescripcion, inpPrecio, inpUrl){
    if (validarinputRequerido(inpCodigo)&&validarinputRequerido(inpNombre)&&validarInpDescrip(inpDescripcion)&&validarInpPrecio(inpPrecio)&&validarImgUrl(inpUrl)) {
        return true;
    }else{
        return false;
    }
}
// export function generarCodigo() {
//     let codigosGenerados = new Set(JSON.parse(localStorage.getItem('codigosGenerados')) || []);
    
//     let codigo;
//     do {
//         codigo = Math.floor(0 + Math.random() * 9999);
//     } while (arrPr.has(codigo));
    
//     codigosGenerados.add(codigo);
//     localStorage.setItem('codigosGenerados', JSON.stringify(Array.from(codigosGenerados)));
//     return codigo;
// }