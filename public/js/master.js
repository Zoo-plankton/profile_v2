let currentTheme = 0;
let favs = [1,6,13,17]
let dice = ['fa-dice-one','fa-dice-two','fa-dice-three','fa-dice-four','fa-dice-five','fa-dice-six']
let progHeight = document.getElementById('skill-progress').clientHeight;
let progInt = 100/5;
let bar = document.querySelector('#indicator')
let barPos = 0;

var skillScrollA
var skillScrollB

var projectScrollA
var projectScrollB


document.querySelector('body').addEventListener('click', fadeInText);
document.querySelector('.left').addEventListener('click', prevTheme);
document.querySelector('.right').addEventListener('click', nextTheme);
document.querySelector('.skill-nav-up').addEventListener('click', skillPrev);
document.querySelector('.skill-nav-down').addEventListener('click', skillNext);
document.querySelector('.project-nav-up').addEventListener('click', projectPrev);
document.querySelector('.project-nav-down').addEventListener('click', projectNext);
document.querySelector('#dice-btn').addEventListener('click', randomTheme);
document.querySelector('#skills').addEventListener('click', initSkillScroll);
document.querySelector('#projects').addEventListener('click', initProjectScroll);


document.querySelectorAll('.hex').forEach(item => {
  item.addEventListener('click', event => {
    event.stopPropagation();
  });
});

document.querySelectorAll('.color').forEach(div => {
  div.addEventListener('click', function(e) {
    if (div.classList.contains('active')) {
      div.classList.remove('active');
    } else {
      document.querySelectorAll('.color').forEach(div => {
        div.classList.remove('active');
      });
      div.classList.add('active');
    }
  });
});

favoriteTheme();

function changeColor(stringA, stringB) {
  document.querySelector('html').style.setProperty(stringA, stringB);
}

function changeTheme(index) {
  let theme = themes[index];
  const hex = document.querySelectorAll('.hex');
  for (var i = 1; i < 6; i++){
    let oldBG = '--c' + i;
    let oldText = '--t' + i;
    let oldAccent = '--a' + i;
    let newBG = theme.colors[i-1];
    let newText = theme.colors[theme.text[i-1]];
    let newAccent = theme.colors[theme.accent[i-1]];
    changeColor(oldBG, newBG);
    changeColor(oldText, newText);
    changeColor(oldAccent, newAccent);
    hex[i-1].innerHTML = newBG.toLowerCase();
  };
  document.querySelector('.name').innerHTML = theme.name;
  document.querySelector('.number').innerHTML = '#' + index;
  currentTheme = index;
}

function nextTheme() {
  currentTheme += 1;
  if (currentTheme > themes.length - 1) {
    currentTheme = 0;
  }
  changeTheme(currentTheme);
}

function prevTheme() {
  currentTheme -= 1;
  if (currentTheme < 0) {
    currentTheme = themes.length - 1;
  }
  changeTheme(currentTheme);
}

function getRandom(array) {
    return Math.floor(Math.random() * array.length);
}

function randomTheme() {
  let face = getRandom(dice);
  currentTheme = getRandom(themes);
  document.querySelector('#dice-btn').className = 'fas ' + dice[face];
  changeTheme(currentTheme);
}

function favoriteTheme() {
  let index = getRandom(favs)
  currentTheme = favs[index];
  changeTheme(currentTheme);
}

function skillNext() {
  skillScrollA.next();
  skillScrollB.next();
  progressForward();
}

function skillPrev() {
  skillScrollA.prev();
  skillScrollB.prev();
  progressBack();
}

function projectNext() {
  projectScrollA.next();
  projectScrollB.next();
}

function projectPrev() {
  projectScrollA.prev();
  projectScrollB.prev();
}

function progressForward() {
  if (barPos < 100) {
    barPos = barPos + progInt;
    bar.style.top = 'calc(' + barPos + '% - 10px)';
  }
}

function progressBack() {
  if (barPos > 0) {
    barPos = barPos - progInt;
    bar.style.top = 'calc(' + barPos + '%)';
  }
}

function fadeInText() {
  document.querySelectorAll('.hex').forEach(hex => {
    hex.style.opacity = '.85';
  });
  document.querySelector('.theme-name').style.opacity = '1';
  document.querySelector('.theme-nav').style.opacity = '1';
  document.querySelector('body').removeEventListener('click', fadeInText);
}

function initSkillScroll() {
  setTimeout(function(){
    skillScrollA = new IScroll('.wrapper-a',{
      momentum: false,
      snap: 'li',
      disableMouse: true,
      disableTouch: true,
      disablePointer: true,
    });
    skillScrollB = new IScroll('.wrapper-b', {
      momentum: false,
      snap: 'li',
      invertWheelDirection: true,
      startY: -2335,
      disableMouse: true,
      disableTouch: true,
      disablePointer: true,
    });
    document.querySelector('#skills').removeEventListener('click', initSkillScroll);
    skillScrollB.refresh();
  },30);
}

function initProjectScroll() {
  setTimeout(function(){
    projectScrollA = new IScroll('.wrapper-c',{
      momentum: false,
      snap: 'li',
      disableMouse: true,
      disableTouch: true,
      disablePointer: true,
    });
    projectScrollB = new IScroll('.wrapper-d', {
      momentum: false,
      snap: 'li',
      disableMouse: true,
      disableTouch: true,
      disablePointer: true,
    });
    document.querySelector('#projects').removeEventListener('click', initProjectScroll);
    projectScrollA.refresh();
  },250)
}

function loaded() {
  setTimeout(function(){
    document.querySelector('.color-three').classList.remove('false-active');
    document.querySelector('.color-four').classList.remove('false-active');
  }, 100)
}
