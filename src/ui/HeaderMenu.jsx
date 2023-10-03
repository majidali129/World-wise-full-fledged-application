import { styled } from "styled-components"
import { useNavigate } from "react-router-dom"
import {HiOutlineUser} from 'react-icons/hi'


import ButtonIcon from '../ui/ButtonIcon'
import Logout from './Logout'
import DarkModeToogler from '../ui/DarkModeToogler'

const StyledHeaderMenu = styled.ul`
    display: flex;
    gap: 0.4rem;
`

const HeaderMenu = () => {
    const navigate = useNavigate();

  return (
    <StyledHeaderMenu >
        <li>
            <ButtonIcon onClick={() => navigate('/account')} >
                <HiOutlineUser />
            </ButtonIcon>
        </li>

        <li>
            <DarkModeToogler />
        </li>

        <li>
                <Logout />
        </li>
    </StyledHeaderMenu>
  )
}

export default HeaderMenu