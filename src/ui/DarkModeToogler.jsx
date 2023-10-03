import { HiOutlineMoon, HiOutlineSun } from "react-icons/hi"
import { useDarkMode } from "../context/DarkModeContext"
import ButtonIcon from "./ButtonIcon"

const DarkModeToogler = () => {
    const {isDarkMode, darkModeToogler} = useDarkMode()


  return (
    <ButtonIcon onClick={darkModeToogler}>
        {isDarkMode? <HiOutlineMoon /> :  <HiOutlineSun />}
    </ButtonIcon>
  )
}

export default DarkModeToogler