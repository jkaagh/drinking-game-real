import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleNotch} from '@fortawesome/free-solid-svg-icons'
import React, {useState, useEffect, useContext} from 'react'
import TextareaAutosize from 'react-textarea-autosize';
import { AccountContext } from '../App';


export default function CardInput(props) {

    const [input, setInput] = useState("")
    const [buttonText, setButtonText] = useState("X")
    const [buttonClasses, setButtonClasses] = useState("text-red-600 font-bold")
    const [confirm, setConfirm] = useState("false")

    const {account, setAccount} = useContext(AccountContext)
    
    useEffect(() => {
        setInput(props.data.prompt)
        
       
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
            props.handleDelete(props.data._id)
        }
        
    }

    return (
       
        <form className='cardListBox flex justify-between py-1'>

            <div className='flex items-center text-xs text-black text-opacity-75 font-mono mr-2'>
                #{props.number}
            </div>
            <TextareaAutosize value={input} onChange={(e) => {
                setInput(e.target.value)
                props.handleUpdate(props.data._id, e.target.value)
            }}
            className="py-3 px-1 w-4/5 outline-none resize-none overflow-auto h-auto " 
            />
           

            {
                props.canEdit &&
                <div className='py-3 px-4 flex items-center' onClick={() => {
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
            }
        </form>
    )
}
