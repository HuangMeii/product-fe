import Link from 'next/link';
import React, { useState, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faGoogle } from '@fortawesome/free-brands-svg-icons';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';

export default function SignupToSDT(){
    return(
      <div className='min-h-5.5 flex items-center justify-center bg-gradient-to-b from-[#fbb8b8] to-[#ececec] my-10 mx-60 rounded-2xl'>
        <div className="signup-container align-bottom p-9">  
          <h1 className='font-bold text-3xl text-center'>Meow</h1>
          <form>
            <div>
              <div>
                <p className='text-sm mb-0 pt-2.5 ml-3'>Nhập mã xác nhận</p>
                <div className='h-[43px] p-[1px] rounded-2xl bg-gradient-to-b from-[#fd9f9f] to-[#ececec] mb-4.5'>
                  <input className='w-full px-3 py-2 mb-3.5 bg-gradient-to-t from-[#eebdbd] to-[#ececec] rounded-2xl focus:outline-none focus:bg-gradient-to-b from-[#fbb8b8] to-[#ececec]' type="text" placeholder='Điền vào đây ...'/>
                </div>
              </div>
              <button className="w-full bg-[#E39595] rounded-2xl h-14 cursor-pointer shadow-md hover:shadow-[0_0_30px_#CF6C6C] transition duration-300">
                <p className='px-27.5'>Tiếp tục</p>
              </button>
            </div>
            <div className="flex items-center justify-center mt-4 text-[12px]">
              <p className='text-[#801212]'>Bạn chưa nhận được mã?</p>
              <button className='text-[#AA4141] hover:underline cursor-pointer'>
                <FontAwesomeIcon icon={faPaperPlane} className="ml-2 w-4 h-4 mr-0.5" />
                Gửi lại
              </button>
            </div>
          </form>
        </div>
    </div>
    );
};