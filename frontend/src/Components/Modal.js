import React from 'react'


export default function Modal(props) {
    return (
        <>
            {

                props.show &&


                <div className='z-10 h-screen fixed top-0 left-0 right-0 flex justify-center modalBackground App' >
                    <div className='bg-white w-3/4 m-auto text-black border shadow-lg p-4 rounded relative'>


                        <div className='flex justify-between mb-6'>
                            <div className=''>
                                <p className='text-xl'>{props.title}</p>
                            </div>
                            <div className='p-2  font-bold' onClick={() => { props.setShow(false) }}>
                                X
                            </div>
                        </div>

                     

                        {props.children}


                    </div>
                </div>
            }

        </>
    )
}
