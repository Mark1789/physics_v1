//let coords = blk.getBoundingClientRect();
// elements
let area = document.querySelector(".area");
let hero = document.querySelector(".hero");
let panes = document.querySelectorAll(".pane");
let left = document.querySelector(".left");
let right = document.querySelector(".right");
let jump = document.querySelector(".jump");


// переменная для setInterval control
let move_left; 
// начальная точка отсчета для control
let hero_style_left = 0;
// это top, падение
let hero_tumble = 0;
// пока true hero падает
let hero_tumble_check = true;
// высоты прыжка
let hero_jump_max = 90;
// step
let step = 1;
// speed process
let speed = 0;
// высота поыжка
let jump_height = 0;
// активатор control
let hero_left = false;
let hero_right = false;
let hero_jump = false;


// objects of coords panes, getBounding...
let coords_panes = [];
// для проверки столкновения с платформой 
let pane_check = 0;


for (let el of panes) {
  let pane = el.getBoundingClientRect();
  coords_panes.push(pane);
}


let hero_obj = {
  left: function () {
    hero.style.left = hero_style_left + 'px';
    hero_style_left -= step;
  },
  right: function () {
    hero.style.left = hero_style_left + 'px';
    hero_style_left += step;
  },
  tumble: function () {
    hero.style.top = hero_tumble + 'px';
    hero_tumble += step;
  },
  jump: function () {
    hero.style.top = hero_tumble + 'px';
    hero_tumble -= step;
  }
}

let process = setInterval(() => {
  
  let hero_coords = hero.getBoundingClientRect();
  
  // проверка на падение
  if (hero_tumble_check) {
    hero_obj.tumble()
  }
  
  if (hero_left) {
    hero_obj.left()
  }
  if (hero_right) {
    hero_obj.right()
  }
  
  // проверка на столкновение с платформой
  for (let i = 0; i < panes.length; i += 1) {
    if ((hero_coords.left < coords_panes[i].right && hero_coords.right > coords_panes[i].left) && hero_coords.bottom === coords_panes[i].top) {
      hero.style.top = coords_panes[i].top - 29 + 'px';
      hero_tumble_check = false;
      pane_check += 1;
    } else if (pane_check === 0) {
      hero_tumble_check = true;
    }
  }
  pane_check = 0;
  
  // при прыжке
  if (hero_jump) {
    hero_obj.jump();
    jump_height += 1;
   hero_tumble_check = false;
    // высота прыжка
    if (jump_height === hero_jump_max) {
    hero_jump = false; 
    jump_height = 0;
    }
  }
}, speed)


left.addEventListener('touchstart', (event) =>  {
  hero_left = true;
  event.preventDefault();
})
left.addEventListener('touchend', () => {
  hero_left = false;
})

right.addEventListener('touchstart', (event) =>  {
  hero_right = true;
   event.preventDefault();
})
right.addEventListener('touchend', () => {
  hero_right = false;
})

jump.addEventListener('touchstart', (event) =>  {
  if (!hero_jump && !hero_tumble_check) {
   hero_jump = true; 
  }
   event.preventDefault();
})
