FROM yumafuu/mysqldef:latest as builder

FROM alpine:3.15.2
COPY --from=builder /usr/local/bin/mysqldef /usr/local/bin/mysqldef
RUN chmod +x /usr/local/bin/mysqldef

WORKDIR /migrations
COPY migrations /migrations
CMD ["/bin/sh", "-c", "mysqldef -u ${MYSQL_USER} --host ${MYSQL_HOST} -p${MYSQL_PASSWORD} ${MYSQL_DATABASE} < article/schema.sql"]
