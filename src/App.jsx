import { useState, useEffect } from "react"
import Header from "./components/Header"
import Guitar from "./components/Guitar"
import { db } from "./data/db";



function App() {

  //State
  const [data, setData] = useState(db);



  return (
    <>
    <Header />
    

    <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>

        <div className="row mt-5">
            {data.map((guitar) => (     //en vez de poner return (), pongo solo () y cumple la misma funcion
              <Guitar 
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
