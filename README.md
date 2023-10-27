# ComicComet Installation Instructions

On this page:

1. [General Start-up Instructions](#general-start-up-instructions)
2. [Servic Summary](#service-summary)
3. [Notes on the Testing Procedures](#notes-on-the-testing-procedures)

## General Start-up Instructions

All of the following is to be done using the command line:

After running `git pull https://github.com/NathanTrowers/ComicComet`, the database needs to be configured.

### Database Configuration

Create an empty directory in the root of the project called ***mysql***.
Run `docker compose up mysql` to start the database container. Once started, in another command-line window, run `docker exec -it mysql bash` to enter the container.  Afterwards, enter the following respective commands:

``` shell
bash-4.4$ mysql 
Enter password: AdM1n
...
mysql> CREATE DATABASE comic_comet_warehouse;
mysql> CREATE USER 'springuser'@'%' IDENTIFIED BY 'AdM1n';
mysql> GRANT ALL ON comic_comet_warehouse.* TO 'springuser'@'%'; # grant these privileges only for the user on your local machine
mysql> exit
bash-4.4$ exit
```

### Database Migration

After exiting the container, stop the mysql instance running in the other window, then run `docker compose up`  This will start-up the entire application.  Once started, in another window, run the following commands:

``` shell
$# docker exec -it fourth-wall bash
root@2345719d0f29:/app$ cd scr/migrations
root@2345719d0f29:/app/src/migrations$ app/liquibase_libs liquibase update --changelog-file=root-changelog.yaml -u springuser -p AdM1n
root@2345719d0f29:/app/src/migrations$ exit
```

The above commands will have you enter teh ***fourth-wall*** container, change the directory to the folder container the database migrations, running those migrations, then finally exiting the container.

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
root@2345719d0f29:/app$ ./mvnw -Dtest="ClassName" # run a single test class
root@2345719d0f29:/app$ ./mvnw -Dtest="ClassName#testName" # run a single test
```
