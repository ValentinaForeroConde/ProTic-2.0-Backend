import {connect} from 'mongoose';

const conectarBD = async() =>{
    return await connect(
        'mongodb+srv://Valentina:vale1234@cluster0.md5zw.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
        ).then(()=>{
            console.log("Conexion exitosa");
        })
        .catch((e) => {
            console.log("Error conectando a la bd", e );
        });
    };
    
export default conectarBD;
