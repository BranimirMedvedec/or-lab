import { Club } from "@/types/Club"

type ClubWithId = Club & { _id: string }

export const parseClubs = (clubs: any) => {
	return clubs.map((club: any) => {
		return {
			...club,
			_id: club._id.toString(),
		}
	}) as ClubWithId[]
}
