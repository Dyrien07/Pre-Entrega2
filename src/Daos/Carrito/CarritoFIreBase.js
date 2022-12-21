import firebase from "firebase-admin";
import {readFileSync} from "fs";


const dbCount = JSON.parse(readFileSync("../FirebaseKey.json"));
console.log(dbCount);

firebase.initializeApp({
    credentials: firebase.credential.cert(dbCount),
    databaseURL: "https://preentregafinalbck.firebase.io"
});
console.log("Coneccion realizada");

export const getCarritosAll  = async() =>{
    const db = firebase.firestore();
    const query = db.collection("carritos");
    try{
        const querySnapshot = await query.get();
        let docs = querySnapshot.docs;
        const response = docs.map((doc)=>({
            id: doc.id,
            timestamp: doc.data().timestamp,
            productos: doc.data().productos
        }));
        return response;
    }catch(e){
        console.log(e);
    }
}

export const getCarritosByID = async() =>{

};

export const addCarrito = async()=>{

};

export const updateCarrito = async()=>{

};

export const deleteCarrito = async() =>{

};
export const deleteProductoCarrito = async() =>{
    
};


