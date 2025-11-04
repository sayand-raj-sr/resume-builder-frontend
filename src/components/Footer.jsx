import React from 'react'
import { MdEmail } from "react-icons/md";
import { IoPhonePortraitOutline } from "react-icons/io5";
import { FaWhatsapp } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa6";
function Footer() {
  return (
    <div>
      <section  >
        
        <div className='bg-primary mt-1'>
          <h3 className='text-center mt-3'>Contact Us</h3>
          <p className='text-center'><MdEmail />resumebuilder@gmail.com</p>
          <p className='text-center'><IoPhonePortraitOutline />91-7654398623</p>
          <h4 className='text-center'>Connect with Us</h4>
          <p className='text-center'><FaWhatsapp className='fs-3 my-3' /><FaInstagram className='fs-3 my-3'/><FaLinkedin className='fs-3 my-3'/></p>
        </div>
      </section>
    </div>
  )
}

export default Footer
