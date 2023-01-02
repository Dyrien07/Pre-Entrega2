
import firebase from "firebase-admin";
import { readFileSync } from "fs";

const dbCount = JSON.parse(readFileSync("../FirebaseKey.json"));
console.log(dbCount);

firebase.initializeApp({
  credentials: firebase.credential.cert(dbCount),
  databaseURL: "https://preentregafinalbck.firebase.io",
});
console.log("Coneccion realizada");

export const getCarritosAll = async () => {
  const db = firebase.firestore();
  const query = db.collection("carritos");
  try {
    const querySnapshot = await query.get();
    let docs = querySnapshot.docs;
    const response = docs.map((doc) => ({
      id: doc.id,
      timestamp: doc.data().timestamp,
      productos: doc.data().productos,
    }));
    return response;
  } catch (e) {
    console.log(e);
  }
};

export const getCarritosByID = async (ID) => {
  try {
    const db = firebase.firestore();
    const query = db.collection("carritos");
    const doc = query.doc(`${ID}`);
    const carrito = await doc.get();
    const respuesta = carrito.data();
    return respuesta;
  } catch (e) {
    console.log(e);
  }
};

export const addCarrito = async (carrito) => {
  try {
    const db = firebase.firestore();
    const query = db.collection("carritos");
    const doc = query.doc();
    await doc.create(carrito);
  } catch (e) {
    console.log(e);
  }
};

export const updateCarrito = async (ID,prdocto) => {
    try{
        const db = firebase.firestore();
        const query = db.collection("carritos");
        const doc = query.doc(`${ID}`);
        await doc.update(prdocto);


    }catch (e) {
        console.log(e);
    }

};

export const deleteCarrito = async (ID) => {
    try{
        const db = firebase.firestore();
        const query = db.collection("carritos");
        const doc = query.doc(`${ID}`);
        await doc.delete();
    }catch (e){
        console.log(e);
    }

};
export const deleteProductoCarrito = async (ID,prdocto) => {
    const db = firebase.firestore();
    const query = db.collection("carritos");
    const doc = query.doc(`${ID}`);
    await doc.delete(prdocto);

};
