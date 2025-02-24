import React from 'react'
import { Button } from '../ui/button'

const Header = () => {
  return (
    <div className='p-3 px-5 shadow-xl flex justify-between items-center'>
      <img src="logo.svg" alt="" />
      <div>
        <Button>Sign in</Button>
      </div>
    </div>
  )
}

export default Header
