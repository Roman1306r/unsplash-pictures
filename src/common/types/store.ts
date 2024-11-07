import { IImagesServer } from './images'

export interface IControls {
	value: string, 
	orderBy: string, 
	orientation: string, 
	color: string
}

export interface IStore {
	page: number,
	isLoad: boolean
	controls: IControls
	isCollapsed: boolean,
	isModal: {
		image: boolean,
		user: boolean
	},
	images: any,
	user: any,
	photo: any

	setPage: (page: number) => void,
	setLoad: (isLoad: boolean) => void,
	setCollapsed: (isCollapsed: boolean) => void,
	updateValue: (newValue: string) => void
	updateOrder: (newOrder: string) => void
	updateColor: (newColor: string) => void
	updateOrientation: (newOrientation: string) => void,
	updateModalImage: (newValue: boolean) => void
	updateModalUser: (newValue: boolean) => void
	updateImages: (images: IImagesServer) => void,
	updateUser: (user: any) => void,
	updatePhoto: (photo: any) => void,
}

