export interface IImagesServer {
	total: number,
	total_pages: number,
	results: IImage[]
}

export interface IImage {
	alt_description: string,
	alternative_slugs: any,
	asset_type: string,
	blur_hash: string,
	breadcrumbs: {
		index: number,
		slug: string,
		title: string,
		type: string
	}[],
	color: string,
	created_at: string,
	current_user_collections: any,
	description: any,
	height: number,
	id: string,
	liked_by_user: boolean,
	likes: number,
	links: any,
	promoted_at: string,
	slug: string,
	sponsorship: null | string,
	topic_submissions: any,
	updated_at: string,
	urls: any,
	user: any,
	width: number
}