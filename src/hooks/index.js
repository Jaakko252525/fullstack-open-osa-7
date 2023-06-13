


import { useState, useEffect } from 'react'

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
      console.log('reset called succesfully!')
    }

    return {
      type,
      value,
      onChange,
      reset
    }
  }

// moduulissa voi olla monta nimettyä eksportia
export const useAnotherHook = () => {
  // ...
}