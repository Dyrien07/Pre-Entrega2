const {Productos} = require("./Clases/producto")
const {Carrito} = require("./Clases/carrito")



const express = require("express");
const app = express();
const {Router} = express;
const PORT = process.env.PORT || 8080;
const productos = new Productos(__dirname +"/Productos.txt");
const carrito = new Carrito(__dirname +"/Carrito.txt");
const fs = require("fs");
const admin = true;
const routerProductos = Router();
const routerCarrito = Router();

// Configuraciones

app.use("/api/productos",routerProductos);
app.use("/api/carrito",routerCarrito);

routerProductos.use(express.urlencoded({extended: true}));
routerProductos.use(express.json());

routerCarrito.use(express.urlencoded({extended: true}));
routerCarrito.use(express.json());

// Server ON
app.listen(PORT,()=>{console.log("Server listen on port " +PORT)});

// Peticiones 
routerProductos.get("/:id",(req,res)=>{
    res.json(productos.getById(req.params.id));
});
routerProductos.post("/",async(req,res)=>{
  if (admin){
    const result = await productos.save(req.body);
    res.json(result);
  }else{
    res.json("permiso Denegado");
  }
   
});
routerProductos.put("/",(req,res)=>{
  if(admin){
    const result = productos.updateProduct(req.body);
    res.json(result);
  }else{
    res.json("Permiso Denegado")
  }
   
});
routerProductos.delete("/:id",async(req,res)=>{
  if(admin ){
    const result = await productos.deleteById(req.params.id);
    res.json(result);
  }else{
    res.json("Permiso Denegado")
  }
   
});

routerProductos.get("/", async(req,res)=>{
   const todo = await productos.getAll();
  res.json(todo);
});

routerProductos.post("/",(req,res)=>{
    res.json({error: "Ruta invalida"});
})


routerCarrito.post("/",async(req,res)=>{
    if (admin){
    const result = await carrito.save(req.body);
    res.json(result);
    }else{
        const mensaje = {
            mensaje: "Permiso Denegado"
        }
        res.json(mensaje);

    }
});

routerCarrito.delete("/:id/productos/:idprod",async(req,res)=>{
    if (admin){
        const result = await carrito.delProdCarrito(req.params.id,req.params.idprod);
    res.json(result);
}else{
    const mensaje = {
        mensaje: "Permiso Denegado"
    
    }
    res.json(mensaje);

}

});

routerCarrito.post("/:id/productos",async(req,res)=>{
        if (admin){
        const result = await carrito.agregarProd(req.params.id,req.body);
    console.log(result);   
        res.json(result);
        }else{
            const mensaje = {
                mensaje: "Permiso Denegado", 
            }
            res.json(mensaje);
    
        }
    });

routerCarrito.get("/:id/productos",async (req,res)=>{

    res.json(await carrito.getById(req.params.id));
});