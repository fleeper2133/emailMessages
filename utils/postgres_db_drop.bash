#!/usr/bin/env bash
sudo -u postgres psql -v ON_ERROR_STOP=1 --username postgres <<-EOSQL
    DROP DATABASE IF EXISTS emailMessages_db;
    DROP DATABASE IF EXISTS test_emailMessages_db;
    DROP USER IF EXISTS emailMessages_user;
    DROP USER IF EXISTS test_emailMessages_db;
EOSQL
