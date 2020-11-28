import MobileMenu from './modules/MobileMenu.js'
import RevealOnScroll from './modules/RevealOnScroll.js'
import $ from 'jquery'
import StickyHeader from './modules/StickyHeader.js'

window.onload = () => {
  new MobileMenu()
  new RevealOnScroll($('.feature-item'), '85%')
  new RevealOnScroll($('.testimonial'), '60%')
  new StickyHeader()
}
