import mongoose from "mongoose";
import { modeloProductos } from "../mongo/scripts/scripts.js";

const mongoURL =
  "mongodb+srv://Dyrien07:Nacho115173@cluster0.pvolnwm.mongodb.net/Ecommers?retryWrites=true&w=majority";

mongoose.connect(
  mongoURL,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (error) => {
    if (error) return console.log(error);
    console.log("Coneccion Exitosa");
  }
);

export const addProduct = async (unProducto) => {
  try {
    await modeloProductos.insert(unProducto);
  } catch (err) {
    console.log(err.message);
  }
};

export const deleteProduct = async (unProducto) => {
  try {
    await modeloProductos.delete(unProducto);
  } catch (err) {
    console.log(err.message);
  }
};
export const updateProduct = async (unProducto) => {
  try {
    await modeloProductos.update(unProducto);
  } catch (err) {
    console.log(err.message);
  }
};

export const getProduct = async (ID) => {
    try {
      const unProducto =   await modeloProductos.findOne({id: ID});
        return unProducto
    }catch (err) {
        console.log(err.message);
    }

};

export const getAllProduct = async () => {
  try {
    let preductos = await modeloProductos.find();
    console.log(preductos);
  } catch (err) {
    console.log(err.message);
  }
};
