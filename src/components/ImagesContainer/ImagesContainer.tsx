import { Box, IconButton, ImageList, ImageListItem, ImageListItemBar, Tooltip } from '@mui/material'
import { ArrowDownToLine, ChevronLeft, ChevronRight } from 'lucide-react'
import { asyncFunc } from '../../api/api'
import { IImage } from '../../common/types/images'
import { IHeaderProps } from '../../common/types/props'
import { memo } from 'react'
import { useStore } from '../../common/store/store'

const ImagesContainer = memo(({getImages} : IHeaderProps) => {

  	const {setLoad, controls, updateModalUser, updateModalImage, page, setPage, images, updatePhoto, updateUser} = useStore()
    
  	const pageIncrement = () => {
      setPage(page + 1)
      getImages(controls.value, page + 1, controls.orderBy, controls.orientation, controls.color)
    }

    const pageDecrement = () => {
      if(page <= 1) setPage(1)
      else setPage(page - 1)
      getImages(controls.value, page - 1, controls.orderBy, controls.orientation, controls.color)
    }

	async function getUserbyUserName(username: string) {	
		try {
			setLoad(true)
			const data = await asyncFunc.getUser(username)
			updateUser(data);
			updateModalUser(true)
		} finally {
			setLoad(false)
		}
	}

	const getPhotosById = async(id: string) => {
      try {
		setLoad(true)
        updatePhoto({}) 
        const currentImages = await asyncFunc.getPhoto(id) 
        updatePhoto(currentImages) 
		updateModalImage(true)
      } finally {
        setLoad(false)
      }
    }
	
	return (<section className='images'>
					<Box>
						<ImageList className='images__container' variant="masonry" cols={window.innerWidth < 768 ? 1 : 3} gap={10}>
							{images?.results?.map((item: IImage) => (
							<ImageListItem  className='images__container-item' key={item.id}>
								<img
									srcSet={`${item.urls.small}?w=248&fit=crop&auto=format&dpr=2 2x`}
									src={`${item.urls.small}?w=248&fit=crop&auto=format`}
									alt={item.alt_description}
									style={{cursor: 'zoom-in'}}
									onClick={() => getPhotosById(item?.id)}
									loading="lazy"
									className='images__container-item-image'
								/>
								<ImageListItemBar
									className='images__container-item-user'
									title={<>
												<span>{item.user.name}</span>
												<Tooltip title="download"><a target='_blank' href={item?.links?.download}><ArrowDownToLine /></a></Tooltip>
											</>}
									position="bottom"
									actionIcon={
										<Tooltip title="look">
											<IconButton
												onClick={() => getUserbyUserName(item.user.username)}
												sx={{ color: 'white' }}
												aria-label={`star ${item.user.name}`}
											>
												<img width={30} src={item.user.profile_image.small} alt='avatar' />
											</IconButton>
										</Tooltip>
										
									}
									actionPosition="left"
								/>
							</ImageListItem>
							))}
						</ImageList>
					</Box>
					{images.total > 0 && <div className='images__pagination'>
						{page >= 2 && <button onClick={pageDecrement}>Prev<ChevronLeft size={30} className='icon' /></button>}
						{page < images.total_pages  && <button onClick={pageIncrement}>Next<ChevronRight className='icon' size={30} /></button>}    
					</div>}
			</section>)
})
export default ImagesContainer