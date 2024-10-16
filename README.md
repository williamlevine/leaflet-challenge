# Leaflet Challenge - Module 15

![1-Logo](https://github.com/user-attachments/assets/58ba4872-978c-40aa-8dc2-2f927862f9f4)

[Click here to view this site on GitHub Pages](https://williamlevine.github.io/leaflet-challenge/)

This repository contains my code for the Leaflet Challenge assignment for Module 15. The code uses HTML and JavaScript to build an interactive map of earthquakes from the past seven days. The data comes from the United States Geological Survey website, which provides the data in GeoJSON format. The link to their website can be found [here,](https://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php) along with other data feeds for other earthquake categories and levels of significance. Any of these data feeds could be used in place of that which is active by default by replacing the link in the `d3.json` command in `logic.js` with the link to whichever data feed is desired.

The main HTML file used to run this site is in the main repository folder and is called `index.html`. In the folder titled `Leaflet-Part-1`, there are two folders: `Images` and `static`. The former contains the logo image used above. The latter contains two more folders: `css` and `js`, which contain `style.css` and `logic.js`, respectively. The CSS file is used to hold style info, mainly for the popups and the legend; the JavaScript file calls the data and visualizes it.

The starter code for this challenge can all be found in the folder titled `Starter_Code`, and the corresponding starter files are all suffixed with `_starter` (e.g. `index_starter.html`, `style_starter.css`, etc). This starter code was used to begin this challenge. Other methods used to build the map came from the in-class activities from Module 15, such as activity 10 from day 1 and activity 2 from day 3. I had some help from ChatGPT with building the legend part of the code, which suggested an efficient `for` loop method to build the legend and attach the corresponding depth values.
