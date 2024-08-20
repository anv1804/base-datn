import React from 'react'
import Sidebar from '../../components/admin/layout/Sidebar'
import ProductList from '../../components/admin/ProductList'

const DashboardPage = () => {
  return (
    <div className='wrapper'>
    <div className="container grid grid-cols-[250px_1fr]">
        <div className="container-left w-full ">
            <Sidebar/>
        </div>
        <div className="container-right">
          <ProductList/>
        </div>

    </div>
</div>
  )
}

export default DashboardPage