import { Button } from 'antd'
import React, { useState } from 'react'

function HomePage() {
  const [son, setSon] = useState(Number(localStorage.getItem('sonn')))
  return (
    <div className='h-full'>
     <Button onClick={()=>{
      const yangi_raqam = son+1
      setSon(yangi_raqam)
      localStorage.setItem('sonn', yangi_raqam)
     }}>
      saqla ({son})
     </Button>
     <Button onClick={()=>{
      
      localStorage.removeItem('sonn')
     }}>
      ochirish
     </Button>
     <Button onClick={()=>{
     
      localStorage.clear()
     }}>
    tozalash
     </Button>
    </div>
  )
}

export default HomePage