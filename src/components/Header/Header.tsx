import { Button, ButtonGroup, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, Tooltip } from '@mui/material'
import { filters } from '../../common/data/filters'
import { ChevronsDown, ChevronsUp, CirclePower, Eraser, Search } from 'lucide-react'
import { memo, useState } from 'react'
import { IHeaderProps } from '../../common/types/props'
import Canvas from './Canvas'
import { useStore } from '../../common/store/store'

const Header = memo(({getImages}: IHeaderProps) => {
    
    const {controls, updateValue, updateOrder, updateColor, updateOrientation, isCollapsed, setCollapsed, updateModalImage, updateModalUser, page, setPage} = useStore()
    const [isAnimate, setIsAnimate] = useState<boolean>(false)

    function getImagesByClickButton(event: { preventDefault: () => void }) {
        event.preventDefault()
        if(controls.value.length < 1) return
        setPage(1)
        getImages(controls.value, page, controls.orderBy, controls.orientation, controls.color)
        updateModalImage(false)
        updateModalUser(false)
    }
    const getCorrectOrder = (event: { target: { value: string } }) => {
        setPage(1)
        updateModalImage(false)
        updateModalUser(false)
        updateOrder(event.target.value as string)
        getImages(controls.value, 1, event.target.value as string, controls.orientation, controls.color)
    }
    const getCorrectColor = (event: { target: { value: string } }) => {
        setPage(1)
        updateModalImage(false)
        updateModalUser(false)
        updateColor(event.target.value as string)
        getImages(controls.value, 1, controls.orderBy, controls.orientation, event.target.value as string)
    }
    const getCorrectOrientation = (event: { target: { value: string } }) => {
        setPage(1)
        updateModalImage(false)
        updateModalUser(false)
        updateOrientation(event.target.value as string)
        getImages(controls.value, 1, controls.orderBy, event.target.value as string, controls.color)
    }
    const resetFilters = () => {
        setPage(1)
        updateModalImage(false)
        updateModalUser(false)
        updateOrder('relevant')
        updateOrientation('any')
        updateColor('any')
        getImages(controls.value, 1, 'relevant', 'any', 'any')
    }

    return <header className={isCollapsed ? "header collapse" : "header"}>
                <div onClick={() => setCollapsed(!isCollapsed)} className='header__collapse'>{isCollapsed ? <ChevronsDown className='header__collapse-icon' size={30} /> : <ChevronsUp  className='header__collapse-icon' size={30} />}</div>
                <article className="header__container">
                    <h1 className='header__container-title'>
                        <>Search pictures</>
                        <ButtonGroup color="secondary" className='header__container-title-buttons'  aria-label="Basic button group">
                            <Tooltip title="Reset filters">
                                <Button className={controls.orderBy === 'relevant' && controls.color === 'any' && controls.orientation === 'any' ? 'disabled': ''} component={'span'} onClick={resetFilters}>
                                    <Eraser />
                                </Button>
                            </Tooltip>
                            <Tooltip title={isAnimate ? "Off animation" : "On animation"}>
                                <Button component={'span'} onClick={() => setIsAnimate(!isAnimate)}>
                                    <CirclePower />
                                </Button>
                            </Tooltip>
                        </ButtonGroup>
                    </h1>
                    <form onSubmit={getImagesByClickButton}  className="header__container-search">
                        <input value={controls.value} onChange={(event) => updateValue(event.target.value)} type='text' placeholder="search among all photos" />
                        <button>
                            Search
                            <Search className='icon' />
                        </button>
                    </form>
                    <div className="header__container-filters">
                        <FormControl fullWidth color="info" className='header__container-filters-item filter__orientation'>
                            <InputLabel id="demo-simple-select-label">Orientation</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={controls.orientation}
                                label="Orientation"
                                onChange={(event: SelectChangeEvent) => getCorrectOrientation(event)}
                            >
                                {filters.orientation.map(item => <MenuItem sx={{display: 'flex', alignItems: 'center'}} key={item.id} value={item.value}><item.image /> {' ' + item.value}</MenuItem>)}
                            </Select>
                        </FormControl>                    
                        <FormControl fullWidth className='header__container-filters-item filter__color'>
                            <InputLabel id="demo-simple-select-label">Color</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={controls.color}
                                label="Color"
                                onChange={(event: SelectChangeEvent) => getCorrectColor(event)}
                            >
                                {filters.color.map(item => <MenuItem key={item.id} value={item.value}>{item.image ? <div style={{ backgroundColor: item.image, borderRadius: '50%', width: '10px', height: '10px' }}
                                    ></div> : item.symbol} {item.value}</MenuItem>)}
                            </Select>
                        </FormControl>
                        <FormControl fullWidth className='header__container-filters-item filter__order'>
                            <InputLabel id="demo-simple-select-label">Sorted</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={controls.orderBy}
                                label="Sorted"
                                onChange={(event: SelectChangeEvent) => getCorrectOrder(event)}
                            >
                                {filters.sorted.map(item => <MenuItem key={item.id} value={item.value}>{item.value}</MenuItem>)}
                            </Select>
                        </FormControl>
                    </div>
                </article>
                {isAnimate && <Canvas />}
            </header>
})
export default Header;