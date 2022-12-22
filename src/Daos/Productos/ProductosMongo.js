import mongoose from 'mongoose';
import { modeloProductos } from '../mongo/scripts/scripts.js';

const mongoURL = "mongodb+srv://Dyrien07:Nacho115173@cluster0.pvolnwm.mongodb.net/Ecommers?retryWrites=true&w=majority"



mongoose.connect(mongoURL,{
    useNewUrlParser: true,
    useUnifiedTopology: true
}, error=>{
    if(error) return console.log(error);
    console.log("Coneccion Exitosa");
})

const addProduct = async()=>{

};

const deleteProduct = async()=>{

};
const updateProduct = async()=>{

};

const getProduct = async()=>{

};

const getAllProduct = async()=>{
let preductos = await modeloProductos.find();
console.log(preductos)
};

