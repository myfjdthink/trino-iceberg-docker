#!/bin/bash

export JAVA_HOME="$(jrunscript -e 'java.lang.System.out.println(java.lang.System.getProperty("java.home"));')"
export HADOOP_HOME=/opt/hadoop
export HIVE_HOME=/opt/metastore
export METASTORE_HADOOP_VERSION=3.2.0


# metastore
# initSchema only needs to be run once
# ${HIVE_HOME}/bin/schematool -initSchema -dbType mysql
${HIVE_HOME}/bin/start-metastore