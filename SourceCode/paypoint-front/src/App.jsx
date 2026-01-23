import {Routes, Route, Link} from 'react-router-dom'
import MainLayout from './layouts/MainLayout';
import Dashboard from './Dashboard';

function App(){
  return (
    // <div className='App'>
    //   <nav className='text-1xl text-blue-600 underline'>
    //     <Link to="/">Beranda</Link> | 
    //     <Link to="/about">About</Link>
    //   </nav>

    //   <Routes>
    //     <Route path='/' element={<Home/>}/>
    //     <Route path='/about' element={<About/>}/>
    //   </Routes>
    // </div>
    <>
      <MainLayout>
        <Routes>
          <Route path='/' element={<Dashboard/>}></Route>
        </Routes>
      </MainLayout>
    </>
  )
}

export default App;