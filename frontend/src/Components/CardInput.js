import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleNotch} from '@fortawesome/free-solid-svg-icons'
import React, {useState, useEffect} from 'react'

export default function CardInput(props) {

    const [input, setInput] = useState("")
    const [buttonText, setButtonText] = useState("X")
    const [buttonClasses, setButtonClasses] = useState("text-red-600 font-bold")
    const [confirm, setConfirm] = useState("false")

    
    useEffect(() => {
        setInput(props.value)
       
    }, [])
    


    const handleDelete = () => {
        
        if(confirm === "false" ){
            setButtonText("Confirm?")
            setConfirm("true")
        }
        else if(confirm === "true"){
            setButtonText("")
            setConfirm("deleting")

            //handle deletion from database here.
            props.handleDelete(props.id)
        }
        
    }

    return (

        <form className='cardListBox flex justify-between'>
            <input value={input} onChange={(e) => {
                setInput(e.target.value)
            }}
            className="py-3 px-4 w-4/5 outline-none " 
            />
            <div className='py-3 px-4 flex' onClick={() => {
                handleDelete()
            }}>
                <span className={buttonClasses}>{buttonText}</span>
                {
                    confirm == "deleting" &&
                    <div >
                        <FontAwesomeIcon icon={faCircleNotch} className='animate-spin text-red-600' />
                    </div>
                }
            </div>

        </form>
    )
}
