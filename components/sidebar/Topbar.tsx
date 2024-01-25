import React from 'react'
import SidebarToggle from './side-bar-toggle'

const Topbar = () => {
  return (
    <header className="flex items-center justify-between p-6 border-b-2">
    <h2 className="text-2xl font-semibold"></h2>
    <div className="flex items-center space-x-2">
      <SidebarToggle />
    </div>
  </header>
  )
}

export default Topbar
