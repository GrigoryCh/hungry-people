
"use strict";
function setScrollBy() {
	/*Прокрутить на высоту экрана минус количество прокрученных пикселей если есть*/
	//window.scrollBy (0, window.innerHeight - pageYOffset); 
	/*Прокрутить плавно на высоту экрана минус количество прокрученных пикселей если есть*/
	window.scrollBy({ /*Прокрутить к верху блока, указанного в data-goto в html плавно*/
				top: window.innerHeight - scrollY,
				behavior: "smooth"
			});
}

function setScrollTo() {
	window.scrollTo({ 
            top: document.querySelector('.book').getBoundingClientRect().top + scrollY,
				behavior: "smooth"
			});
         e.preventDefault();
}
// Меню Бургер
const iconMenu = document.querySelector('.icon-menu');
const bodyMenu = document.querySelector('.menu__body');
if (iconMenu) {
	iconMenu.addEventListener (
		"click", function (e) {
	document.body.classList.toggle('_lock');
	iconMenu.classList.toggle('_active');
	bodyMenu.classList.toggle('_active');
});
}
// Плавная прокрутка
const menuLinks = document.querySelectorAll('.menu__link[data-goto]'); /* Ищем menu__item где есть data-goto*/
if (menuLinks.length > 0){/*Если есть проходим по их списку и по клику вызываем функцию onMenuLinkClick */
	menuLinks.forEach(menuLink => {
		menuLink.addEventListener('click', onMenuLinkClick);
	});
	
	function onMenuLinkClick (e) {
		const menuLink = e.target; /* Выбираем целевой объект на который мы кликнули то есть наш пункт меню (ссылка)*/
		/*Проверить заполнен ли data-goto атрибут и существует ли объект, на который он ссылается */
		if (menuLink.dataset.goto && document.querySelector(menuLink.dataset.goto)){
			const gotoBlock = document.querySelector(menuLink.dataset.goto);
			const gotoBlockValue = gotoBlock.getBoundingClientRect().top + scrollY;
			//- document.querySelector('header').offsetHeight; должна быть высота шапки, но ее здесь нет
			// так как main-block фулл скриновый				
			//gotoBlock.getBoundingClientRect().top это Y-координата блока относительно окна браузера
			//pageYOffset это количество прокрученных пикселей

			// Закрывать меню Бургер при клике
			// Если меню Бургер активно
			if(iconMenu.classList.contains('_active')) {
			// Удалить все добавленные ранее классы
				document.body.classList.remove('_lock');
				iconMenu.classList.remove('_active');
				bodyMenu.classList.remove('_active');
			}

						
			window.scrollTo({ /*Прокрутить к верху блока, указанного в data-goto в html плавно*/
				top: gotoBlockValue,
				behavior: "smooth"
			});
			e.preventDefault(); /*Чтобы отключить href для ссылки*/
		}
	}
}
//===Параллакс====================================================================================================

var scrollPosition = 0;
document.addEventListener('scroll', function(){
var scrollPosition = 0 - scrollY/8.5;
  console.log(scrollPosition);
  document.querySelector('.main-block__image').style.transform = 'translateY('+scrollPosition+'px)';
});

//===Работа с изображениями=======================================================================================

function testWebP(callback) {
var webP = new Image(); webP.onload = webP.onerror = function () { callback(webP.height == 2); }; webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";

}

testWebP(function (support) {
if (support == true) { document.querySelector('body').classList.add('webp'); }else{ document.querySelector('body').classList.add('no-webp'); }

});

function _ibg(){
let _ibg=document.querySelectorAll("._ibg"); for (var i = 0; i < _ibg.length; i++) { if(_ibg[i].querySelector('img')){ _ibg[i].style.backgroundImage = 'url('+_ibg[i].querySelector('img').getAttribute('src')+')'; } }

}

_ibg();



//====================================================================================================================
// Динамический адаптив c Github
// Dynamic Adapt v.1
// HTML data-da="where(uniq class name),when(breakpoint),position(digi)"
// e.x. data-da=".item,992,2"
// Andrikanych Yevhen 2020
// https://www.youtube.com/c/freelancerlifestyle

"use strict";

function DynamicAdapt(type) {
   this.type = type;
}

