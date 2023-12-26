import { Meta } from "./meta.interface";

export interface UserI {
	id?: number;
	username?:  string;
	email: string;
	password?: string;
	score?: number;
	wins?: number;
	losses?: number;
	blocked?: number[];
	activityStatus?: ActivityStatus;
}

export interface UserPaginateI {
	items: UserI[],
	meta: Meta
}

export type ActivityStatus = 'online' | 'in game' | 'offline'