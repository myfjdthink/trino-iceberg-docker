# Trino Connect Iceberg Demo

## 组件
- Object Storage: MinIO 对象存储
- Postgres SQL：Hive metadata DB
- Hive Metastore：Hive 元数据服务
- Trino：SQL 查询引擎

## 部署测试
使用 Docker Compose

```shell
docker-compose up -d
```

## Trino Iceberg

create schema
```sql
CREATE SCHEMA IF NOT EXISTS warehouse.iris
    WITH (location = 's3a://warehouse/');
```
注意要指定 location 

create table, 从 tpch.orders 表中取 100 条数据
```sql
create table warehouse.iris.orders as
select * from tpch.sf1.orders limit 100
```

query
```sql
select * from warehouse.iris.orders;
```