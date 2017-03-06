/*!
 * miniquery
 */

/*
 * ----------------------------------------------------------------------------
 * Element Selector
 * ----------------------------------------------------------------------------
 */
var SweetSelector = {}

SweetSelector.select = function (element) {
  return document.querySelectorAll(element)
}

/*
 * -----------------------------------------------------------------------------
 * DOM Manipulators
 * -----------------------------------------------------------------------------
 */

var DOM = {}

DOM.hide = function (element) {
  SweetSelector.select(element).forEach(function (el) {
    el.style.display = 'none'
  })
}

DOM.show = function (element) {
  SweetSelector.select(element).forEach(function (el) {
    el.style.display = ''
  })
}

DOM.addClass = function (element, className) {
  SweetSelector.select(element).forEach(function (el) {
    if (el.classList) {
      el.classList.add(className)
    } else {
      el.className += ' ' + className
    }
  })
}

DOM.removeClass = function (element, className) {
  SweetSelector.select(element).forEach(function (el) {
    if (el.classList)
      el.classList.remove(className)
    else
      el.className = el.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ')
  })
}

/*
 * ----------------------------------------------------------------------------
 * Event Dispatcher
 * ----------------------------------------------------------------------------
 */

var EventDispatcher = {}
EventDispatcher.on = function (element, ev, callback) {
  SweetSelector.select(element).forEach(function (el) {
    if (window.CustomEvent) {
      var event = new CustomEvent(ev)
    } else {
      var event = document.createEvent(ev)
      event.initCustomEvent(ev, true, true)
    }

    el.dispatchEvent(event)
    callback()
  })
}

/*
 * ----------------------------------------------------------------------------
 * AJAX Wrapper
 * ----------------------------------------------------------------------------
 */
var AjaxWrapper = {}

AjaxWrapper.request = function (requestQuery) {
  var request = new XMLHttpRequest()
  request.open(requestQuery.type, requestQuery.url, true)

  request.onload = function () {
    if (request.status >= 200 && request.status < 400) {
      // Success!
      var resp = request.responseText
      requestQuery.success(resp)
    } else {
      // We reached our target server, but it returned an error
      requestQuery.fail()
    }
  }

  request.onerror = function () {
    // There was a connection error of some sort
    request.fail()
  }

  request.send()
}

/*
 * ----------------------------------------------------------------------------
 * Alias miniquery
 * ----------------------------------------------------------------------------
 */

var mquery = function (element) {
  this.element

  this.selector = function () {
    this.element = SweetSelector.select(element)
    return this
  }

  this.selector()

  this.hide = function () {
    DOM.hide(element)
    return this
  }

  this.show = function () {
    DOM.show(element)
    return this
  }
}

function $ (element) {
  return new mquery(element)
}

function miniquery (element) {
  return new mquery(element)
}
