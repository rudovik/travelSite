import $ from 'jquery'
import waypoints from '../../../../node_modules/waypoints/lib/noframework.waypoints.js'
class RevealOnScroll {
  constructor(els, offset) {
    this.itemsToReveal = els
    this.offsetWhenReveal = offset
    this.hideInitially()
    this.createWaypoints()
  }

  hideInitially() {
    this.itemsToReveal.addClass('reveal-item')
  }

  createWaypoints() {
    const that = this
    this.itemsToReveal.each(function () {
      var currentItem = this
      new Waypoint({
        element: this,
        handler: function () {
          $(currentItem).addClass('reveal-item--is-visible')
        },
        offset: that.offsetWhenReveal,
      })
    })
  }
}

export default RevealOnScroll
