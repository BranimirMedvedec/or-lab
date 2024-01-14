import { Club } from "@/types/Club"

type ClubWithId = Club & { _id: string }

export const transformToJSONLD = (clubs: ClubWithId[]) => {
	return clubs.map((club) => {
		return {
			"@context": "https://schema.org",
			"@type": "SportsTeam",
			id: club._id,
			name: club["Naziv kluba"],
			foundingDate: club["Godina osnutka"].toString(),
			address: {
				"@type": "PostalAddress",
				addressLocality: club.Adresa,
			},
			telephone: club["Telefon/fax"],
			email: club["E-mail"],
			url: club["Web mjesto"],
			// founder: {
			// 	"@type": "Person",
			// 	name: club["Ovlaštena osoba1"],
			// },
			employee: {
				"@type": "Person",
				name: club["Ovlaštena osoba1"],
			},
			taxID: club.OIB,
			identifier: club["Registarski broj"],
			additionalProperty: [
				{
					"@type": "PropertyValue",
					name: "Datum unosa/izmjene",
					value: club["Datum unosa/izmjene"],
				},
			],
			memberOf: {
				"@type": "Organization",
				name: club["Član RSS"],
			},
			// sport: club.Sportovi,
			potentialAction: club.Sportovi.map((sport) => ({
				"@type": "ExerciseAction",
				exerciseType: sport,
			})),
		}
	})
}
