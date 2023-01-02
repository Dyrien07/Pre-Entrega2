
import firebase from "firebase-admin";
import {readFileSync} from "fs";


const dbCount = JSON.parse(readFileSync("../FirebaseKey.json"));
console.log(dbCount);

firebase.initializeApp({
    credentials: firebase.credential.cert(dbCount),
    databaseURL: "https://preentregafinalbck.firebase.io"
});
console.log("Coneccion realizada");




export const getAll = async () => {
    const db = firebase.firestore();
    const query = db.collection("productos");
    try{
        const querySnapshot = await query.get();
        let docs = querySnapshot.docs;
        const response = docs.map((doc)=>({
            id: doc.id,
            codigo: doc.data().codigo,
            descripcion: doc.data().descripcion,
            nombre: doc.data().nombre,
            precio: doc.data().precio,
            stock: doc.data().stock,
            thumbnail: doc.data().thumbnail,
            timestamp: doc.data().timestamp
        }))
        console.log(response);
        return response;
    }catch(e){
        console.log(e);
    }
}; 
export const addProduct = async (unProducto) => {
    const db = firebase.firestore();
    const query = db.collection("productos");
    try{
        const doc =  query.doc();
        await doc.create(unProducto);

    }catch(err){
        console.log(err)
    }
};

export const getByID = async(ID) =>{
    const db = firebase.firestore();
    const query = db.collection("productos");
    const doc =   query.doc(`${ID}`);
    const unProducto = await doc.get();
    const productoEncontrado = unProducto.data();
    console.log(productoEncontrado);
    return productoEncontrado;
};

export const updateProduc  = async(ID,producto)=>{
    const db = firebase.firestore();
    const query = db.collection("productos");
    const doc =   query.doc(`${ID}`);
    await doc.update(producto)

};

export const deleteProducto = async(ID) =>{
    const db = firebase.firestore();
    const query = db.collection("productos");
    const doc = query.doc(`${ID}`);
    await doc.delete();

};
