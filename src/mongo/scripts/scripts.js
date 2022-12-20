import mongoose from 'mongoose';

const productosCollection = "Productos";


const ProductosSchema = new mongoose.Schema({
    id:{
        type: Number,
        autoincrement: true,
    },
    title: {
        type: String,
        require:true,
    },
    price: {
        type: Number,
        require:true
},
    thumbnail:{
        type: String,
        
    }

})
 export const modeloProductos = mongoose.model(productosCollection,ProductosSchema)