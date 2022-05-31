//Vamos a empezar a desarrollar el cliente
//Utilizaremos const porque al ser paquete no debe de modificarse 
//No se escribe en mayusculas porque no representa variable dentro del proyecto

//require trae el paquete ya que es una funcion, recibe el nombre del paquete que se instala, en este caso es axios
//Se identifica que es paquete por el simbolo de llaves antes del paquete
const axios=require('axios');

//los paquetes se usan en la parte superior del archivo 
//trabajar de forma asincrona para fail system
const fs=require('fs').promises;
//funcionalidad que genera las rutas de donde queremos alamacenar el archivo
const path =require('path');
//generar funcion que se ejecute cada vez que alguien ejecute mi index.js
const main=async()=>{
let response= await axios.get('https://rickandmortyapi.com/api/character');
//trabajar con lo anterior, desestructuramos data, y de data podemos desestructurar más completamente
let{data:{results},}=response;
//quiero obtener solo el nombre y id de los personajesy lo hare con el map
let personajes=results.map((character)=>{
    return {
        id:character.id,
        name:character.name,
        status:character.status,
        species:character.species
    };
})
//hare otro map
//el arreglo que tengo lo modifiaré para que me retorne solo los valores
.map((personaje)=>Object.values(personaje).join(","))
//agrega salto de linea en cada espacio 
//ahora se convitio en string, ya no es arreglo
.join("\n");
//encabezados
const titulos="id,name, status, species\n";
const personajesTitulos=titulos+personajes;
//forma en la que trabaja path 
//en esta trabajare una variabe global de path 
//las variables globales estan disponibles dentro de todo computador mediante node 
//console.log(path.join(__dirname,'data.csv'));//devuelve el path en el que nos encontramos y en donde queremos guardarlo

//con fs generamos un archivo, fs trabaja con promesas 
await  fs.writeFile(path.join(__dirname,'data.csv'),personajesTitulos);

//imprimir la respuesta
//console.log(personajes);
}
//lo que vamos a ejecutar simepre que alguien llame mi archivo js
main();