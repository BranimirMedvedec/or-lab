FROM mongo
ENV MONGO_INITDB_ROOT_USERNAME bmedvedec
ENV MONGO_INITDB_ROOT_PASSWORD lozinka
COPY clubs.json /clubs.json
COPY openapi.json /openapi.json
EXPOSE 27017