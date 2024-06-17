# Discalaimer

Updated for personal use (with React 18) this package it is an update (or refactoring) of the [`salgum1114/react-design-editor`](https://github.com/salgum1114/react-design-editor) library

# React Fabricjs Image Editor

[![](https://img.shields.io/npm/l/react-design-editor?style=flat-square)](https://en.wikipedia.org/wiki/MIT_License) [![build](https://github.com/salgum1114/react-design-editor/workflows/build/badge.svg)](https://github.com/salgum1114/react-design-editor/actions) 

React fabricjs image editor is a module for React, written in Javascript/Typescript which provides two primary features:

-   Image Editor - Create images in React, draw diagrams and arrange compositions using the image editor and save the result to one of several export formats, provides functionality similar to Powerpoint.
-   Business Process Modelling (BPM) - Design flowcharts and process workflows in React and export the model to JSON, which can be imported into the tool (load/save).

The module primarily uses the [Ant Design](https://github.com/ant-design/ant-design/), [Fabric.js](https://github.com/fabricjs/fabric.js) and [React](https://github.com/facebook/react) libraries, but a full list of required dependencies can be found below.

Try it out today - the project is being continually developed to support a variety of different functions.

[View Demo](https://salgum1114.github.io/react-design-editor/)

# Feature List

-   [x] Add, remove, resize, reorder, clone, copy/paste and drag/drop elements
-   [x] Drawing capability, with polygon, line, arrows and link support
-   [x] Preview mode, tooltips, group/ungroup and zoom functionality
-   [x] Upload (with drag/drop), import and export to JSON or image
-   [x] Image cropping, Image filters, alignment, alignment guides
-   [x] Snap to grid, context menu, animation and video element
-   [x] Various icons in icon picker and fonts from Google Fonts (20)
-   [x] HTML/CSS/JS Element, iFrame element
-   [x] Animation support, with Fade / Bounce / Shake / Scaling / Rotation / Flash effects
-   [x] Code Editor with HTML / CSS / JS / Preview
-   [x] Various interaction modes, including grasp, selection, ctrl + drag grab
-   [x] Multiple layouts, with fixed, responsive, fullscreen and grid modes
-   [x] SVG, Chart and GIF elements
-   [x] Undo/Redo support
-   [ ] Wireframes - in development
-   [ ] Multiple Map - in development
-   [ ] Ruler - in development

# Getting Started

1. Clone this Project with `git clone git@github.com:mduvernon/react-fabricjs-image-editor.git`
2. Install dependencies with `npm install` or `yarn`
3. Run the App with `npm start` or `yarn start`
4. Open your web browser to `http://localhost:4000`

# Screenshots

## Image Map Editor

### 1. Fixed Layout Mode

![fixed](https://user-images.githubusercontent.com/19975642/55678049-6aff6180-592e-11e9-8b29-8e1d60df178a.PNG)

### 2. Responsive Layout Mode

![responsive](https://user-images.githubusercontent.com/19975642/55678050-6cc92500-592e-11e9-8a57-c82d371e4be1.PNG)

### 3. Full Screen Layout Mode

![fullscreen](https://user-images.githubusercontent.com/19975642/55678051-6dfa5200-592e-11e9-9b9e-b8d8ee3ccb08.PNG)

### 4. Preview Mode

![preview](https://user-images.githubusercontent.com/19975642/55678052-6fc41580-592e-11e9-9958-9a9be8239bd7.PNG)

## Workflow Editor

![workflow](https://user-images.githubusercontent.com/19975642/55678053-718dd900-592e-11e9-9996-cce9b46d8433.PNG)

# Dependencies

| Dependency                                                      | License(s)                                         |
| --------------------------------------------------------------- | -------------------------------------------------- |
| [React](https://github.com/facebook/react)                      | MIT                                                |
| [Ant Design](https://github.com/ant-design/ant-design/)         | MIT                                                |
| [Fabric.js](https://github.com/fabricjs/fabric.js)              | MIT                                                |
| [MediaElement.js](https://github.com/mediaelement/mediaelement) | MIT                                                |
| [React-Ace](https://github.com/securingsincity/react-ace)       | MIT                                                |
| [interact.js](https://github.com/taye/interact.js)              | MIT                                                |
| [anime.js](https://github.com/juliangarnier/anime/)              | MIT                                                |
| [fontawesome5](https://github.com/FortAwesome/Font-Awesome)     | Icons (CC BY 4.0), Fonts (SIL OFL 1.1), Code (MIT) |