# date-picker-practice
A self practice date-picker library.
##### Det :
* All the implementation were taken about 4 to 5 days, planning takes about 0.5 days, programming takes about 4 to 4.5 days.
* All the used libraries are React / Babel loader / CSS loaders and moment.js, and other parts were implemented by myself.
* I don't use "Create-React-App" in this practice project, all the project structure was based on the Webpack-config.json which was written by myself.
* About RWD, I set the app viewport widths to 320px, for fitting the smallest smartphone screen width.
* Due to time pressure while programming, so there are still a lot of parts that can be improved.
&nbsp;

##### NPM script :
* npm start : Would running the "web-dev-server" and seeing the local demo.
* npm run build : Would build all files with this static project.
&nbsp;

##### DEMO :
[DEMO](https://www.wesleywang.acsite.org/demo/date-picker-practice/)
&emsp;

##### file / code structure :
* Using the Hook + context API to simulate a simple version of "Redux" data flow.
* "Context" type file means the store in "Redux", also means all the variables placed here.
* "Action" type files just same with the "Action" in "Redux", also means all the filtering type enums of reducer placed here.
* "Reducer" type files just same with the "Reducer" in "Redux", also means all the logical algorithm placed here.
&nbsp;

###### Passing props of Calendar :
* toggleStatus : For toggling the calendar purpose ( true / false ).
* getSelectedDate : A call back function, the selected calendar date will pass into this call function as a parameters ( function ) .

###### Passing props of Input :
* updatedValue : For displaying the value of input.
* onClickTrigger : A call back function, this call back function would be triggered once users click on the input.
&nbsp;
