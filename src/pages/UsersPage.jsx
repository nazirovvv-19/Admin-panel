import axios from 'axios'
import React, { useEffect, useState } from 'react'
import useMyStore from '../store/my-store'
import { message, Table } from 'antd'
import ButtonAndForm from '../components/ButtonAndForm'

function UsersPage() {
    const state = useMyStore()
    const [userss, setUserss]= useState()
    useEffect(()=>{
        axios.get("https://library.softly.uz/api/users", {
            params:{
                size:20,
                page:1
            },
            headers:{
                Authorization:"Bearer " + state.token
            }
        }).then(res=>{
            console.log(res.data.items);
            setUserss(res.data.items)
            message.success('muvaffiqiyatli bajarildi')
            
        }).catch((e)=>{
            console.log(e);
            message.error('xatolik')
            
        })
    },[])
    if (!userss) {
        return <div>loading</div>
    }

    
  return (
    <div className='w-full p-6 container mx-auto overflow-auto h-full'>
      <div className='flex items-center justify-between my-2 '>
      <h1 className='text-2xl font-bold'>Kitobxon</h1>
      <ButtonAndForm/>
      </div>
        <Table style={{
            width:"100%"
        }} dataSource={userss} columns={[
            {
                key: "id",
                dataIndex:'id',
                title:'Id'
            },{
                key: "firstName",
                dataIndex:'firstName',
                title:'Name'
            },
            {
                key: "lastName",
                dataIndex:'lastName',
                title:'LastName'
            },
            {
                key: "phone",
                dataIndex:'phone',
                title:'Phone'
            },
            {
                key: "gender",
                dataIndex:'gender',
                title:'Gender'
            },
            
        ]}/>
    </div>
  )
}

export default UsersPage