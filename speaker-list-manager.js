var speaker_list = [];

/**
 * Implements an array remove method based on array.splice()
 * Array Remove - By John Resig (MIT Licensed)
 * see http://ejohn.org/blog/javascript-array-remove/
 * @param {number} from the index of the start of the range to remove
 * @param {number} to the index of the end of the range to remove
 * @returns {number} the new array length
 */
Array.prototype.remove = function(from, to) {
  var rest = this.slice((to || from) + 1 || this.length);
  this.length = from < 0 ? this.length + from : from;
  return this.push.apply(this, rest);
};

/**
 * Parses user input according to the docs.md file.
 * @param {string} user_input storing characters input by the user
 * @param {array} arr speakers_list array to modify in response to user_input
 */
function parse(user_input, arr) {
  del_name_regex = new RegExp(/del .*/i);
  add_name_regex = new RegExp(/add .*/i);
  if (user_input == 'del') {
    del(arr);
  }
  else if (user_input=='clear') {
    del_all(arr);
  }
  else if (del_name_regex.exec(user_input) !== null) {
    var person = user_input.substring(4);
    del_person(person,arr);
    //console.log(person + '\n');
  }
  else if (add_name_regex.exec(user_input) !== null) {
    var person = user_input.substring(4);
    //check if person is in list
    if (!in_arr(person,arr)) {
      add_to_list(person,arr);
      //console.log(person + '\n');
    }
    else {
      output_to_user('That person is already on the list!');
    }
  }
  else {
    output_to_user("Invalid command");
  }
}

/*checks for the presence of string s in array arr (case insensitive)*/
function in_arr(s,arr) {
  for(var i=0; i<arr.length; i+=1) {
    if (arr[i].toLowerCase() === s.toLowerCase()) {
      return true;
    }
  }
  return false;
}

function output_to_user(str) {
  alert(str);
}

function add_to_list(name,arr) {
  arr.push(name);
}

function del(arr) {
  arr.shift();
}

function del_all(arr) {
  arr.splice(0,arr.length);
}

function del_person(person,arr) {
  person_index = arr.indexOf(person);
  arr.remove(person_index);//.splice(person_index,1);
}

function on_release_enter(event) {
  var char = event.which || event.keyCode;
  var list = document.getElementById("list");
  var input = document.getElementById("input");
  if (char == 13) { //<-- enter key
    var command = input.value;
    console.log('Command Entered:',command + '\n');
    parse(command,speaker_list);
    console.log('Current List:',speaker_list + '\n'+'\n');
    //list.innerHTML = command;
    input.value = '';
    draw_list(speaker_list);
  }
}

/**
 * Finds the longest element in a javascript array
 * @param {array} arr array to be analyzed
 * @returns {number} the length of the longest element in the array
 */
function longest(arr) {
  var longest = -1; //Number.NEGATIVE_INFINITY;
  //if (arr.length == 0) {return longest;}
  for(var i=0; i<arr.length; i+=1) {
    if(arr[i].length > longest) {
      longest = arr[i].length;
    }
  }
  return longest;
}

/**
 * Creates string composed of n ajacent space characters
 * @param {number} n integer number of spaces
 * @returns {string} n concatenated space strings
 */
function n_spaces(n) {
  str = '';
  for (i=0; i<n; i++) {
    str += ' ';
  }
  return str;
}

/**
 * Calculates the number of digits of a positive integer.
 * @param {number} n number whose digits are counted
 * @returns {number} the number of digits n has
 */
function num_digits(n) {
  if (n<1 && n>-1) {return 1;}
  var its = 0;
  while (n>=1) {
    n/=10;
    its += 1;
  }
  return its;
}

/**
 * Draws a list of people (the speaker list) in the html element with ID "list"
 * @param {array} arr array of speakers in order from frist to last
 */
function draw_list(arr) {
  var list = document.getElementById("list");

  var longestName = longest(arr);
  var str = '';
  var lineLength = num_digits(arr.length) + 2 + longestName;
  for (var i=0; i<arr.length; i+=1) {
    str += (i+1).toString();
    str += '. ';
    //console.log(lineLength-(arr[i].length+num_digits(i+1)+2));
    str += arr[i];
    str += n_spaces(lineLength-(arr[i].length+num_digits(i+1)+2));
    str += '<br>';
    console.log(str);
  }
  list.innerHTML = '';
  list.innerHTML = str;
}
