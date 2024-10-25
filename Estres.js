class Producto {
    constructor(nombre, cantidad, precio) {
        this.nombre = nombre;
        this.cantidad = cantidad;
        this.precio = precio; // Precio en pesos colombianos
    }

    aplicarDescuento(cantidadComprada) {
        if (cantidadComprada > 20) {
            return this.precio * 0.8; // 20% de descuento
        } else if (cantidadComprada > 10) {
            return this.precio * 0.9; // 10% de descuento
        } else {
            return this.precio; // Sin descuento
        }
    }

    actualizarInventario(cantidadComprada) {
        this.cantidad -= cantidadComprada;
        if (this.cantidad < 5) {
            console.log(`Advertencia: ${this.nombre} está por agotarse. Solo quedan ${this.cantidad} unidades.`);
        }
    }
}

class Tienda {
    constructor() {
        this.productos = [];
    }

    agregarProducto(nombre, cantidad, precio) {
        this.productos.push(new Producto(nombre, cantidad, precio));
    }

    realizarCompra(nombreProducto, cantidadComprada) {
        const producto = this.productos.find((p) => p.nombre === nombreProducto);
        if (producto) {
            if (cantidadComprada > producto.cantidad) {
                console.log(`No hay suficiente stock de ${nombreProducto}. Solo quedan ${producto.cantidad} unidades.`);
                return;
            }
            const precioOriginal = producto.precio;
            const precioConDescuento = producto.aplicarDescuento(cantidadComprada);
            const descuentoAplicado = precioOriginal - precioConDescuento;
            const costoTotal = precioConDescuento * cantidadComprada;

            console.log(`Precio original para ${cantidadComprada} unidades de ${nombreProducto}: $${(precioOriginal * cantidadComprada).toFixed(2)} COP`);

            if (descuentoAplicado > 0) {
                console.log(`Descuento aplicado: -$${descuentoAplicado.toFixed(2)} COP`);
                console.log(`Precio con descuento para ${cantidadComprada} unidades de ${nombreProducto}: $${costoTotal.toFixed(2)} COP`);
                console.log(`${nombreProducto} es merecedor de un descuento.`);
            } else {
                console.log(`No hay descuento para ${nombreProducto}.`);
            }

            producto.actualizarInventario(cantidadComprada);
        } else {
            console.log("Producto no encontrado.");
        }
    }

    mostrarInventario() {
        console.log("Inventario:");
        this.productos.forEach((producto) => {
            console.log(`${producto.nombre}: ${producto.cantidad} unidades - Precio: $${producto.precio.toFixed(2)} COP`);
        });
    }
}

// Crear una tienda
const tienda = new Tienda();

// Agregar productos preestablecidos
tienda.agregarProducto("Arroz", 60, 1500);
tienda.agregarProducto("Frijoles", 40, 1200);
tienda.agregarProducto("Aceite", 30, 3000);
tienda.agregarProducto("Azúcar", 50, 800);
tienda.agregarProducto("Sal", 110, 500);

// Función para realizar compras
function realizarCompras() {
    let continuar = true;
    while (continuar) {
        const nombreProducto = prompt("Ingrese el nombre del producto que desea comprar:");
        const cantidadComprada = parseInt(prompt("Ingrese la cantidad que desea comprar:"), 10);

        if (isNaN(cantidadComprada) || cantidadComprada <= 0) {
            console.log("Por favor, ingrese una cantidad válida.");
            continue;
        }

        tienda.realizarCompra(nombreProducto, cantidadComprada);

        continuar = confirm("¿Desea realizar otra compra?");
    }
}

// Mostrar inventario inicial
tienda.mostrarInventario();

// Realizar compras
realizarCompras();

// Mostrar inventario final
tienda.mostrarInventario();