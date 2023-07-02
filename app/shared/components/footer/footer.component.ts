import { Component } from '@angular/core';
import { Router } from '@angular/router';
declare var $;

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent {
  constructor(private router: Router) {}

  onCLickLi() {
    window.scrollTo(0, 0);
    this.setActiveTab();
  }

  onClick(event) {
    console.log(event);
    this.router.navigate(['/services']).then(() => {
      window.scrollTo(0, 0);
      const element = document.getElementById(
        (event.target.id as String).split('Modal')[0]
      );
      element.click();
      this.setActiveTab();
    });
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