DynamicAdapt.prototype.init = function () {
   const _this = this;
   // массив объектов
   this.оbjects = [];
   this.daClassname = "_dynamic_adapt_";
   // массив DOM-элементов
   this.nodes = document.querySelectorAll("[data-da]");

   // наполнение оbjects объктами
   for (let i = 0; i < this.nodes.length; i++) {
      const node = this.nodes[i];
      const data = node.dataset.da.trim();
      const dataArray = data.split(",");
      const оbject = {};
      оbject.element = node;
      оbject.parent = node.parentNode;
      оbject.destination = document.querySelector(dataArray[0].trim());
      оbject.breakpoint = dataArray[1] ? dataArray[1].trim() : "767";
      оbject.place = dataArray[2] ? dataArray[2].trim() : "last";
      оbject.index = this.indexInParent(оbject.parent, оbject.element);
      this.оbjects.push(оbject);
   }

   this.arraySort(this.оbjects);

   // массив уникальных медиа-запросов
   this.mediaQueries = Array.prototype.map.call(this.оbjects, function (item) {
      return '(' + this.type + "-width: " + item.breakpoint + "px)," + item.breakpoint;
   }, this);
   this.mediaQueries = Array.prototype.filter.call(this.mediaQueries, function (item, index, self) {
      return Array.prototype.indexOf.call(self, item) === index;
   });

   // навешивание слушателя на медиа-запрос
   // и вызов обработчика при первом запуске
   for (let i = 0; i < this.mediaQueries.length; i++) {
      const media = this.mediaQueries[i];
      const mediaSplit = String.prototype.split.call(media, ',');
      const matchMedia = window.matchMedia(mediaSplit[0]);
      const mediaBreakpoint = mediaSplit[1];

      // массив объектов с подходящим брейкпоинтом
      const оbjectsFilter = Array.prototype.filter.call(this.оbjects, function (item) {
         return item.breakpoint === mediaBreakpoint;
      });
      matchMedia.addListener(function () {
         _this.mediaHandler(matchMedia, оbjectsFilter);
      });
      this.mediaHandler(matchMedia, оbjectsFilter);
   }
};

DynamicAdapt.prototype.mediaHandler = function (matchMedia, оbjects) {
   if (matchMedia.matches) {
      for (let i = 0; i < оbjects.length; i++) {
         const оbject = оbjects[i];
         оbject.index = this.indexInParent(оbject.parent, оbject.element);
         this.moveTo(оbject.place, оbject.element, оbject.destination);
      }
   } else {
      for (let i = 0; i < оbjects.length; i++) {
         const оbject = оbjects[i];
         if (оbject.element.classList.contains(this.daClassname)) {
            this.moveBack(оbject.parent, оbject.element, оbject.index);
         }
      }
   }
};

// Функция перемещения
DynamicAdapt.prototype.moveTo = function (place, element, destination) {
   element.classList.add(this.daClassname);
   if (place === 'last' || place >= destination.children.length) {
      destination.insertAdjacentElement('beforeend', element);
      return;
   }
   if (place === 'first') {
      destination.insertAdjacentElement('afterbegin', element);
      return;
   }
   destination.children[place].insertAdjacentElement('beforebegin', element);
}

// Функция возврата
DynamicAdapt.prototype.moveBack = function (parent, element, index) {
   element.classList.remove(this.daClassname);
   if (parent.children[index] !== undefined) {
      parent.children[index].insertAdjacentElement('beforebegin', element);
   } else {
      parent.insertAdjacentElement('beforeend', element);
   }
}

// Функция получения индекса внутри родителя
DynamicAdapt.prototype.indexInParent = function (parent, element) {
   const array = Array.prototype.slice.call(parent.children);
   return Array.prototype.indexOf.call(array, element);
};

// Функция сортировки массива по breakpoint и place 
// по возрастанию для this.type = min
// по убыванию для this.type = max
DynamicAdapt.prototype.arraySort = function (arr) {
   if (this.type === "min") {
      Array.prototype.sort.call(arr, function (a, b) {
         if (a.breakpoint === b.breakpoint) {
            if (a.place === b.place) {
               return 0;
            }

            if (a.place === "first" || b.place === "last") {
               return -1;
            }

            if (a.place === "last" || b.place === "first") {
               return 1;
            }

            return a.place - b.place;
         }

         return a.breakpoint - b.breakpoint;
      });
   } else {
      Array.prototype.sort.call(arr, function (a, b) {
         if (a.breakpoint === b.breakpoint) {
            if (a.place === b.place) {
               return 0;
            }

            if (a.place === "first" || b.place === "last") {
               return 1;
            }

            if (a.place === "last" || b.place === "first") {
               return -1;
            }

            return b.place - a.place;
         }

         return b.breakpoint - a.breakpoint;
      });
      return;
   }
};

