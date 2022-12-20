class Productos{
    constructor(nombre){
this.NombreArchivo = nombre;
    }

 async save(producto){
    try {
       const productosTotal = await this.getAll();
       if (productosTotal != "EL ARCHIVO ESTA VACIO" && productosTotal !== [] ){
        const ultimoID = productosTotal[productosTotal.length-1].id+1;
        producto.id = ultimoID;
        productosTotal.push(producto);
     await   fs.promises.writeFile(this.NombreArchivo,JSON.stringify(productosTotal,null,2));
     return producto.id;
    }else {
        producto.id = 1;
     await   fs.promises.writeFile(this.NombreArchivo,JSON.stringify([producto],null,2));
     return producto.id;
    }
       

    } catch (error) {
        return "el producto no se puede grabar"
    }
 }


  async getAll(){
  try {
    const resultado = await fs.promises.readFile(this.NombreArchivo,"utf-8");
  if (resultado.length > 0){
    const prodJson = JSON.parse(resultado);
    return prodJson;    
  
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
        const productosTotal = await this.getAll();

        const unProducto = productosTotal.find(elemnto=>elemnto.id === unID)
   if (unProducto){
    return unProducto;
    
   }else{
    return "NO SE ENCUENTRA PRODUCTO"
   }
      } catch (error) {
        console.log("no se encuentra el producto");
      }
    }


    async deleteById(unID){
      try {
        const productosTotal = await this.getAll();
        const Productos = productosTotal.filter(elemnto=>elemnto.id != unID)
        await fs.promises.writeFile(this.NombreArchivo,JSON.stringify(Productos,null,2));
    
        return `Producto ID: ${unID}  fue eliminado con exito`
      } catch (error) {
        console.log("no se encuentra el producto para eliminar");
      }
    }


    async deleteAll(){
      try {
        const productosTotal = await this.getAll();
        
        await fs.promises.writeFile(this.NombreArchivo,"");
    
        return `Se Eliminaron Todos Los Productos`
      } catch (error) {
        console.log("no se puede eliminar los productos");
      }
          }
         async updateProduct(id, producto){
        try {
        this.deleteById(id)
          this.save(producto);
      } catch (error) {
        console.log ("error: " + error);
      }


}
async updateProduct(product){

    //id, timestamp, nombre, descripcion, código, foto (url), precio, stock
    const productosTotal = await this.getAll();
    const unProducto = productosTotal.find(elemnto=>elemnto.id == product.id)
    const indice = productosTotal.findIndex(elemnto=>elemnto.id == product.id);

    if (unProducto){
            if (product.nombre != null) {productosTotal[indice].nombre = product.nombre}
            if (product.descripcion != null) {productosTotal[indice].descripcion = product.descripcion}
            if (product.codigo != null) {productosTotal[indice].codigo = product.codigo}
            if (product.foto != null) {productosTotal[indice].foto = product.foto}
            if (product.precio != null) {productosTotal[indice].precio = product.precio}
            if (product.stock != null) {productosTotal[indice].stock = product.stock}
  
            await   fs.promises.writeFile(this.NombreArchivo,JSON.stringify(productosTotal,null,2));
  
            return `El producto ${product.id}  fue actualizado con exito`
            
          }else{
                   return "NO SE ENCUENTRA PRODUCTO para actualizar"
           }
    }

} 
module.exports = {Productos}