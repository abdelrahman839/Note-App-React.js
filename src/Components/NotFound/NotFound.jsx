import React from 'react'
import notFoundStyle from './notFound.module.css'
function NotFound() {
    return (
        <>
            <div className=" position-absolute w-100 h-92  mx-auto d-flex justify-content-center align-items-center flex-column ">
                <h1 className={`${notFoundStyle.H1}`}> Page Not Found</h1>
                <h3><span className={`${notFoundStyle.four}`}>4</span> <span className={`${notFoundStyle.zero}`}>0</span> <span className={`${notFoundStyle.four}`}>4</span></h3>
            </div>
        </>
    )
}

export default NotFound
