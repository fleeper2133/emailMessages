#!/usr/bin/env bash

if [[ $0 != "utils/reset.bash" ]]
then
    echo "Try 'utils/reset.bash'"
    exit
fi

chmod +x utils/*

while true
do
    echo "Enter 'help' for show legend"
    read -p "Choose action > " choice
    case "$choice" in
        "help" )
                echo "0 - Make all operations"
                echo "1 - Drop DB"
                echo "2 - Create DB"
                echo "3 - Remove migrations"
                echo "4 - Make migrations"
                echo "5 - Apply migrations"
                # echo "6 - Fill DB"
                echo "Any other key to exit"
        ;;
        0 )
            utils/postgres_db_drop.bash
            utils/postgres_db_create.bash
            utils/remove_migrations.bash
            python manage.py makemigrations
            python manage.py migrate
            # python manage.py mommy_fill_db
        ;;
        1 ) utils/postgres_db_drop.bash;;
        2 ) utils/postgres_db_create.bash;;
        3 ) utils/remove_migrations.bash;;
        4 ) python manage.py makemigrations;;
        5 ) python manage.py migrate;;
        # 6 ) python manage.py mommy_fill_db;;
        * ) break;;
    esac
done
