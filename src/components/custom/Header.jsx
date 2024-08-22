import React, { useEffect } from 'react'
import { Button } from '../ui/button'

function Header() {
  const user = JSON.parse(localStorage.getItem('user'));
  useEffect(() => {
    console.log(user)
  }, [])
  return (
    <div className="p-3 shadow-sm flex justify-between item-center px-3">
      <img src='logo.svg' />
      <div>
        {user ?
          <div className='flex items-center gap-3'>
            <Button variant="outline" className="rounded-full">My trips</Button>
            <img className='h-[50px] w-[50px] rounded-full'   src={user?.picture}/>
          </div> : <Button>Sign in</Button>
        }
      </div>
    </div>
  )
}

export default Header
