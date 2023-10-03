import { HiArrowRightOnRectangle } from 'react-icons/hi2'
import ButtonIcon from './ButtonIcon'
import { useLogout } from '../features/authentication/useLogout'
import SpinnerMini from './SpinnerMini'

const Logout = () => {
    const {logout, isLoading} = useLogout()
    
  return (
    <ButtonIcon disabled={isLoading} onClick={logout} >
        {isLoading? <SpinnerMini /> : <HiArrowRightOnRectangle />}
    </ButtonIcon>
  )
}

export default Logout