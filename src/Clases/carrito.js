class Carrito{
    constructor(nombre){
this.NombreArchivo = nombre;
    }

 async save(carrito){
    try {
       const carritoTotal = await this.getAll();
       if (carritoTotal != "EL ARCHIVO ESTA VACIO" && carritoTotal !== [] ){
        const ultimoID = carritoTotal[carritoTotal.length-1].id+1;
        carrito.id = ultimoID;
        carrito.timestamp = Date.now();
        carrito.productos =[];
        carritoTotal.push(carrito);
     await   fs.promises.writeFile(this.NombreArchivo,JSON.stringify(carritoTotal,null,2));
     return carrito.id;
    }else {
        carrito.id = 1;
        carrito.timestamp = Date.now();
        carrito.productos =[];
     await   fs.promises.writeFile(this.NombreArchivo,JSON.stringify([carrito],null,2));
     return carrito.id;
    }
       

    } catch (error) {
        return "el carrito no se puede grabar"
    }
 }


  async getAll(){
  try {
    const resultado = await fs.promises.readFile(this.NombreArchivo,"utf-8");
  if (resultado.length > 0){
    const carritoJson = JSON.parse(resultado);
    return carritoJson;    
  
  } else{
    console.log("no hay productos");
    return "EL ARCHIVO ESTA VACIO"
  }   
   
  } catch (error) {
    const archivoNuevo=  await fs.promises.writeFile(this.NombreArchivo,"");  
    return ""
  }

    }

    async getById(unID){
      try {
        const carritoTotal = await this.getAll();

        const uncarrito = carritoTotal.find(elemnto=>elemnto.id === unID)
   if (uncarrito){
    return uncarrito;
    
   }else{
    return "NO SE ENCUENTRA PRODUCTO"
   }
      } catch (error) {
        console.log("no se encuentra el producto");
      }
    }


    async deleteById(unID){
      try {
        const carritoTotal = await this.getAll();
        const Carritos = carritoTotal.filter(elemnto=>elemnto.id != unID)
        await fs.promises.writeFile(this.NombreArchivo,JSON.stringify(Carritos,null,2));
    
        return `Producto ID: ${unID}  fue eliminado con exito`
      } catch (error) {
        console.log("no se encuentra el producto para eliminar");
      }
    }
    async delProdCarrito(idCarrito,idprod){

        const carritosTotal = await this.getAll();
        const indiceCarr = carritosTotal.findIndex(elemnto=>elemnto.id == idCarrito);
    
        if (indiceCarr >=0){
            const indiceProd = carritosTotal[indiceCarr].productos.findIndex(elemnto =>elemnto== idprod);
    
            if (indiceProd >= 0){
                carritosTotal[indiceCarr].productos.splice(indiceProd,1);
                await   fs.promises.writeFile(this.NombreArchivo,JSON.stringify(carritosTotal,null,2));
            return `Producto nro: ${idprod} eliminado del carrito nro: ${idCarrito}`  
            }else{
               return `Producto nro: ${idprod} no existe}` 
            }            
            
        }else{
    
        return "NO existe el carrito"
        }
      
    
        }

        async agregarProd(unID,carrito){
            try {
                const carritoTotal = await this.getAll();
                const indice = carritoTotal.findIndex(elemnto=>elemnto.id == unID);
        
            if (indice >=0){
        
                carritosTotal[indice].productos.push(carrito.producto);
                await   fs.promises.writeFile(this.NombreArchivo,JSON.stringify(carritoTotal,null,2));
        return "Producto agregado con exito"  
                }else{
        
                return "NO existe el carrito"
            }
                 
               
        
            } catch (error) {
                console.log("llegue aca");
        
                return "el  producto no se puede agregar al carrito"
            }
         }

}
module.exports = {Carrito}