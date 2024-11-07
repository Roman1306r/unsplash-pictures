import { useState } from 'react'
import { asyncFunc } from '../../api/api'
import { Button, ButtonGroup, Drawer, Tooltip } from '@mui/material'
import { ArrowBigDownDash, Github, LayoutGrid, UserPen, X, Image, SearchCheck, Eye, Link, Braces, Images, ChartNoAxesCombined, UserPlus, Plus } from 'lucide-react'
import { IStat } from '../../common/types/statistics'
import { stat } from '../../common/data/data'
import { useStore } from '../../common/store/store'

const Footer = () => {

	const {setLoad} = useStore()
	const [stats, setStats] = useState<IStat>(stat)
	const [drawer, setDrawer] = useState<boolean>(false)
	const icons = [<ArrowBigDownDash />, <Eye />, <Image />, <UserPlus />, <Plus />, <UserPen />, <LayoutGrid />, <SearchCheck />]

	const getTotalStats = async(event: { preventDefault: () => void }) => {
		event.preventDefault()
		try {
			setLoad(true)
			const data = await asyncFunc.getStats()
			setStats(data)
			setDrawer(true)
		} finally {
			setLoad(false)
		}
	}

	return (<div className='footer'>
				<Drawer
					anchor='bottom'
					open={drawer}
					onClose={() => setDrawer(false)}
				>
					<div className='statistics'>
							<h2 className='statistics__title'>
								Statistics for the last month
								<X className='statistics__title-close' size={40} onClick={() => setDrawer(false)} />
							</h2>
							<div className='statistics__body'>
								{Object.entries(stats).map((item, index: number) => <div key={index} className='statistics__body-item'>
									<h4>{icons[index]} {item[0].slice(0, 1).toUpperCase() + item[0].slice(1).replace(/_/g, ' ')}</h4>
									<h3>{item[1]}</h3>
								</div>)}
							</div>
					</div>
				</Drawer>
				<div className='footer__body'>
					<a href='https://unsplash.com/' target="_blank" className='footer__body-left'>
							<Images size={40} />
							Photos for everyone
					</a>
					<div className='footer__body-right'>
						<ButtonGroup color="inherit" variant="text" aria-label="Basic button group">
							<Tooltip title="Github" >
								<Button><a href='https://github.com/Roman1306r' target="_blank"><Github /></a></Button>
							</Tooltip>
							<Tooltip title="CV" >
								<Button><a href='https://roman1306r.github.io/cv/' target="_blank"><Link /></a></Button>
							</Tooltip>
							<Tooltip title="Developers" >
								<Button><a href='https://unsplash.com/developers' target="_blank"><Braces /></a></Button>
							</Tooltip>
							<Tooltip title="Statistics" >
								<Button><a onClick={getTotalStats} href='#' target="_blank"><ChartNoAxesCombined /></a></Button>
							</Tooltip>
						</ButtonGroup>
					</div>
				</div>
			</div>)
}
export default Footer