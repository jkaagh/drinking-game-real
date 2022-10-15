import React, {useState, useEffect} from 'react'

//this is a newer and better modal, todo replace old modals.
export default function Modal2(props) {


    const [modalOpen, setModalOpen] = useState(false)

    useEffect(() => {
        if(props.open === true){
            setModalOpen(true)
        }
    }, [])
    
    const openModal = () => {
        setModalOpen(true)
    }

    const closeModal = () => {
        setModalOpen(false)
    }

    return (
        <>
        {

        props.open === true
            ?
            <div className='z-10 h-screen fixed top-0 left-0 right-0 flex justify-center modalBackground App' 
            >
                <div className='bg-white w-3/4 m-auto text-black border shadow-lg p-4 rounded relative'>

                    <div className='p-2 bg-slate-500'  onClick={props.closeFunction}>
                        x
                    </div>


                    {props.children}


                </div>
            </div>

            : null
        }
        </>
    )
}
