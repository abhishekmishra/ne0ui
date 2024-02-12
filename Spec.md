<p align="center" style="margin:auto">
	<h1>NE0UI: Specifications</h1>
	<b>by Abhishek Mishra</b>
</p>

<u>History</u>
<table border>
<thead>
	<tr><th>Date</th><th>Version</th><th>Comments</th></tr>
</thead>
<tbody>
	<tr><td>12/2/24</td><td>0.1 draft</td><td>Initial version.</td></tr>
</tbody>
</table>

--------------------------------------------------------------------------------

**Table of Contents**
- [1. Introduction](#1-introduction)
- [2. Requirements](#2-requirements)
	- [2.1. Cross-Platform Desktop GUI](#21-cross-platform-desktop-gui)
	- [2.2. Simplicity and Rapid Application Development](#22-simplicity-and-rapid-application-development)
	- [2.3. Extensible](#23-extensible)
	- [2.4. Containers and Layouts](#24-containers-and-layouts)
	- [2.5. Widget Types](#25-widget-types)
	- [2.6. Events and Event Handlers](#26-events-and-event-handlers)
- [3. High-Level Design](#3-high-level-design)
- [4. Limitations](#4-limitations)


# 1. Introduction

This document describes a design for a simple Javascript based UI library for 
web pages. The UI libary presents an API similar to desktop GUI libraries. It 
has the following high-level goals:

- **Only Javascript:** API is in the Javascript language, no (or minimum) 
  fiddling with HTML/CSS.
- **Complete:** Most components available in a GUI library are available.
- **Comprehensive:** API allows control over all possibilities of layout, 
  component customization, and presentation.
- **Documentation:** Extensive developer documentation.

# 2. Requirements

## 2.1. Cross-Platform Desktop GUI

The requirements of the API arise from the need to create cross-platform
applications that can run on the browser and therefore also on Electron (or
similar platforms). However most of the web-based GUI libraries are focused
towards websites and SPAs. The APIs are quite different from desktop GUI API
frameworks, thus changing the developer experience and also in some sense
changing the look and feel of the resulting applications.

Inverting the developer experience of web UI frameworks, we get the requirement
to *create a Javascript-based GUI framework for the browser whose API is as*
*similar in design as possible to Desktop GUI frameworks.*

## 2.2. Simplicity and Rapid Application Development

The GUI framework should provide simple APIs, one right way to do most things,
should handle most of the use-cases and leave out the most complex ones in the 
interest of *simple APIs, to flatten the learning curve*. Along with
well-designed, well-named, simpler APIs there should be extensive and complete
documentation with examples for common scenarios - to enable *fast development*
*of common use-cases.*

## 2.3. Extensible

Since the API might sacrifice the complex use-cases in the interest of
simple APIs, it should be a *possible to add new components, layouts, and*
*presentation to the library via some lower-level APIs.*

## 2.4. Containers and Layouts

The possible ways of laying out components seem endless and come in a wide
variety. This can and does confuse most new developers. The API should provide
some simple layout options like *Row, Column, Grid, and Absolute layouts* that
most desktop GUI frameworks provide.

Container widgets can contain one or more child widgets, and they should be
automatically laid out according to the layout chosen for the container. The
layouts should adjust to various changes such as resize of the window or of the
parent container. The sizes of the child widgets should be controlled by size
hints such that don't go beyond a maximum or a minimum.

## 2.5. Widget Types

The following list is a list of components that are available in most GUI
frameworks and are good enough for many desktop applications:

1. **Containers:** A special class of widgets which contain other child widgets
   and provide very little functionality on their own except decorative elements
   such as borders, frames, different layouts, consistent style. These
   containers can be *windows, dialogs, panels, frames, split-panes etc.*
2. **Form/Input Widgets:** These are the simplest widget types one can see in
   any form to take inputs such as single/multi-line text, radio boxes, 
   checkboxes, drop-downs, buttons, colour pickers etc.
3. **Table Widget:** Many multi-dimensional data are displayed as one form of
   table or other. And the API needs a versatile table widget which can contain
   other simpler widgets in each cell of the table. The simplest form of the API
   available should just accept a 2D-array of values which can be displayed in
   the table. However the table should also provide - sorting, filtering,
   editing, cell/row/column actions.
4. **Tree Widget:** This is also one of the common widgets in any GUI, and again
   similar to the Table Widget should accept data in a simple form of a nested
   array and be able to display in a tree. The API should also provide - adding,
   deleting of nodes, and node actions like selection/deselection, expansion
   of nodes etc.
5. **Toolbar:** A toolbar is a special widget which contains just buttons, or
   some special input types and is found on the corners of an application
   window.
6. **Statusbar:** A special container widget which is found at the bottom of
   most GUI applications to show various status items or events to the user.
7. **Menus:** There are drop-down menus and context-menus available in most
   GUIs which are standard ways to select various actions/options. In the case
   of the application menu they affect the application, in case of the context
   menu they apply to the specific widget where the menu is shown.

## 2.6. Events and Event Handlers

* Similar to other GUI libraries, this API should also provide a simple mechanism
to subscribe to events originating from a widget. These could be triggered by
by user interaction, data changes or the application window. 

* There should be a mechanism to attach new kinds of user-defined events to
components which can be triggered for a particular kind of component. This can
allow other parts of the application to act on the event via an event handler.

# 3. High-Level Design

# 4. Limitations
