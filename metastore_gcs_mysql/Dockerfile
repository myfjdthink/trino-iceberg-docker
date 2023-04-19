# syyntax=docker/dockerfile:1
#FROM openjdk:11-bullseye
FROM openjdk:11-jre

ENV METASTORE_HADOOP_VERSION=3.2.0
ENV METASTORE_VERSION=3.0.0
ENV HADOOP_HOME=/opt/hadoop
ENV HIVE_HOME=/opt/metastore
ENV BIN_DIR=/usr/bin

ENV PATH="/opt/spark/sbin:/opt/spark/bin:${PATH}"
ENV INSTALL_DIR=/tmp/install

RUN mkdir -p ${HADOOP_HOME} ${HIVE_HOME} ${MINIO_HOME}/bin ${INSTALL_DIR}


WORKDIR ${INSTALL_DIR}

# Download and install haddop for metastore
RUN curl https://archive.apache.org/dist/hadoop/common/hadoop-${METASTORE_HADOOP_VERSION}/hadoop-${METASTORE_HADOOP_VERSION}.tar.gz -Lo hadoop.tgz \
    && tar xvzf hadoop.tgz --directory ${HADOOP_HOME} --strip-components 1 \
    && rm hadoop.tgz
# Download and install Hive metastore
RUN curl https://downloads.apache.org/hive/hive-standalone-metastore-${METASTORE_VERSION}/hive-standalone-metastore-${METASTORE_VERSION}-bin.tar.gz -Lo hive.tgz \
    && tar xvzf hive.tgz --directory ${HIVE_HOME} --strip-components 1 \
    && rm hive.tgz
# Download and install MySQL deiver for Hive metastore
RUN curl -L https://dev.mysql.com/get/Downloads/Connector-J/mysql-connector-java-8.0.26.tar.gz | tar zxf - && \
    cp mysql-connector-java-8.0.26/mysql-connector-java-8.0.26.jar ${HIVE_HOME}/lib/ && \
    rm -rf  mysql-connector-java-8.0.26
# Dowload GCS Connector
RUN curl https://github.com/GoogleCloudDataproc/hadoop-connectors/releases/download/v2.2.12/gcs-connector-hadoop3-2.2.12-shaded.jar -Lo  gcs-connector-hadoop3-2.2.12-shaded.jar \
   && mv gcs-connector-hadoop3-2.2.12-shaded.jar ${HIVE_HOME}/lib

WORKDIR ${HIVE_HOME}

COPY conf/metastore-site.xml ${HIVE_HOME}/conf
COPY scripts/entrypoint.sh ${BIN_DIR}
COPY gcs_secret_key.json /opt/metastore/gcs_secret_key.json

RUN chmod a+x ${HIVE_HOME}/bin/*
RUN chmod a+x ${BIN_DIR}/entrypoint.sh

EXPOSE 9083

ENTRYPOINT ["/usr/bin/entrypoint.sh"]
CMD ["notebook"]