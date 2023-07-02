import {
  AfterContentChecked,
  AfterContentInit,
  AfterViewChecked,
  AfterViewInit,
  Component,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { LanguageService } from '../../services/language.service';
declare var $;

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements AfterContentChecked {
  isSmallWidth = window.innerWidth < 821;

  constructor(private languageService: LanguageService) {}

  ngAfterContentChecked(): void {
    setTimeout(this.setActiveTab, 100);
  }

  onCLick() {
    window.scrollTo(0, 0);
  }

  onToggleClick() {
    this.setActiveTab();
  }

  changeLanguage(code: string) {
    this.languageService.setLanguage(code);
  }
  get selectedLanguage() {
    return this.languageService.selectedLanguage;
  }

  setActiveTab() {
    var path = window.location.pathname.split('/').pop();
    var currentId;

    // Account for home page with empty path
    if (path == '') {
      path = 'home';
    }

    currentId = `#${path}`;
    var target = $(currentId);
    // Add active class to target link
    $('#navbarSupportedContent ul li').removeClass('active');
    target.parent().addClass('active');
    var tabsNewAnim = $('#navbarSupportedContent');
    var selectorNewAnim = $('#navbarSupportedContent').find('li').length;
    var activeItemNewAnim = tabsNewAnim.find('.active');
    var activeWidthNewAnimHeight = activeItemNewAnim.innerHeight();
    var activeWidthNewAnimWidth = activeItemNewAnim.innerWidth();
    var itemPosNewAnimTop = activeItemNewAnim.position();
    var itemPosNewAnimLeft = activeItemNewAnim.position();
    $('.hori-selector').css({
      top: itemPosNewAnimTop.top + 'px',
      left: itemPosNewAnimLeft.left + 'px',
      height: activeWidthNewAnimHeight + 'px',
      width: activeWidthNewAnimWidth + 'px',
    });
  }
}

// ---------Responsive-navbar-active-animation-----------
function test() {
  var tabsNewAnim = $('#navbarSupportedContent');
  var selectorNewAnim = $('#navbarSupportedContent').find('li').length;
  var activeItemNewAnim = tabsNewAnim.find('.active');
  var activeWidthNewAnimHeight = activeItemNewAnim.innerHeight();
  var activeWidthNewAnimWidth = activeItemNewAnim.innerWidth();
  var itemPosNewAnimTop = activeItemNewAnim.position();
  var itemPosNewAnimLeft = activeItemNewAnim.position();
  $('.hori-selector').css({
    top: itemPosNewAnimTop.top + 'px',
    left: itemPosNewAnimLeft.left + 'px',
    height: activeWidthNewAnimHeight + 'px',
    width: activeWidthNewAnimWidth + 'px',
  });
  $('#navbarSupportedContent').on('click', 'li', function (e) {
    $('#navbarSupportedContent ul li').removeClass('active');
    $(this).addClass('active');
    var activeWidthNewAnimHeight = $(this).innerHeight();
    var activeWidthNewAnimWidth = $(this).innerWidth();
    var itemPosNewAnimTop = $(this).position();
    var itemPosNewAnimLeft = $(this).position();
    $('.hori-selector').css({
      top: itemPosNewAnimTop.top + 'px',
      left: itemPosNewAnimLeft.left + 'px',
      height: activeWidthNewAnimHeight + 'px',
      width: activeWidthNewAnimWidth + 'px',
    });
  });
}
$(document).ready(function () {
  setTimeout(function () {
    test();
  });
});
$(window).on('resize', function () {
  setTimeout(function () {
    test();
  }, 500);
});
$('.navbar-toggler').click(function () {
  $('.navbar-collapse').slideToggle(300);
  setTimeout(function () {
    test();
  });
});

// --------------add active class-on another-page move----------
$(document).ready(function ($) {
  // Get current path and find target link
  var path = window.location.pathname.split('/').pop();
  var id;
  var currentId;

  // Account for home page with empty path
  if (path == '') {
    path = 'home';
  }

  currentId = `#${path}`;
  var target = $(currentId);
  // Add active class to target link
  $('#navbarSupportedContent ul li').removeClass('active');
  target.parent().addClass('active');
});
