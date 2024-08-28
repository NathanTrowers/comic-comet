# ComicComet Installation Instructions

On this page:

- [ComicComet Installation Instructions](#comiccomet-installation-instructions)
  - [General Start-up Instructions](#general-start-up-instructions)
    - [Database Configuration](#database-configuration)
    - [Database Migration](#database-migration)
  - [Shooting Star Configuration](#shooting-star-configuration)
  - [Service Summary](#service-summary)
  - [Notes on the Testing Procedures](#notes-on-the-testing-procedures)

## General Start-up Instructions

All of the following is to be done using the command line:

After running `git pull https://github.com/NathanTrowers/ComicComet`, the database needs to be configured.

### Database Configuration

Create an empty directory in the root of the project called ***mysql***.
Run `docker compose up mysql` to create the database container. Wait until you see the below as part of the console message before doing anything else:
`[Server] /usr/sbin/mysqld: ready for connections. Version: '8.1.0'  socket: '/var/run/mysqld/mysqld.sock'  port: 3306  MySQL Community Server - GPL.`

In another command-line window, run `docker exec -it mysql bash` to enter the container.  Afterwards, enter the following respective commands:

``` shell
bash-4.4$ mysql 
Enter password: AdM1n
...
mysql> CREATE DATABASE comic_comet_warehouse;
mysql> CREATE USER 'springuser'@'%' IDENTIFIED BY 'AdM1n';
mysql> GRANT ALL ON comic_comet_warehouse.* TO 'springuser'@'%'; # grant these privileges only for the user on your local machine
mysql> CREATE USER 'sage-cave'@'%' IDENTIFIED BY 'AdM1n';
mysql> GRANT SELECT, INSERT, UPDATE, DELETE ON comic_comet_warehouse.* TO 'sage-cave'@'%';
mysql> CREATE USER 'meteor-shower'@'%' IDENTIFIED BY 'AdM1n';
mysql> GRANT SELECT, INSERT, UPDATE ON comic_comet_warehouse.* TO 'meteor-shower'@'%';
mysql> CREATE USER 'shooting-star'@'%' IDENTIFIED BY 'AdM1n';
mysql> GRANT SELECT ON comic_comet_warehouse.* TO 'shooting-star'@'%';
mysql> exit
...
bash-4.4$ exit
```

### Database Migration

After exiting the container, stop the mysql instance running in the other window.

Before moviing on, ensure that NodeJS is installed locally.  If installed, go into the ***sage-mountain*** and ***the-observatory*** folders and run the following command: `npm install`.

Next run `docker compose up`  This will start-up the entire application.  Once started, in another window, run the following commands:

``` shell
$# docker exec -it comiccomet-mysql-1 bash
bash-4.4$ mysql 
Enter password: AdM1n
...
mysql> USE comic_comet_warehouse;
mysql> DROP TABLE admin, customer;
mysql> exit
...
bash-4.4$ exit
...
$# docker exec -it comiccomet-fourth-wall-1 bash
root@2345719d0f29:/app$ cd src/migrations
root@2345719d0f29:/app/src/migrations$ /app/liquibase-libs/liquibase update --changelog-file=root-changelog.yaml --username $DATABASE_USERNAME --password $DATABASE_PASSWORD
root@2345719d0f29:/app/src/migrations$ exit
```

The above commands will have you enter the ***fourth-wall*** container, change the directory to the folder container the database migrations, running those migrations, then finally exiting the container.

## Shooting Star Configuration

In the ***docker-compose.yaml*** file, under `shooting-star` replace the values for the following environment variables with ones relevant to your own email, username, app password, email username, and sending address.  Based on the services current architecture, the sending and receiving email addresses are pre-determined.

``` yaml
      - EMAIL_HOST=my.host.com
      - EMAIL_PASSWORD=myAppPassword
      ...
      - EMAIL_USERNAME=myEmailUsername@host.com
      - EMAIL_RECEIVING_ADDRESS=myEmailUsername@host.com
```

## Service Summary

|Name           |Programming Language / Framework |Test Framework(s)  |Role                      |
|---------------|---------------------------------|-------------------|--------------------------|
|fourth-wall    |Java / Spring Boot               |JUnit              |Authentication API        |
|sage-cave      |Java / Spring Boot               |JUnit              |Admin User API            |
|meteor-shower  |Java / Spring Boot               |JUnit              |Customer User API         |
|shooting-star  |Java / Spring Boot               |JUnit              |Email API                 |
|sage-mountain  |TypeScript / Angular             |Jasmine, Cypress   |Admin User Front-end      |
|the-observatory|TypeScript / Angular             |Jasmine, Cypress   |Customer User Front-end   |

## Notes on the Testing Procedures

For all containers, with the exception of Cypress tests, tests are to be run within the containers.  Cypress tests are to be run outside of the containers using your local machine's browser.  Below is an example of how to start Cypress:

``` shell
ComicComet/sage-mountain$ npx cypress open
```

Below is an example of how to run Jasmine tests within an Angular app's main folder:

``` shell
$# docker exec -it comiccomet-sage-mountain-1 sh
/app $ npm test # Karma test runner automatically watches files for changes
```

Below is a list of commands for running JUnit tests:

``` docker
root@2345719d0f29:/app$ ./mvnw test # run all tests
root@2345719d0f29:/app$ ./mvnw test -Dtest="ClassName" # run a single test class
root@2345719d0f29:/app$ ./mvnw test -Dtest="ClassName#testName" # run a single test
```
