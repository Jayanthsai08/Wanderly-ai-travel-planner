import React from 'react'
import { Button } from '../ui/button'

function Header() {
  return (
    <div className="p-3 shadow-sm flex justify-between item-center px-3">
        <img src='logo.svg'/>
        <div>
            <Button>Sign in</Button>
        </div>
    </div>
  )
}

export default Header
