# HackDartmouth 2021: Raise the Bar

Hello! Our submission for HackDartmouth 2021 is Raise the Bar, a website to measure your proficienty at rapping!

## Description

Raise the Bar is a React/Express app implementing Google's Speech-To-Text API to record the user's vocals and serve as a standard for recognizable speech. We provide the user with a sample audio track and lyrics. It is the user's goal to speak quickly and clearly. The website then compares Google's transcript to the lyrics and calculates a score based on accuracy. There is a running leaderboard stored in Firebase to view who has performed the best!

### Setup

Speech-To-Text requires SoX (Sound Exchange) to function. For mac users run `brew install sox`. For Windows, download the binaries here: http://sourceforge.net/projects/sox/files/latest/download and make sure SoX is available in your $PATH. 

To make sure you have all the necessary packages, run both `npm install` and `yarn install` in the root directory, then `cd` into `/api` and run `npm install` there as well. To launch the website, run `yarn start` from the root directory. Then, open another terminal and `cd` into `/api` and run `npm start` in order to initialize the api. 

NOTE: Both the Speech-To-Text API and Firebase require secret authentication files to funcion. Because this repo is private and we trust you, we have provided these files for you. 

### Usage: 

Once the website is up, navigate to the "Rap" page either by clicking "Try it Out" or using the navigation panel on the top right. Enter your name in the input field and click to start. You will have 3 seconds to get accustomed to the beat and preview the lyrics. Once the countdown is over, start rapping! Make sure to speak fast enough before the progress bar fills!

### Thanks!

Adrienne Ko '23
Andy Kotz '24
Benedict Tedjokusumo '23
Camden Hao '23

