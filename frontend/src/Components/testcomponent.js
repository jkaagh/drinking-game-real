import React, {useEffect} from 'react'

export default function Vibrate(options) {
    /*
    in concept, this is a Vibrate Component added to an Alarm. 
    Something inside this component's parent component handles 
    Component Flow, and renders this when the previous component has Exited.

    One way of doing it: This components' parent gets an array of objects. It looks like this:*/

    //todo in other component, loops out and renders in order, sends custom options through 
    //props and uses accordingly in vibration function

    
    //on Component Created
    useEffect(() => {

        //these values would in practice get sent from parent component, in props.options
        let times = 3
        let length = 300
        let interval = 150
        let strength = 1
        
        //vibrate function handling 
        HandleVibrate(times, length, interval, strength)

        
    }, [])

    async function HandleVibrate(times, length, interval, strength){ //must be async func
        for (let i = 0; i < times; i++) {
            
            Device.Vibrate(length, strength) //is what it would do in practice
            await sleep(interval)
        }

        //when component is Finished

        
    }

    const sleep = (milliseconds) => {
        return new Promise(resolve => setTimeout(resolve, milliseconds))
    }

  return (
    <>
    </>
  )
}
