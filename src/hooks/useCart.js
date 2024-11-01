import { useState, useEffect, useMemo, useCallback } from "react";
import { db } from "../data/db";


export const useCart = () => {

    const initialCart = () => {
        const localStorageCart = localStorage.getItem('cart')
        return localStorageCart ? JSON.parse(localStorageCart) : []
      }
    
    
      //State
      const [data] = useState(db);
      const [cart, setCart] = useState(initialCart);
    
      const MIN_ITEMS = 1
      const MAX_ITEMS = 5
    
      useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart))
      }, [cart])
    
      const addToCart = useCallback(item => {
        const itemExists = cart.findIndex((guitar) => guitar.id === item.id)
        if (itemExists >= 0){
          if(cart[itemExists].quantity >= MAX_ITEMS) return
          const updatedCart = [...cart]
          updatedCart[itemExists].quantity++
          setCart(updatedCart)
        } else {
          const newItem = {...item, quantity: 1}
          setCart([...cart, newItem])
        }
        }, [cart]
        )
    
      const removeFromCart = useCallback(id =>
        {setCart(prevCart => prevCart.filter(guitar => guitar.id !== id))
        }, [setCart]
      )
    
      const decreaseQuantity = useCallback(id =>
        {
            const updatedCart = cart.map(item => {
              if(item.id === id && item.quantity > MIN_ITEMS) {
                return{
                  ...item,
                  quantity: item.quantity - 1
                }
              }
              return item
            })
            setCart(updatedCart)
        }, [cart]
      )
      
      const increaseQuantity = useCallback(id =>
        {
            const updatedCart = cart.map ( item => {
              if(item.id === id && item.quantity < MAX_ITEMS) {
                return {
                  ...item,
                  quantity: item.quantity + 1
                }
              }
              return item
            })
            setCart(updatedCart)
        }, [cart]
      ) 
    
    
      function clearCart(){
        setCart([])
      }


    const isEmpty = useMemo(() => cart.length === 0, [cart])
    const cartTotal = useMemo(() => cart.reduce( (total, item) => total + 
    (item.quantity * item.price), 0), [cart])

    return{         // Uso {} para devolver las propiedades del objeto
        data,
        cart,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        clearCart,
        isEmpty,
        cartTotal
    };

}