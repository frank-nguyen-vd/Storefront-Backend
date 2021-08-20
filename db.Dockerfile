from postgres:13

WORKDIR /app

RUN apt-get update -y && apt-get install sudo -y

COPY db.entrypoint.sh .

CMD ["/bin/bash", "db.entrypoint.sh"]