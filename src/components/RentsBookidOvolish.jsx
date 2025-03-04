import React from 'react'

function RentsBookidOvolish({stock,book}) {
    console.log(stock);
    const kitob = book?.find(item=>{
        return item.id === stock.bookId
    })
  return (
    <div>{stock.bookId} {kitob?.name}</div>
  )
}

export default RentsBookidOvolish