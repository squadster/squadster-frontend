import React from 'react'
import { Button } from '@material-ui/core'
import { Link } from 'react-router-dom'

export default function NotFound() {
  return <div className='m-auto d-flex flex-column'>
    <h1>
      Страница не найдена
    </h1>
    <Link className='d-flex justify-content-center' to='/'>
      <Button variant='contained' color='primary' className='mt-4 color-white'>
        Назад
      </Button>
    </Link>
  </div>
}
