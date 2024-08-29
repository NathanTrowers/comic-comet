#~/bin/bash

mysql -uroot -p$MYSQL_ROOT_PASSWORD -e "CREATE DATABASE comic_comet_warehouse;"
mysql -uroot -p$MYSQL_ROOT_PASSWORD -e "CREATE USER 'fourth-wall'@'%' IDENTIFIED BY '$MYSQL_ROOT_PASSWORD';"
mysql -uroot -p$MYSQL_ROOT_PASSWORD -e "GRANT CREATE, DROP, INSERT, DELETE, UPDATE, ALTER, INDEX, LOCK TABLES, SELECT, REFERENCES ON comic_comet_warehouse.* TO 'fourth-wall'@'%';"
mysql -uroot -p$MYSQL_ROOT_PASSWORD -e "CREATE USER 'sage-cave'@'%' IDENTIFIED BY '$MYSQL_ROOT_PASSWORD';"
mysql -uroot -p$MYSQL_ROOT_PASSWORD -e "GRANT SELECT, INSERT, UPDATE, DELETE ON comic_comet_warehouse.* TO 'sage-cave'@'%';"
mysql -uroot -p$MYSQL_ROOT_PASSWORD -e "CREATE USER 'meteor-shower'@'%' IDENTIFIED BY '$MYSQL_ROOT_PASSWORD';"
mysql -uroot -p$MYSQL_ROOT_PASSWORD -e "GRANT SELECT, INSERT, UPDATE ON comic_comet_warehouse.* TO 'meteor-shower'@'%';"
mysql -uroot -p$MYSQL_ROOT_PASSWORD -e "CREATE USER 'shooting-star'@'%' IDENTIFIED BY '$MYSQL_ROOT_PASSWORD';"
mysql -uroot -p$MYSQL_ROOT_PASSWORD -e "GRANT SELECT ON comic_comet_warehouse.* TO 'shooting-star'@'%';"

echo "INFO: SQL users sucessfully created!";
