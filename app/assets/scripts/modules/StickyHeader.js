import $ from 'jquery'
import waypoints from '../../../../node_modules/waypoints/lib/noframework.waypoints.js'
import smoothScroll from 'jquery-smooth-scroll'

class StickyHeader {
  constructor() {
    this.lazyImages = $('.lazyload')
    this.siteHeader = $('.site-header')
    this.headerTriggerElement = $('.large-hero__title')
    this.pageSections = $('.page-section')
    this.headerLinks = $('.primary-nav a')
    this.isCurrentlyShowing = {}
    this.createHeaderWaypoint()
    this.createPageSectionWaypoints()
    this.addSmoothScrolling()
    this.refreshWaypoints()
  }

  refreshWaypoints() {
    this.lazyImages.on('load', Waypoint.refreshAll)
  }

  addSmoothScrolling() {
    this.headerLinks.smoothScroll()
  }

  createHeaderWaypoint() {
    const that = this
    new Waypoint({
      element: this.headerTriggerElement[0],
      handler: function (direction) {
        if (direction == 'down') {
          that.siteHeader.addClass('site-header--dark')
        } else {
          that.siteHeader.removeClass('site-header--dark')
          that.headerLinks.removeClass('is-current-link')
        }
      },
    })
  }

  createPageSectionWaypoints() {
    const that = this
    this.pageSections.each(function () {
      const currentPageSection = this
      new Waypoint({
        element: currentPageSection,
        handler: function (direction) {
          let matchingHeaderLink
          if (direction === 'down') {
            matchingHeaderLink = currentPageSection.getAttribute(
              'data-matching-link'
            )
            that.headerLinks.removeClass('is-current-link')
            $(matchingHeaderLink).addClass('is-current-link')
          }
        },
        offset: '18%',
      })

      new Waypoint({
        element: currentPageSection,
        handler: function (direction) {
          let matchingHeaderLink
          if (direction === 'up') {
            matchingHeaderLink = currentPageSection.getAttribute(
              'data-matching-link'
            )
            that.headerLinks.removeClass('is-current-link')
            $(matchingHeaderLink).addClass('is-current-link')
            that.isCurrentlyShowing[matchingHeaderLink] = true
          }
        },
        offset: '-40%',
      })
    })
  }
}

export default StickyHeader
