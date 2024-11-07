import { IconButton, ImageList, ImageListItem, ImageListItemBar, Tooltip } from '@mui/material'
import { asyncFunc } from '../../api/api'
import { ArrowBigDownDash, ArrowDownToLine, Dot, Eye, X } from 'lucide-react'
import { IImage } from '../../common/types/images'
import { useStore } from '../../common/store/store'

const ModalImages = () => {

	const {setLoad, updateModalImage, updateModalUser, images, photo, updatePhoto, updateUser} = useStore()

	function closeModal() {
		updatePhoto(null)
		updateUser(null)
		updateModalImage(false)
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

	const getPhotosById = async (id: string) => {
		try {
			setLoad(true)
			updatePhoto({})
			updateModalImage(false)
			const currentImages = await asyncFunc.getPhoto(id) 
			updatePhoto(currentImages) 
			window.scrollTo({
				top: 0,
				behavior: "smooth",
			});
		} finally {
			updateModalImage(true)
			setLoad(false)
		}
	}
	
	return (<section className='modalimages'>
				<a onClick={closeModal} className='modalimages__close' href='#'></a> 
				<div className='modalimages__body'>
					<X size={40} className='modalimages__body-close' onClick={closeModal} />	
						<a target="_blank" className='modalimages__body-download' download={true} href={photo?.links?.download}><ArrowBigDownDash size={40} /></a>
						<article className='modalimages__body-image'>
							<img src={photo?.urls?.full} alt={photo?.alt_description} />
						</article>
						<article className='modalimages__body-info'>
								<div className='modalimages__body-info-column'>
									<span>Published: {photo?.created_at}</span>
									<span><Eye /> {photo?.views}</span>
									<div>Width/Height:  <span>{photo?.width}</span>/<span>{photo?.height}</span></div>
								</div>
								<div className='modalimages__body-info-column'>
									<h2>{photo?.alt_description?.slice(0, 1).toUpperCase() + photo?.alt_description?.slice(1) || photo?.description?.slice(0, 1).toUpperCase() + photo?.description?.slice(1)}</h2> 
								</div>
								<div onClick={() => getUserbyUserName(photo?.user?.username)} className='modalimages__body-info-column user'>
										<img width="40" height="40" src={photo?.user?.profile_image?.small} alt="avatar" /> {photo?.user?.name}
								</div>
								{photo?.tags?.length > 0 && <div className='modalimages__body-info-column tags'> 
										Tags: 
										<ul>
											{photo?.tags?.map((tag: any, index: number) => <li key={index}><Dot />{tag?.title}</li>)}
										</ul>
								</div> }           
						</article>
						<article>
							<ImageList variant="masonry" cols={2} gap={window.innerWidth < 768 ? 3 : 10}>
									{images?.results?.filter((item: IImage) => item.id !== photo.id).slice(0, 6).map((item: IImage) => (
									<ImageListItem key={item.id}>
										<img
											srcSet={`${item.urls.small}?w=248&fit=crop&auto=format&dpr=2 2x`}
											src={`${item.urls.small}?w=248&fit=crop&auto=format`}
											alt={item.alt_description}
											loading="lazy"
											style={{cursor: 'zoom-in'}}
											onClick={() => getPhotosById(item?.id)}
										/>
										<ImageListItemBar
											sx={{
												background:
												'linear-gradient(to bottom, rgba(0,0,0,0.8) 0%, ' +
												'rgba(0,0,0,0.4) 70%, rgba(0,0,0,0.8) 100%)',
											}}
											className='images__container-item-user'
											title={<><span>{item.user.name}</span><a target='_blank' href={item?.links?.download}><ArrowDownToLine /></a></>}
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
						</article>					
				</div>
			</section>)
}
export default ModalImages