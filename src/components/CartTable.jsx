export default function CartTable({ cart, decreaseQuantity, increaseQuantity, removeFromCart, cartTotal }) {

    return (
        <>
        <table className="w-100 table">
        <thead>
            <tr>
                <th>Imagen</th>
                <th>Nombre</th>
                <th>Precio</th>
                <th>Cantidad</th>
                <th></th>
            </tr>
        </thead>
        <tbody>
            {cart.map(guitar => (
                <tr key={guitar.id}>
                    <td>
                        <img 
                            className="img-fluid" 
                            src={`/img/${guitar.image}.jpg`}
                            alt="imagen guitarra" 
                            />
                    </td>
                    <td>{guitar.name}</td>
                    <td className="fw-bold">
                            ${guitar.price}
                    </td>
                    <td className="flex align-items-start gap-4">
                        <button
                            type="button"
                            className="btn btn-dark"
                            onClick={() => decreaseQuantity(guitar.id)}
                            >
                            -
                        </button>
                            {guitar.quantity}
                        <button
                            type="button"
                            className="btn btn-dark"
                            onClick={() => increaseQuantity(guitar.id)}
                            >
                            +
                        </button>
                    </td>
                    <td>
                        <button
                            className="btn btn-danger"
                            type="button"
                            onClick={() => removeFromCart(guitar.id)}
                            >
                            X
                        </button>
                    </td>
                </tr>
            ))}
        </tbody>
    </table>
    <p className="text-end">Total pagar: <span className="fw-bold">${cartTotal}</span></p>
    </>
    )
}