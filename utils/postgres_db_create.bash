#!/usr/bin/env bash
sudo -u postgres psql -v ON_ERROR_STOP=1 --username postgres <<-EOSQL
    CREATE DATABASE emailMessages_db;
    CREATE USER emailMessages_user WITH PASSWORD 'password';
    ALTER ROLE emailMessages_user SET client_encoding TO 'utf8';
    ALTER ROLE emailMessages_user SET default_transaction_isolation TO 'read committed';
    ALTER ROLE emailMessages_user SET timezone TO 'UTC';
    GRANT ALL PRIVILEGES ON DATABASE emailMessages_db TO emailMessages_user;
    ALTER USER emailMessages_user CREATEDB;
EOSQL
