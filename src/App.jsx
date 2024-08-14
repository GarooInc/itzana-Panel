import { useState, useEffect } from 'react'
import './App.css'
import { IoIosArrowDown } from "react-icons/io"

function App() {

  const [orders, setOrders] = useState({})
  const [show , setShow] = useState(false)
  const [selectedOrder, setSelectedOrder] = useState(null)


  const fetchOrders = async () => {
    try {
      const response = await fetch('https://garoo-hotel-orders.koyeb.app/kaana/api/v1/orders ',{
        method : 'GET'
      })  

      const data = await response.json()
      setOrders(data)
    }
    catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchOrders()
  }, [])

  const onHandleClick = (index) => {
    setSelectedOrder(index)
  }

  const header = [
    "Family",
    "Room",
    "Phone",
    "Items",
    "Status"
  ]

  return (
    <div className="App h-screen w-screen overflow-y-auto bg-white p-10">
      <div className='flex'>
        {
          header.map((item, index) => (
            <h1 key={index} className="text-gray-500 text-center w-1/5">{item}</h1>
          ))
        }
      </div>
      <div className="w-full rounded-xl border-2 border-gray-200 shadow-md my-4">
        {
          orders && orders.orders && orders.orders.map((order, index) => (
            <div key={index} className="flex flex-col p-4 border-b border-gray-200 rounded-md shadow-md my-4">
              <div className="flex w-full rounded-xl">
                <div className="text-gray-500 w-1/5 text-center">{order.family}</div>
                <div className="text-gray-500 w-1/5 text-center">{order.room}</div>
                <div className="text-gray-500 w-1/5 text-center">{order.contact}</div>
                <div key={index} className="flex justify-between flex-col w-1/5 text-center">
                {
                  order.items && 
                      order.items.length > 0 && (
                        <div className="flex justify-center gap-2 items-center">
                          <div className="text-gray-500">{order.items.length} items</div>
                          <IoIosArrowDown className='text-gray-500' onClick={() => {
                            setShow(!show)
                            onHandleClick(index)
                          } }/>
                        </div>
                      )
                }
                {
                  show && order.items && selectedOrder === index && (
                    order.items.map((item, index) => (
                      <div key={index} className="flex justify-between flex-col">
                        <div className="text-gray-500">{item.itemName} ${item.price}</div>
                        <span className="text-gray-500">Quantity: {item.quantity}</span>
                        {
                          item.variant && (
                            <div className="text-gray-500">Variant: {item.variant}</div>
                          )
                        }
                        {
                          item.extras && <div className="text-gray-500 font-bold">Extras</div>
                        }
                        {
                          item.extras && item.extras.map((extra, index) => (
                            <div key={index} className="text-gray-500">{extra.extraName}: {extra.price}</div>
                          ))
                        }
                      </div>))
                  )
                  
                }
                </div>
                {
                  order.status && (
                    <div className="text-gray-500 text-center w-1/5"> {order.status}</div>
                  )
                }
              </div>
            </div>
          ))
        }
        </div>
    </div>
  )
    
}

export default App
