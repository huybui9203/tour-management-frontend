import React from 'react'
import { Link } from 'react-router-dom'

function Success() {

  return (
    <div className='py-20 flex flex-col gap-6 justify-center items-center'>
      <img src='https://funtura.in/lko/wp-content/themes/funtura/assets/images/success.svg' className='border-none'/>
      <h1 className='text-xl font-semibold'>Thanh toán thành công</h1>
      <div className='flex items-center'><Link to={'/'} className='font-bold'>Quay về Trang chủ</Link>
      <span className='mx-2 text-gray-500 text-sm'>hoặc</span>
      <Link to={'/history'} className='font-bold text-orange-500'>Xem đơn đặt</Link></div>
    </div>
  )
}

export default Success