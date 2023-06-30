import React from "react"
import Heading from "../../common/heading/Heading"
import "./Hero.css"
import { useNavigate } from 'react-router-dom';


const Hero = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    console.log("Yes")
    navigate('/signup'); 
  };
  return (
    <>
      <section className='hero'>
        <div className='container'>
          <div className='row'>
            <Heading subtitle='WELCOME TO EDU-PLAYGROUND' title='Best Online Education Expertise' />
            <p>Engage Your Child's Mind with our interactive and fun approach for learning.</p>
            <div className='button-container'>
              <button className='primary-btn' onClick={handleClick} style={{ position: "relative" }}>
                GET STARTED NOW <i className='fa fa-long-arrow-alt-right'></i>
              </button>
              <button >
                VIEW COURSE <i className='fa fa-long-arrow-alt-right'></i>
              </button>
            </div>
          </div>
        </div>
      </section>
      <div className='margin'></div>
    </>
  )
}

export default Hero
