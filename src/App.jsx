import { useState, useEffect } from 'react'
import './App.css'
import { IoIosArrowDown } from "react-icons/io"

function App() {

  const [orders, setOrders] = useState({})
  const [show , setShow] = useState(false)
  const [selectedOrder, setSelectedOrder] = useState(null)
  const api = import.meta.env.VITE_API_URL

  const fetchOrders = async () => {
    try {
      const response = await fetch(`${api}/api/v1/orders`, {
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

  const calculateTotalSales = () => {
    let total = 0;
    if (orders.orders) {
      orders.orders.forEach(order => {
        order.items.forEach(item => {
          total += item.price * item.quantity;
        });
      });
    }
    return total;
  }

  const totalSales = calculateTotalSales();
  const currentDate = new Date().toLocaleDateString();

  return (
    <div className="App h-screen w-screen overflow-y-auto bg-green p-10">
      <div className='flex justify-between py-10'>
        <h1 className="text-2xl text-center font-bold italic text-white bg-light-brown shadow-md p-2">
          Date: {currentDate}
        </h1>
        <h1 className="text-4xl text-center font-bold italic text-light-brown">
          Itzana Orders
        </h1>
        <h2 className="text-2xl text-center font-bold italic text-white bg-light-brown shadow-md p-2">
          Total Sales: ${totalSales}
        </h2>
      </div>
      <div className='flex'>
        {
          header.map((item, index) => (
            <h1 key={index} className="header_item">{item}</h1>
          ))
        }
      </div>
      <div className="w-full my-4">
        {
          orders && orders.orders && orders.orders.map((order, index) => (
            <div key={index} className="flex flex-col p-4 border-b border-gray-200 rounded-md shadow-md my-4">
              <div className="flex w-full rounded-xl">
                <div className="text_item">{order.family}</div>
                <div className="text_item">{order.room}</div>
                <div className="text_item">{order.contact}</div>
                <div key={index} className="flex justify-between flex-col w-1/5 text-center relative">
                {
                  order.items && 
                      order.items.length > 0 && (
                        <div className="flex justify-center gap-2 items-center relative">
                          <div className="text_item">{order.items.length} items</div>
                          <IoIosArrowDown className='text_item cursor-pointer' onClick={() => {
                            setShow(!show)
                            onHandleClick(index)
                          } }/>
                        </div>
                      )
                }
                <div className="items">
                {
                  show && order.items && selectedOrder === index && (
                    order.items.map((item, index) => (
                      <div key={index} className="items_container">
                        <div className="text-aqua p-4">{item.itemName}</div>
                          <span className='text-aqua font-bold'>${item.price} QTY: {item.quantity}</span>
                          {
                            item.variant && (
                              <div className="text_item">Variant: {item.variant}</div>
                            )
                          }
                          {
                            item.extras && <div className="text_item font-bold">Extras</div>
                          }
                          {
                            item.extras && item.extras.map((extra, index) => (
                              <div key={index} className="text_item">{extra.extraName}: {extra.price}</div>
                            ))
                          }
                      </div>
                      ))
                  )
                  
                }
                </div>
                </div>
                {
                  order.status && (
                    <div className="text_item text-center w-1/5"> {order.status}</div>
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