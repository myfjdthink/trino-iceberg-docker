FROM trinodb/trino:425

ENV TRINO_HOME=/usr/lib/trino

# Download hadoop-cos plugin
RUN curl https://github.com/tencentyun/hadoop-cos/releases/download/v8.3.1/hadoop-cos-3.3.0-8.3.1.jar -Lo hadoop-cos-3.3.0-8.3.1.jar \
    && mv hadoop-cos-3.3.0-8.3.1.jar ${TRINO_HOME}/plugin/hive/ \
RUN curl https://github.com/tencentyun/hadoop-cos/releases/download/v8.3.1/cos_api-bundle-5.6.137.2.jar -Lo cos_api-bundle-5.6.137.2.jar \
    && mv hadoop-cos-3.3.0-8.3.1.jar ${TRINO_HOME}/plugin/hive/

