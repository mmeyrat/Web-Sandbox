# Web Sandbox

Web sandbox is a React application I've set up to develop and showcase mini-projects related to web technologies. The aim is to be able to visualize and navigate easily between each mini-project. 

[Discover the application](https://maximemeyrat.fr/sandbox)

## Earth 3D

The idea of this mini-project was to set up a scene and include a mesh and its materials. To do this, I chose the planet Earth for its simple shape. I added clouds and a skybox using additional geometries.

The planet automatically rotates slowly. However, it can be rotated by right-clicking and moving the mouse. You can also zoom in using the scroll wheel. Thus, I implemented an adaptive zoom based on the distance between the earth and the camera, for a smooth experience.

The textures used come from [this website](https://www.solarsystemscope.com/textures/).

## Konami Code

This mini-project uses the Web Speech API to detect the Konami Code by voice. The aim was to use a voice detection tool and implement a Konami Code in an original way in a web application. 

First, activate voice detection from the icon, then speak into the microphone. French and English are supported, and can be changed with the dedicated icon. It's also possible to delete just the last word, or the whole text.

The page background is made up of covers based on titles from Konami's history. 8 random covers are displayed simultaneously among 24 different ones.

Although not recommended, the keyboard can be used to facilitate the writing of certain words. 

## Installation guide

This application is currently online, but you can install it locally using the following guide.  

For this project to work properly, you must already have Node.js v18 or higher installed. Then you need to perform each of the following steps:

1. Clone the project,  
```git clone https://github.com/mmeyrat/Web-Sandbox.git```
2. Install dependencies,  
```npm install```
3. Run the project,  
```npm run start```

----

Meyrat Maxime