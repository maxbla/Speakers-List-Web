# Speakers List Manager
An HTML, CSS and JavaScript based web application for managing a speakers list, for example with [Robert's Rules](http://www.rulesonline.com/).

Keeps a list of who is still to speak, allowing you to quickly add or delete people without using the mouse.

### Possible Commands
|Command        |Description
|---------------|------------
|`add [speaker]`| add person with name "speaker" to end of list
|`del`          | delete the top person on the list
|`del [speaker]`| delete person with name "speaker" from list
|`clear`        | delete the whole list

### Building Documentation
The javascript portion of this application uses [documentation](https://github.com/documentationjs/documentation). The build command I use is `documentation build speaker-list-manager.js -f html -o docs`.

### To Do
* Keep track of how many times each person has spoken
