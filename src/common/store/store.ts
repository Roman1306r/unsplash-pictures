import { create } from 'zustand'
import { IStore } from '../types/store'
import { IImagesServer } from '../types/images'

const initialData = {
	page: 1,
	isLoad: true,
	isCollapsed: true,
	controls: {value: 'cat', orderBy: 'relevant', orientation: 'any', color: 'any'},
	isModal: {image: false, user: false},
	images: {},
	user: null,
	photo: null
}

export const useStore = create<IStore>()((set) => ({
	...initialData,

	setPage: (page: number) => set((_state) => ({ page: page })),
	setLoad: (isLoad: boolean) => set((_state) => ({ isLoad: isLoad })),
	setCollapsed: (isCollapsed: boolean) => set((_state) => ({ isCollapsed: isCollapsed })),
	updateValue: (newValue: string) => set((state) => ({ controls: {...state.controls, value: newValue}})),
	updateOrder: (newOrder: string) => set((state) => ({ controls: {...state.controls, orderBy: newOrder}})),
	updateColor: (newColor: string) => set((state) => ({ controls: {...state.controls, color: newColor}})),
	updateOrientation: (newOrientation: string) => set((state) => ({ controls: {...state.controls, orientation: newOrientation}})),
	updateModalImage: (newValue: boolean) => set((state) => ({ isModal: {...state.isModal, image: newValue}})),
	updateModalUser: (newValue: boolean) => set((state) => ({ isModal: {...state.isModal, user: newValue}})),
	updateImages: (images: IImagesServer) => set((_state) => ({ images: images})),
	updateUser: (user: any) => set((_state) => ({ user: user})),
	updatePhoto: (photo: any) => set((_state) => ({ photo: photo}))
}))

