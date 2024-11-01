import Header from "./components/Header";
import Guitar from "./components/Guitar";
import { useCart } from "./hooks/useCart";


function App() {

  const { data, cart, addToCart, removeFromCart, increaseQuantity, decreaseQuantity, 
    clearCart, isEmpty, cartTotal } = useCart()
    
  
  return (
    <>
      <Header 
        cart={cart}
        removeFromCart={removeFromCart}
        decreaseQuantity={decreaseQuantity}
        increaseQuantity={increaseQuantity}
        clearCart={clearCart}
        isEmpty={isEmpty}
        cartTotal={cartTotal}
      />
      

      <main className="container-xl mt-5">
          <h2 className="text-center">Nuestra Colección</h2>

          <div className="row mt-5">
              {data.map((guitar) => (     //en vez de poner return (), pongo solo () y cumple la misma funcion
                <Guitar
                  key={guitar.id} //Key es un prop que hay que usar siempre que itere en una lista
                  guitar={guitar}
                  addToCart={addToCart}
                />
              ))}
          </div>
      </main>


      <footer className="bg-dark mt-5 py-5">
          <div className="container-xl">
              <p className="text-white text-center fs-4 mt-4 m-md-0">GuitarLA - Todos los derechos Reservados</p>
          </div>
      </footer>

    </>
  )
}

export default App
