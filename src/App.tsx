import './App.scss';
import { useEffect, useState } from "react";
import Loader from "./common/Loader/Loader";
import {asyncFunc} from "./api/api";
import Header from './components/Header/Header'
import ImagesContainer from './components/ImagesContainer/ImagesContainer'
import Footer from './components/Footer/Footer'
import ModalUser from './components/ModalUser/ModalUser'
import ModalImages from './components/ModalImage/ModalImage'
import Initial from './components/Initial/Initial'
import { IconButton, Snackbar, SnackbarCloseReason } from '@mui/material'
import { ChevronLeft, ChevronRight, ShieldCheck, X } from 'lucide-react'
import Nothing from './components/Nothing/Nothing'
import { useStore } from './common/store/store'

function App() {

    const {setLoad, isLoad, controls, setCollapsed, isModal, page, images, updateImages, setPage} = useStore()
    const [isInitial, setIsInitial] = useState(true)  
    const [found, setFound] = useState(false);
    const [keyWord, setKeyWord] = useState(controls.value);
    
    useEffect(() => {
       getImages(controls.value, page, controls.orderBy, controls.orientation, controls.color)
    }, [])

    async function getImages(value: string, page: number, order: string, orientation: string, color: string) {
      try {
        setLoad(true)
        const data = await asyncFunc.getImagesAPI(value, page, order, orientation, color)
        updateImages(data)
        setFound(true)
        setCollapsed(true)
        setKeyWord(value)
      } finally {
        setTimeout(() => setLoad(false), 2000)
      }  
    }

    const handleClose = (_event: React.SyntheticEvent | Event, reason?: SnackbarCloseReason) => reason === 'clickaway' ? false : setFound(false)

    const pageIncrement = () => {
      setPage(page + 1)
      getImages(controls.value, page + 1, controls.orderBy, controls.orientation, controls.color)
    }

    const pageDecrement = () => {
      page <= 1 ? setPage(1) : setPage(page - 1)
      getImages(controls.value, page - 1, controls.orderBy, controls.orientation, controls.color)
    }

    return (<>
                {isLoad && <Loader />}
                {isInitial && <Initial setIsInitial={setIsInitial} />}
                <Snackbar
                  open={found && !isInitial}
                  autoHideDuration={4000}
                  onClose={handleClose}
                  message={images?.total > 0 ? <>Found: {images?.total} photos</> : <>Found: 0 photos</>}
                  action={<IconButton
                    size="large"
                    aria-label="close"
                    color="inherit"
                    onClick={handleClose}
                  >
                      <X />
                  </IconButton>}
                />
                <div className="App">
                    <Header getImages={getImages} />
                    <main >
                        <h2>
                          <div className='query'>
                            <ShieldCheck className='query-icon' size={50} />
                            {keyWord}
                          </div>
                          {images.total > 0 && <div className='images__pagination top'>
                            {page >= 2 && <button onClick={pageDecrement}>Prev<ChevronLeft size={30} className='icon' /></button>}
                            {page < images.total_pages  && <button onClick={pageIncrement}>Next<ChevronRight className='icon' size={30} /></button>}    
                            </div>}
                        </h2>
                        {images?.total ? <ImagesContainer getImages={getImages}  /> : <Nothing />}
                        {isModal?.image && <ModalImages />}
                        {isModal?.user && <ModalUser />}   
                        <Footer />
                    </main>
                </div>
            </>);
}
export default App;