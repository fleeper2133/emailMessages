#!/usr/bin/env bash
sudo -u postgres psql -v ON_ERROR_STOP=1 --username postgres <<-EOSQL
BEGIN;
SELECT setval(pg_get_serial_sequence('"proposals_qualificationcatparent"','id'), coalesce(max("id"), 1), max("id") IS NOT null) FROM "proposals_qualificationcatparent";
SELECT setval(pg_get_serial_sequence('"proposals_qualificationcat"','id'), coalesce(max("id"), 1), max("id") IS NOT null) FROM "proposals_qualificationcat";
SELECT setval(pg_get_serial_sequence('"proposals_group"','id'), coalesce(max("id"), 1), max("id") IS NOT null) FROM "proposals_group";
SELECT setval(pg_get_serial_sequence('"proposals_person"','id'), coalesce(max("id"), 1), max("id") IS NOT null) FROM "proposals_person";
SELECT setval(pg_get_serial_sequence('"proposals_proposal"','id'), coalesce(max("id"), 1), max("id") IS NOT null) FROM "proposals_proposal";
SELECT setval(pg_get_serial_sequence('"proposals_documentproposal"','id'), coalesce(max("id"), 1), max("id") IS NOT null) FROM "proposals_documentproposal";
SELECT setval(pg_get_serial_sequence('"proposals_statuscontrol"','id'), coalesce(max("id"), 1), max("id") IS NOT null) FROM "proposals_statuscontrol";
COMMIT;
EOSQL
