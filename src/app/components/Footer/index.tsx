import { useEffect } from "react"
import { useSelector, useDispatch } from 'react-redux'
import type { RootState } from '../../GlobalRedux/store'
import {setToday} from '../../GlobalRedux/Features/display/displaySlice'

export default function Footer() {

  const dispatch = useDispatch();

  const today = useSelector((state: RootState) => state.display.today)

  useEffect(() => {
    const date = new Date().getFullYear()
    dispatch(setToday(date))
  }, [dispatch])

  return (
    <footer className="flex justify-around bg-pink-200">
      <span>©{today} Aymerick Cotché</span>
    </footer>
  )
}
