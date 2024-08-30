# ComicComet Local Environment Installation Instructions

On this page:

- [ComicComet Local Environment Installation Instructions](#comiccomet-local-environment-installation-instructions)
  - [Shooting Star Configuration](#shooting-star-configuration)
  - [Service Summary](#service-summary)
  - [Notes on the Testing Procedures](#notes-on-the-testing-procedures)


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
