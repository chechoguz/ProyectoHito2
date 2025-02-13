const Footer = () => {
    return (
      <footer className="bg-white py-10 text-center text-black w-full">
        <h3 className="text-lg font-bold">MEMES STORE</h3>
        <div className="flex justify-center space-x-10 mt-4">
          <div>
            <h4 className="font-bold">Tienda</h4>
            <p>Nuevo</p>
            <p>Mujer</p>
            <p>Hombre</p>
          </div>
          <div>
            <h4 className="font-bold">Nosotros</h4>
            <p>Acerca de</p>
            <p>Suscríbete</p>
            <p>FAQ</p>
          </div>
          <div>
            <h4 className="font-bold">Términos y condiciones</h4>
            <p>Política de la tienda</p>
            <p>Envío y devoluciones</p>
            <p>Métodos de pago</p>
          </div>
        </div>
  
        {/* BARRA NEGRA CON TEXTO */}
        <div className="bg-black text-white text-center py-4 mt-6">
          <p className="text-sm">&copy; 2025 Creado por Sergio Herrera</p>
        </div>
      </footer>
    );
  };
  
  export default Footer;
  