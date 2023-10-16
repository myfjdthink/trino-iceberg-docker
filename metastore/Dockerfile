# syntax=docker/dockerfile:1
#FROM openjdk:11-bullseye
FROM openjdk:11-jre

ENV HADOOP_HOME=/opt/hadoop
ENV HIVE_HOME=/opt/metastore
ENV BIN_DIR=/usr/bin

ENV PATH="/opt/spark/sbin:/opt/spark/bin:${PATH}"
ENV INSTALL_DIR=/tmp/install

RUN mkdir -p ${HADOOP_HOME} ${HIVE_HOME} ${MINIO_HOME}/bin ${INSTALL_DIR}


WORKDIR ${INSTALL_DIR}

# Install AWS CLI
RUN curl https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip -o awscliv2.zip \
    && unzip awscliv2.zip \
    && ./aws/install \
    && rm awscliv2.zip \
    && rm -rf aws/
# Download and install haddop for metastore 
RUN curl https://mirrors.tuna.tsinghua.edu.cn/apache/hadoop/common/hadoop-3.3.6/hadoop-3.3.6.tar.gz -Lo hadoop.tgz \
    && tar xvzf hadoop.tgz --directory ${HADOOP_HOME} --strip-components 1 \
    && rm hadoop.tgz
# Download and install Hive metastore
RUN curl https://mirrors.tuna.tsinghua.edu.cn/apache/hive/hive-standalone-metastore-3.0.0/hive-standalone-metastore-3.0.0-bin.tar.gz -Lo hive.tgz \
    && tar xvzf hive.tgz --directory ${HIVE_HOME} --strip-components 1 \
    && rm hive.tgz
# Download and install Postgres deiver for Hive metastore
RUN curl https://repo1.maven.org/maven2/org/postgresql/postgresql/42.4.0/postgresql-42.4.0.jar -Lo pgsql.jar \
    && mv pgsql.jar ${HIVE_HOME}/lib 

# Download Java AWS SDK
RUN curl https://repo1.maven.org/maven2/software/amazon/awssdk/bundle/2.17.247/bundle-2.17.247.jar -Lo bundle-2.17.247.jar \
    && mv bundle-2.17.247.jar ${HIVE_HOME}/lib \
# hadoop-aws
RUN curl https://repo1.maven.org/maven2/org/apache/hadoop/hadoop-aws/3.2.3/hadoop-aws-3.2.3.jar -Lo hadoop-aws-3.2.3.jar \
    && mv hadoop-aws-3.2.3.jar ${HIVE_HOME}/lib
# Download URL connection client required for S3FileIO
RUN curl https://repo1.maven.org/maven2/software/amazon/awssdk/url-connection-client/2.17.247/url-connection-client-2.17.247.jar -Lo url-connection-client-2.17.247.jar \
     && mv url-connection-client-2.17.247.jar ${HIVE_HOME}/lib

WORKDIR ${HIVE_HOME}

RUN rm ${HIVE_HOME}/lib/guava-19.0.jar && cp ${HADOOP_HOME}/share/hadoop/hdfs/lib/guava-27.0-jre.jar ${HIVE_HOME}/lib/

COPY conf/metastore-site.xml ${HIVE_HOME}/conf
COPY scripts/entrypoint.sh ${BIN_DIR}

RUN chmod u+x ${HIVE_HOME}/bin/*

EXPOSE 9083

ENTRYPOINT ["/usr/bin/entrypoint.sh"]