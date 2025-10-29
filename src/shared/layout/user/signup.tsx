import Link from 'next/link';
import React, { useState, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faGoogle } from '@fortawesome/free-brands-svg-icons';

export default function Signup(){
    return(
      <div className='min-h-5.5 flex items-center justify-center bg-gradient-to-b from-[#fbb8b8] to-[#ececec] my-10 mx-60 rounded-2xl'>
        <div className="signup-container align-bottom p-9">  
          <h1 className='font-bold text-3xl text-center'>Meow</h1>
          <p className='text-2xl'>Chọn phương thức đăng kí / đăng nhập</p>
          <div>
            <form>
              <div>
                <p className='text-sm mb-0 pt-2.5 ml-3'>Email hoặc số điện thoại</p>
                <div className='h-[43px] p-[1px] rounded-2xl bg-gradient-to-b from-[#fd9f9f] to-[#ececec] mb-4.5'>
                  <input className='w-full px-3 py-2 mb-3.5 bg-gradient-to-t from-[#eebdbd] to-[#ececec] rounded-2xl focus:outline-none focus:bg-gradient-to-b from-[#fbb8b8] to-[#ececec]' type="text" placeholder='Điền vào đây ...'/>
                </div>
              </div>
              <button className="w-full bg-[#E39595] rounded-2xl h-14 cursor-pointer shadow-md hover:shadow-[0_0_30px_#CF6C6C] transition duration-300">
                <p className='px-27.5'>Tiếp tục</p>
              </button>
            </form>
            <div>
              <div className="space-y-4 mr-1.5">
                {/* Nút Facebook */}
                <button className="w-full flex items-center justify-center p-3 bg-[#E9AAAA] rounded-2xl my-6 ml-0 cursor-pointer shadow-md hover:shadow-[0_0_30px_#D68585] transition duration-300">
                  <FontAwesomeIcon 
                    icon={faFacebook} 
                    className="text-blue-600 text-3xl" 
                  />
                  <span className="ml-4">Tiếp tục với facebook</span>
                </button>

                <button className="w-full flex items-center justify-center p-3 bg-[#EEBFBF] rounded-2xl mx-0 cursor-pointer shadow-md hover:shadow-[0_0_30px_#E39595] transition duration-300">
                  <FontAwesomeIcon 
                    icon={faGoogle} 
                    className="text-red-500 text-[27px]" 
                  />
                  <span className="ml-4">Tiếp tục với google</span>
                </button>
              </div>
            </div>
          </div>
        </div>
    </div>
    );
};