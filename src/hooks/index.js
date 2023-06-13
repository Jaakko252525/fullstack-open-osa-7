


import { useState } from 'react'

export const useField = () => {
    const [value, setValue] = useState('')
    const [type, setType] = useState('')
  
    const onChange = (event) => {
      console.log('this is event in onCHange:', event)
      setValue(event.target.value)
      setType(event.target.type)
    }

    const reset = () => {
      setValue('')
      setType('')
      console.log('this is value after clearing:', value)
      console.log('this is type after:', type)
      
    }

    return {
      type,
      value,
      onChange
    }
  }

// moduulissa voi olla monta nimettyä eksportia
export const useAnotherHook = () => {
  // ...
}