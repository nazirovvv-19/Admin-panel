import { Button, Drawer, Form, Select } from 'antd'
import React from 'react'

function EditRents({editBook,setEditBook,openn,setOpen}) {
  return (
    <div>
        <Drawer open={openn} onClose={() => {
          setOpen(false);
          
        }}>
        
            <Form layout='vertical'>
               <Form.Item label={'kitobxon'}>
                  <Select/>
               </Form.Item>
               <Form.Item>
                <div className='flex gap-2'>
                <Form.Item label={'Kitob zaxirasi'}>
                <Select style={{
                  width:200
                }}/>
                </Form.Item>
                <Form.Item>
                <Select placeholder={'kitob raqami'} style={{width:120, marginTop:30}}/>
                </Form.Item>

                </div>
               </Form.Item>
                <Button htmlType='submit' type='primary'>
                  + Qoshish
                </Button>
            </Form>
        </Drawer>
    </div>
  )
}

export default EditRents