import React from 'react'


export default function Modal(props) {
  return (
      <>
        {

            props.show &&


            <div className='z-10 h-screen fixed top-0 left-0 right-0 flex justify-center modalBackground' >
                <div className='bg-white w-3/4 m-auto text-black border shadow-lg p-4 rounded relative'>   
                    
                    
                    
                        {props.children}

                    
                </div>
            </div>
        }

      </>
  )
}