const da = new DynamicAdapt("max");
da.init();

//-Custom-select-list-------------------------------------------------------

const CLASS_NAME_SELECT = 'select';
const CLASS_NAME_ACTIVE = 'select_show';
const CLASS_NAME_SELECTED = 'select__option_selected';
const SELECTOR_ACTIVE = '.select_show';
const SELECTOR_DATA = '[data-select]';
const SELECTOR_DATA_TOGGLE = '[data-select="toggle"]';
const SELECTOR_OPTION_SELECTED = '.select__option_selected';

class CustomSelect {
  constructor(target, params) {
    this._elRoot = typeof target === 'string' ? document.querySelector(target) : target;
    this._params = params || {};
    if (this._params['options']) {
      this._elRoot.classList.add(CLASS_NAME_SELECT);
      this._elRoot.innerHTML = CustomSelect.template(this._params);
    }
    this._elToggle = this._elRoot.querySelector(SELECTOR_DATA_TOGGLE);
    this._elRoot.addEventListener('click', this._onClick.bind(this));
  }
  _onClick(e) {
    const target = e.target;
    const type = target.closest(SELECTOR_DATA).dataset.select;
    switch (type) {
      case 'toggle':
        this.toggle();
        break;
      case 'option':
        this._changeValue(target);
        break;
    }
  }
  _update(option) {
    const selected = this._elRoot.querySelector(SELECTOR_OPTION_SELECTED);
    if (selected) {
      selected.classList.remove(CLASS_NAME_SELECTED);
    }
    option.classList.add(CLASS_NAME_SELECTED);
    this._elToggle.textContent = option.textContent;
    this._elToggle.value = option.dataset['value'];
    this._elToggle.dataset.index = option.dataset['index'];
    this._elRoot.dispatchEvent(new CustomEvent('select.change'));
    this._params.onSelected ? this._params.onSelected(this, option) : null;
    return option.dataset['value'];
  }
  _reset() {
    const selected = this._elRoot.querySelector(SELECTOR_OPTION_SELECTED);
    if (selected) {
      selected.classList.remove(CLASS_NAME_SELECTED);
    }
    this._elToggle.textContent = 'Выберите из списка';
    this._elToggle.value = '';
    this._elToggle.dataset.index = -1;
    this._elRoot.dispatchEvent(new CustomEvent('select.change'));
    this._params.onSelected ? this._params.onSelected(this, null) : null;
    return '';
  }
  _changeValue(option) {
    if (option.classList.contains(CLASS_NAME_SELECTED)) {
      return;
    }
    this._update(option);
    this.hide();
  }
  show() {
    document.querySelectorAll(SELECTOR_ACTIVE).forEach(select => {
      select.classList.remove(CLASS_NAME_ACTIVE);
    });
    this._elRoot.classList.add(CLASS_NAME_ACTIVE);
  }
  hide() {
    this._elRoot.classList.remove(CLASS_NAME_ACTIVE);
  }
  toggle() {
    if (this._elRoot.classList.contains(CLASS_NAME_ACTIVE)) {
      this.hide();
    } else {
      this.show();
    }
  }
  dispose() {
    this._elRoot.removeEventListener('click', this._onClick);
  }
  get value() {
    return this._elToggle.value;
  }
  set value(value) {
    let isExists = false;
    this._elRoot.querySelectorAll('.select__option').forEach((option) => {
      if (option.dataset['value'] === value) {
        isExists = true;
        return this._update(option);
      }
    });
    if (!isExists) {
      return this._reset();
    }
  }
  get selectedIndex() {
    return this._elToggle.dataset['index'];
  }
  set selectedIndex(index) {
    const option = this._elRoot.querySelector(`.select__option[data-index="${index}"]`);
    if (option) {
      return this._update(option);
    }
    return this._reset();
  }
}

CustomSelect.template = params => {
  const name = params['name'];
  const options = params['options'];
  const targetValue = params['targetValue'];
  let items = [];
  let selectedIndex = -1;
  let selectedValue = '';
  let selectedContent = 'Выберите из списка';
  options.forEach((option, index) => {
    let selectedClass = '';
    if (option[0] === targetValue) {
      selectedClass = ' select__option_selected';
      selectedIndex = index;
      selectedValue = option[0];
      selectedContent = option[1];
    }
    items.push(`<li class="select__option${selectedClass}" data-select="option" data-value="${option[0]}" data-index="${index}">${option[1]}</li>`);
  });
  return `<button type="button" class="select__toggle" name="${name}" value="${selectedValue}" data-select="toggle" data-index="${selectedIndex}">${selectedContent}</button>
  <div class="select__dropdown">
    <ul class="select__options">${items.join('')}</ul>
  </div>`;
};


