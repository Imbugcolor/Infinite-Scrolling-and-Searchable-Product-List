import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNotifications } from 'reapop'
import { RootStore } from '../../redux/store'
import Loading from '../loading/Loading'

const Toast = () => {
    const { toast } = useSelector((state: RootStore) => state)

    const { notify } : any = useNotifications();

    useEffect(() => {
      toast.errors && 
            notify({
              title: 'Oh no!',
              message: toast.errors,
              status: 'error'
            })
      toast.success && 
            notify({
              title: toast.success,
              status: 'success'
            })
    }, [notify, toast])

  return (
    <div>
       { toast.loading && <Loading /> }
    </div>
  )
}

export default Toast