import axios from "axios";
import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";

function Failed() {
  const {id} = useParams()
  useEffect(() => {
    const destroyOrder = async ()=> {
      try {
        const res = await axios.delete(`${process.env.REACT_APP_URL}/order/${id}/auto-cancel`, {withCredentials: true})
      } catch (error) {
        
        console.log(error)
      }
    }
    destroyOrder()
    
  }, [])

  return (
    <div className="py-20 flex flex-col gap-6 justify-center items-center">
      <img
        src="https://cdn.printme.online/wp-content/uploads/2020/04/payment_fail_icon.png"
        className="border-none w-[140px]"
      />
      <h1 className="text-xl font-semibold">Thanh toán thất bại</h1>
      <div className="flex items-center">
        <Link to={"/"} className="font-bold">
          Quay về Trang chủ
        </Link>
      </div>
    </div>
  );
}

export default Failed;