document.addEventListener('click', (e) => {
  if (!e.target.closest('.select')) {
    document.querySelectorAll(SELECTOR_ACTIVE).forEach(select => {
      select.classList.remove(CLASS_NAME_ACTIVE);
    });
  }
});

//----
// #select-1 - селектор для выбора элемента, который необходимо инициализировать как CustomSelect
const select1 = new CustomSelect('.form-book__select');
const select2 = new CustomSelect('.form-book__select2');

//========LightGallery================================================================================================
lightGallery(document.querySelector('.gallery__body'));

//===Работа с формами=======================================================================

// Cобытия focus и blur

// Форма book

const bookForm = document.forms.book;
const bookFormInput = bookForm.Name;

const bookFormInputPlaceholder = bookFormInput.placeholder;

bookFormInput.addEventListener("focus", function (e) {
	bookFormInput.placeholder = "";
});
bookFormInput.addEventListener("blur", function (e) {
	bookFormInput.placeholder = bookFormInputPlaceholder;
});

const bookFormEmail = bookForm.Email;
const bookFormEmailPlaceholder = bookFormEmail.placeholder;

bookFormEmail.addEventListener("focus", function (e) {
	bookFormEmail.placeholder = "";
});
bookFormEmail.addEventListener("blur", function (e) {
	bookFormEmail.placeholder = bookFormEmailPlaceholder;
});

const bookFormPhone = bookForm.Phone;
const bookFormPhonePlaceholder = bookFormPhone.placeholder;

bookFormPhone.addEventListener("focus", function (e) {
	bookFormPhone.placeholder = "";
});
bookFormPhone.addEventListener("blur", function (e) {
	bookFormPhone.placeholder = bookFormPhonePlaceholder;
});

const bookFormDate = bookForm.Date;
const bookFormDatePlaceholder = bookFormDate.placeholder;

bookFormDate.addEventListener("focus", function (e) {
	bookFormDate.placeholder = "";
});
bookFormDate.addEventListener("blur", function (e) {
	bookFormDate.placeholder = bookFormDatePlaceholder;
});

// Форма main
const mainForm = document.forms.main;
const mainFormInput = mainForm.Name;

const mainFormInputPlaceholder = mainFormInput.placeholder;

mainFormInput.addEventListener("focus", function (e) {
	mainFormInput.placeholder = "";
});
mainFormInput.addEventListener("blur", function (e) {
	mainFormInput.placeholder = mainFormInputPlaceholder;
});

const mainFormEmail = mainForm.Email;
const mainFormEmailPlaceholder = mainFormEmail.placeholder;

mainFormEmail.addEventListener("focus", function (e) {
	mainFormEmail.placeholder = "";
});
mainFormEmail.addEventListener("blur", function (e) {
	mainFormEmail.placeholder = mainFormEmailPlaceholder;
});

const mainFormPhone = mainForm.Phone;
const mainFormPhonePlaceholder = mainFormPhone.placeholder;

mainFormPhone.addEventListener("focus", function (e) {
	mainFormPhone.placeholder = "";
});
mainFormPhone.addEventListener("blur", function (e) {
	mainFormPhone.placeholder = mainFormPhonePlaceholder;
});

const mainFormMessage = mainForm.Message;
const mainFormMessagePlaceholder = mainFormMessage.placeholder;

mainFormMessage.addEventListener("focus", function (e) {
	mainFormMessage.placeholder = "";
});
mainFormMessage.addEventListener("blur", function (e) {
	mainFormMessage.placeholder = mainFormMessagePlaceholder;
});


// Проверка наличия слайдера на странице============================================
if(document.querySelector('.slider-specs__body')) {
	// Инициализация слайдера Swiper
   var opinionsSlider = new Swiper('.slider-specs__body', {
	observer: true,
	observeParents: true,
	slidesPerView: 1,
   initialSlide: 1, // Первый активный слайд будет второй, счет с нуля
	spaceBetween: 0, // отступ между слайдами в пикселях по макету
	watchOverflow: true,
	speed: 800,
	loop: true,
	loopAdditionalSlides: 5,
	preloadImages: false,
	parallax: false,
	// Dotts
   pagination: {
      el: '.slider-specs__dotts',
      clickable: true,
    },
	});
}