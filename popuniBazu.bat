docker exec -u root or-db mongoimport --db=orlabDB --collection=clubs --type=json --username=bmedvedec --password=lozinka --authenticationDatabase=admin --file=clubs.json --jsonArray
docker exec -u root or-db mongoimport --db=orlabDB --collection=api --type=json --username=bmedvedec --password=lozinka --authenticationDatabase=admin --file=openapi.json
