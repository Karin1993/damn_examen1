const express = require('express');
const app = express();
const puerto = process.env.PORT || 3003;
app.use(express.json())

//Arreglo de objeto de eventos
let eventos = [
    {id:1, titulo_evento:"Examen departamental", fecha_hora:"26/09/23 1:00pm", lugar:"Zacatecas, Zac"},
];

//Obtener lista de todos los eventos
app.get('/socios/v1/eventos', (req, res)=>{
    //Verificar si existen eventos
    if(eventos.length>0){
        res.status(200).json({
            estado:1,
            mensaje:"Existen eventos",
            eventos: eventos
        })
    }else{
        res.status(404).json({
            estado:0,
            mensaje:"No existen eventos",
            eventos: eventos
        })
    }
    //Si existen, mostrar estado y mensaje
})

//Obtener evento por su id
app.get('/socios/v1/eventos/:id', (req, res)=>{
    //Solo un evento
    const id = req.params.id;
    //Programación Funcional
    const evento = eventos.find(evento=>evento.id==id)
    //Si se encontró un evento
    if(evento){
        res.status(200).json({
            estado:1,
            mensaje:"Evento encontrado",
            evento:evento
        })
        
    }else{
        //No se encontró un evento
        res.status(404).json({
            estado:0,
            mensaje:"No se encontró el evento",
            categoria:{}
        })  
    }
    //Programación Estructurada
    for(let i = 0; i < array.length; i++){
        const element = array[i];
    }

    res.send('Mostrar un evento por su id');
})

//Agregar nuevo evento
app.post('/socios/v1/eventos', (req, res)=>{
    //Crear un recurso - evento
    //id = Generar un número aleatorio 
    //Nombre y descripción = Body
    const{titulo_evento, fecha_hora, lugar} = req.body;
    const id = Math.round(Math.random()*1000);
    //Comprobar que el cliente(navegador) = usuario = programador
    if(titulo_evento==undefined || fecha_hora==undefined || lugar==undefined){
        //Hay un error en la solicitud por parte del usuario
        res.status(400).json({
            estado:0,
            mensaje:"BAD REQUEST - Favor de llenar los campos correctamente"
        })
    }else{
        //En javascript como agregar un nuevo elemento a un arreglo
        const evento = {id:id, titulo_evento:titulo_evento, fecha_hora:fecha_hora, lugar:lugar};
        const longitudInicial = eventos.length;
        eventos.push(evento)
        if(eventos.length > longitudInicial){
            //Si se agregó un evento todo OK
            res.status(201).json({
                estado:1,
                mensaje:"Evento creado",
                evento:evento
            })
        }else{
            //Error del servidor al no poder crearse el evento
            res.status(500).json({
                estado:0,
                mensaje:"Evento no creado por un error desconocido",
                evento:evento
            })
        }
    }
    res.send('Crear una evento');
})

//Actualizar un evento por su id
app.put('/socios/v1/eventos/:id', (req, res)=>{
    //Actualizar un recurso - Actualizar una categoria
    const {id} = req.params;
    const {titulo_evento,fecha_hora,lugar} = req.body;
    if(titulo_evento==undefined || fecha_hora==undefined || lugar==undefined)
    {
        res.status(400).json({
            estado:0,
            mensaje:"Faltan parámetros en la solicitud"
        })
    }
    else
    {
        const posActualizar = eventos.findIndex(evento => evento.id==id)
        if(posActualizar!= -1)
        {
            //Si encontro la categoria con el id buscado
            //Actualizar la categoria
            eventos[posActualizar].titulo_evento=titulo_evento;
            eventos[posActualizar].fecha_hora=fecha_hora;
            eventos[posActualizar].lugar=lugar;
            res.status(200).json({
                estado: 1,
                mensaje: "Evento actualizado",
                evento: eventos[posActualizar]
            })            
        }
        else
        {
            //No se encontro el evento del id buscado
            res.status(404).json({
                estado:0,
                mensaje:"Evento no encontrado"
            })
        }
    }
     res.send('Actualizar un evento por su id');
})

//Eliminar un evento por su id
app.delete('/socios/v1/eventos/:id', (req, res)=>{
    const id = req.params.id;
    const eventoToDelete = eventos.find(evento => evento.id == id);
    //Verificar si el evento existe
    if (!eventoToDelete) {
        return res.status(404).json({
            estado:0,
            mensaje:"Evento no encontrado",
            evento: {}
        });
    }
    // Realizar la eliminación del evento
    const indice = eventos.indexOf(eventoToDelete);
    eventos.splice(indice, 1);

    res.status(200).json({
        estado: 1,
        mensaje: "Evento eliminado con éxito",
        evento: eventoToDelete
    });
})

app.listen(puerto,()=>{
    console.log('Servidor corriendo en el puerto: ', puerto);

})