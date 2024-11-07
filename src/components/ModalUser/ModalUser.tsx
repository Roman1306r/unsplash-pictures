import { ArrowBigDownDash, Heart, Users, X, Image, Instagram, BriefcaseBusiness, Twitter } from 'lucide-react'
import { Tooltip } from '@mui/material'
import { useStore } from '../../common/store/store'

const ModalUser = () => {

    const {updateModalUser, user, updateUser} = useStore()

    function closeModal() {
        updateUser(null)
        updateModalUser(false)
    }

    function copyText(text: string) {
        navigator.clipboard.writeText(text);
        alert('Сopied')
    }
     
    return (<section className='modalimages'>
                <a onClick={closeModal} className='modalimages__close' href='#'></a>    
                <div className='modalimages__body'>
                    <X size={40} className='modalimages__body-close' onClick={closeModal} />
                    <div className='profile__body'>
                            <div className='profile__body-top'>
                                <div>
                                    <img src={user?.profile_image?.large} alt={user?.username} />
                                </div>
                                <div>
                                    <h2>{user?.first_name} {user?.last_name || ''}</h2>
                                    <h3>Username: <span>{user?.username}</span></h3>   
                                </div>
                            </div>
                            <div className='profile__body-center'>
                                {user?.location && <p><span>Location:</span> {user?.location}</p>}
                                {user?.bio && <p><span>Biography:</span> {user?.bio}</p>}
                            </div>
                            <div className='profile__body-social'>
                                {user?.social?.instagram_username && <Tooltip title="Copy"><p onClick={() => copyText(user?.social?.instagram_username)}><Instagram /> {user?.social?.instagram_username}</p></Tooltip>}
                                {user?.social?.twitter_username && <Tooltip title="Copy"><p onClick={() => copyText(user?.social?.twitter_username)}><Twitter /> {user?.social?.twitter_username}</p></Tooltip>}
                                {user?.social?.portfolio_url &&  <Tooltip title="Open"><p><BriefcaseBusiness /><a target="_blank" href={user?.portfolio_url}>{user?.portfolio_url}</a></p></Tooltip>}                             
                            </div>

                            <div className='profile__body-bottom'> 
                                <div className='profile__body-bottom-item'>
                                    <ArrowBigDownDash size={40} />
                                    <div>
                                        <h4>Downloads</h4>
                                        <span>{user?.downloads}</span>
                                    </div>
                                </div>
                                <div className='profile__body-bottom-item'>
                                    <Users size={40} />
                                    <div>
                                        <h4>Followers</h4>
                                        <span>{user?.followers_count}</span>
                                    </div>
                                </div>
                                <div className='profile__body-bottom-item'>
                                    <Heart size={40} />
                                    <div>
                                        <h4>Likes</h4>
                                        <span>{user?.total_likes}</span>
                                    </div>
                                </div>
                                <div className='profile__body-bottom-item'>
                                    <Image size={40} />
                                    <div>
                                        <h4>Photos</h4>
                                        <span>{user?.total_photos}</span>
                                    </div>
                                </div>
                            </div>
                           
                    </div>
                </div>
            </section>)
}
export default ModalUser