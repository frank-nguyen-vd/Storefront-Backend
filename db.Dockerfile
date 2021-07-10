from postgres

COPY db.entrypoint.sh .

CMD ["/bin/bash", "db.entrypoint.sh"]