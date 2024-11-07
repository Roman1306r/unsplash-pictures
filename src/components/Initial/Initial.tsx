import { Button } from '@mui/material'
import { memo } from 'react'
import { Play } from 'lucide-react'
import { useStore } from '../../common/store/store'

const Initial = memo(({setIsInitial} : {setIsInitial: (isInitial: boolean) => void}) => {

	const {setCollapsed} = useStore()

	function closeInitialWindow() {
		setIsInitial(false)
		setTimeout(() => setCollapsed(false) , 2000)
	}

	return (<section className='initial'>
				<div className='initial__dark'></div>
				<div className='initial__body'>
					<p>Welcome. Here you can find and download high quality stock images</p>
					<Button fullWidth onClick={closeInitialWindow} size="large" variant="contained" color="inherit">
						<span className='text'>Start</span>
						<Play className='icon' />
					</Button>
				</div>
			</section>);
})
export default Initial;