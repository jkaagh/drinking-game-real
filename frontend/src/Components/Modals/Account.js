import React, {useContext, useState} from 'react'
import Admin from '../../DeckList/Admin'
import { AccountContext, App } from '../../App'
import { address } from '../../serverAddress'
import axios from 'axios'

export default function Account(props) {

    
    
    const [password, setPassword] = useState("")  
    const {account, setAccount} = useContext(AccountContext)


    const handleLogin = (password) => {
        console.log(password)
        axios.get(address + "/account/login/" + password)
        .then((response) => {
            alert(response.data.msg)
            console.log(response.data)
            if(response.data.success){
                localStorage.setItem("isAdmin", response.data.data.admin)
                localStorage.setItem("username", response.data.data.name)
                localStorage.setItem("password", response.data.data.password)

                setAccount({
                    admin: response.data.data.admin.toString(),
                    name: response.data.data.name,
                    password: response.data.data.password
                 })
            }
        })
    }

    const handleLogout = () => {
        setAccount(undefined)
        localStorage.removeItem("isAdmin")
        localStorage.removeItem("username")
        localStorage.removeItem("password")
    }
    
    console.log(account)
    return (
        <>

        
            {/* <div className='flex justify-between'>
                <div className=''>
                    <p className='text-xl'>Account settings</p>
                </div>
                <div className=' font-bold' onClick={() => { props.setShowAccount(false) }}>
                    X
                </div>
            </div> */}
            <div className='pt-5'>



                {
                    //if not logged in
                    account.name === undefined ?

                        <div>
                            <p>Password</p>
                            <input className='standardInput' onChange={(e) => {setPassword(e.target.value) }} />


                            <div className='standardButton' onClick={() => {handleLogin(password) }}>
                                Login
                            </div>
                        </div>
                        :
                        <div>
                            <p>Logged in as {account.name}</p>
                            <div className='standardButton' onClick={() => {handleLogout()}}>
                                Logout
                            </div>

                            {
                                account.admin == "true" &&
                                <Admin account={account} />

                            }
                        </div>
                }
            </div>
        </>
    )
}
