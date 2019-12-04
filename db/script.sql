-- Scripts for FideStore
-- Categorias
insert into CategoriaProducto (descripcion) values 
('Tecnologico'),('Hogar'),('Comida'),('Electronico'),('Comunicacion'),('Ferreteria');

-- Productos
insert into Producto (nombre,descripcion,precio,cantidadDisponible,cantCompras,urlImg,idCategoriaProducto) 
value ('Computadora','Computadora todo en 1, monitor y componentes',450000,5,0,'temp_pc.png',1);
insert into Producto (nombre,descripcion,precio,cantidadDisponible,cantCompras,urlImg,idCategoriaProducto) 
value ('Bagels','Disfruta de los exquisitos bagels, crujientes',5500,5,0,'temp_bagel.png',3);
insert into producto (nombre,descripcion,precio,cantidadDisponible,cantCompras,urlImg,idCategoriaProducto)
values ('Caja de herramientas','Combo de varias herramientas (martillo,desatornillador,pinzas,etc)',15000,15,0,
'temp_herramientas.png',6);
