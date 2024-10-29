import { useState, useEffect, useCallback } from "react";
import Header from "./components/Header";
import Guitar from "./components/Guitar";
import { db } from "./data/db";
import { useLSCart } from "./hooks/useLSCart";

function App() {
  const [data] = useState(db);
  const [cart, setCart] = useLSCart("cart", []);

  const MIN_ITEMS = 1
  const MAX_ITEMS = 5

  const addToCart = useCallback(item => {
    const itemExists = cart.findIndex((guitar) => guitar.id === item.id)
    if (itemExists >= 0){
      if(cart[itemExists].quantity >= MAX_ITEMS) return
      const updatedCart = [...cart]
      updatedCart[itemExists].quantity++
      setCart(updatedCart)
    } else {
      setCart([...cart, { ...item, quantity: 1 }])
    }
  }, [cart]);

  const removeFromCart = useCallback((id) => {
    setCart(prevCart => prevCart.filter(guitar => guitar.id !== id))
  })

  function modifyQuantity(id, change) {
    const updatedCart = cart.map((item) => {
      if (item.id === id) {
        const newQuantity = item.quantity + change;
        if (newQuantity >= MIN_ITEMS && newQuantity <= MAX_ITEMS) {
          return { ...item, quantity: newQuantity };
        }
      }
      return item;
    });
    setCart(updatedCart);
  }

  function clearCart(){
    setCart([])
  }

  return (
    <>
      <Header 
        cart={cart}
        removeFromCart={removeFromCart}
        decreaseQuantity={(id) => modifyQuantity(id, -1)}
        increaseQuantity={(id) => modifyQuantity(id, 1)}
        clearCart={clearCart}
      />
      
      <main className="container-xl mt-5">
          <h2 className="text-center">Nuestra Colección</h2>

          <div className="row mt-5">
              {data.map((guitar) => (     //en vez de poner return (), pongo solo () y cumple la misma funcion
                <Guitar
                  addToCart={addToCart}
                  key={guitar.id} //Key es un prop que hay que usar siempre que itere en una lista
                  guitar={guitar}
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
