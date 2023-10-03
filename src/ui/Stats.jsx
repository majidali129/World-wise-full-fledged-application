import {HiOutlineBriefcase, HiOutlineCash} from 'react-icons/hi'
import {HiOutlineCalendarDays} from 'react-icons/hi2'

import Stat from "../features/dashboard/Stat"
import { formatCurrency } from '../utils/helpers';



const Stats = ({bookings, confirmedStays, numOfDays, totalCabins}) => {

    //1) bookings
    const numOfBookings = bookings?.length;
    
    //2) sales
    const sales = bookings?.reduce((acc, cur) => acc + cur.totalPrice, 0);

    //3)  checkIns
    const numOfCheckIns = confirmedStays?.length;
        
    // 4) occupancy rate    
    const occupation = confirmedStays?.reduce((acc, cur) => acc + cur.numNights, 0)/(numOfDays * totalCabins)
    
  return (
    <>
    <Stat icon={<HiOutlineBriefcase />} title='Bookings' value={numOfBookings} color='blue'    />
    <Stat icon={<HiOutlineCash />} title='Sales' value={formatCurrency(sales)} color='green'    />
    <Stat icon={<HiOutlineCalendarDays />} title='Check Ins' value={numOfCheckIns} color='indigo'    />
    <Stat icon={<HiOutlineBriefcase />} title='Bookings' value={`${Math.round(occupation*100)}%`} color='blue'    />
    </>
  )
}

export default Stats