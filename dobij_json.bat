docker exec -u root lab1 mongoexport --db=lab1DB --collection=sports_clubs --username=bmedvedec --password=lozinka --authenticationDatabase=admin --type=json > novi_json.json