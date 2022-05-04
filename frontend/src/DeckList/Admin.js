import axios from 'axios'
import React, {useState, useEffect} from 'react'
import { address } from '../serverAddress'

export default function Admin(props) {

    const [list, setList] = useState([])
    const [inputName, setInputName] = useState("")
    const [inputPassword, setInputPassword] = useState("")
    
    useEffect(() => {
        
        axios.get( address + "/account/list/" + props.account.password)
        .then((response) => {
            console.log(response.data)
            setList(response.data)
        })
    }, [])
    
    const handleCreateUser = () => {
        
        axios.post( address + "/account/create/", {name: inputName, password: inputPassword})
        .then((response) => {
            console.log(response.data)
        })
    }

    
    return (
    <div>
            <div className='py-2 mt-5'>
                Create user
            </div>

            <input className='standardInput' placeholder='Name' onChange={(e) => {setInputName(e.target.value)}}/>
            <input className='standardInput' placeholder='Password' onChange={(e) => {setInputPassword(e.target.value)}}/>
            <div className='standardButton' onClick={() => {handleCreateUser()}}>Create!</div>
            <div className='py-2 mt-5'>
                List of users:
            </div>
            <div className='overflow-scroll h-40 border-2 shadow-lg border-purple-100 rounded'>

                {
                    list.map((user, index) => {
                        return(
                            <div className="p-5 shadow-lg border-b-2 border-purple-500  rounded bg-slate-100" >
                                <div>
                                    {user.name}
                                </div>
                                <div>
                                    {user.password}
                                </div>
                                <div>
                                    admin: {user.admin.toString()}
                                </div>
                            </div>
                        )

                    })
                }
            </div>

    </div>
  )
}
