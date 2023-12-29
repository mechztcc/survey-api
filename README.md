# SURVEY API

This API was developed with the purpose of demonstrating backend knowledge using Nest Js.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [How to Use](#how-to-use)

## About

This project allows the user to register, vote, and collect poll results. Only registered users can vote.

## Features

- CREATE ACCESS
- LOG INTO THE SYSTEM
- CREATE POLL
- VOTE POLL
- CHECK POLL RESULTS
- CLOSE SURVEYS AUTOMATICALLY

## Technologies Used

- NESTJS POSTGRES TYPEORM  

## Installation

[LOCAL] To run the project, you will need to install
``npm install -g @nestjs/cli@10.0.0`` 
, fill in the .env file. I have provided an example file in the root of the project.

[DOCKER-COMPOSE RECOMMENDED] To run the project, you will need to have docker and docker-compose installed on your machine. After this, fill in the .env file. I have provided an example file in the root of the project. Then just run
``docker-compose up``

## How to Use

Once the project is running, you can check the documentation at the endpoint /api.
