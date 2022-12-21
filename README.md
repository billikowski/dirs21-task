# dirs21-task

## Tasks & Time spent

Summary of the tasks and the rough amount of time I spent on them

* Getting the provided project ready to work: 1h
    * Unzip the folders
	* Install the modules
	* Create new repository
* Figuring out how to store data: 1h
    * Ended up using a mock database file for simplicity
* Creating routes: 2h
  * A small problem cost me some time (see below), but other than that the task was simple
* Evaluate design options: 2h
	* Vuetify was the best option as it has a wide selection of customizable components and also uses Material Design, which I endorse
	* Before deciding on Vuetify I tried native Vue + CSS accompanied by some npm package components, but with this setup the results would not be as good and would take more time 
* Create main components: 2h
  * Navigation sidebar
  * Data table
  * Texts, buttons, icons
* Customize data table: 1h
  * Adjust the output of individual columns by using dynamic slots
  * Additional column for actions
* Dialogs: 1h
  * Create/Edit
  * Delete
  * Clear
* Connect UI to API to enable requests: 1h
	* This was made pretty easy by the use of axios: create services that talk to the backend and use those functions in the Vue methods
* Styling and usability improvements: 1h
  * Choosing appropriate colors/icons
  * Tooltip, snackbar, info text 
* Cancel button in dialog: 2h
  * I first tried an approach that was not applicable, so I spent a bit too much time here, see below
* Refactoring: 1h
	* Implement coding standards by referring to the Google JavaScript Style guide
  * Ultimately, I let VS Code format my document using a formatter. Its results deviate slightly from the style guide, but provide consistent, readable code
* Testing: 1h
  * Testing in the sense that I tried all possible interactions on the application and checked the behavior

## Considerations

* The availability property can contain multiple values to cover times of day (breakfast, lunch, dinner) and times of week (weekdays, weekends).
* The status of a dish (active/inactive) can be changed by clicking the status cell in addition to the edit dialog, because changing it through the edit dialog requires more clicks. The additional effort is unnecessary for cases where only the status needs to be changed.
* The wait time slider uses steps of 5 for easier selection. For this, it was assumed that the accuracy of the waiting time is not important and the time is mainly used as a reference for the staff using the application.
* The wait time slider is capped at 60 minutes, as waiting times beyond this do not seem realistic for individual dishes (more so for courses).

## Difficulties

* In general, some difficulties came up when searching for instructions, because some that I found require the use of Vue 3 whereas this project is using Vue 2
* Routing did not work initially, because the router was setup in a seperate file and imported to main.js, but still required VueRouter to be imported, which at that point I did not realize was necessary
* Because of Vue´s reactivity system, the application was easy to build, up until the point where I wanted to implement cancellation of the new/edit dialog. Changes to existing values inside the form were applied immediately, so to revert this I would need backup data to replace the modified entry. I could not figure out how to backup entries, because the backup object was always overwritten by the modifications. I circumvented this problem by using the Object.assign() method to copy values from an item to the edited object without linking them.

## Possible enhancements

Here I list features that were outside the scope of this project due to time constraints or because they are not relevant to this specific problem, but I want to express that these could be considered in future development.

* Restrict certain features (e.g. clear dishes) to logged in users or authorized users (e.g. admin)
* Edit values directly in the data cells (just like the status)
* Multi-selection of entries to edit/delete several dishes at once
* Lazy loading of the dishes in case the database is expected to be large
* Validation of requests in the backend to avoid problems that are not handled (enough) by the frontend 

![](https://i.imgur.com/0OpwNPh.png)
