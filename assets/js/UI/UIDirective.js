
/*

  ui的指令
  创建人：Porry Chen
  创建日期：2015-02-21
 */

(function() {
  'use strict';
  angular.module('app.ui.directives', []).directive('uiProcess', [
    function() {
      var compilationFunction;
      compilationFunction = function(templateElement, templateAttributes, transclude) {
        var height, node, preLink, svg;
        if (templateElement.length === 1) {
          node = templateElement[0];
          height = node.getAttribute('data-process-height') || '90';
          svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
          svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
          svg.setAttribute('version', 1.1);
          svg.setAttribute('width', '100%');
          svg.setAttribute('height', height);
          svg.setAttribute('data-process-model', node.getAttribute('data-process-model'));
          node.parentNode.replaceChild(svg, node);
          return {
            pre: preLink = function(scope, instanceElement, instanceAttributes, controller) {
              var getFillColor, nodedata;
              nodedata = svg.getAttribute('data-process-model');
              getFillColor = function(type, rollback) {
                var result;
                if (rollback == null) {
                  rollback = 0;
                }
                result = '#7b7b7b';
                if (rollback > 0) {
                  result = 'red';
                } else if (type === 'ok') {
                  result = '#669e41';
                } else if (type === 'wait') {
                  result = '#5b9bd5';
                }
                return result;
              };
              return scope.$watch(nodedata, function(newValue, oldValue) {
                var addLine, changeLine, childCount, count, gap, getArrow, getCircle, getLine, isChild, line, lines, loopProcessData, removeAllLength;
                svg.setAttribute('height', height);
                removeAllLength = svg.childNodes.length;
                while (removeAllLength !== 0) {
                  svg.removeChild(svg.lastChild);
                  removeAllLength = svg.childNodes.length;
                }
                if (newValue === void 0) {
                  return;
                }
                count = 0;
                isChild = false;
                childCount = 0;
                gap = newValue.gap || 200;
                line = null;
                lines = [];
                getCircle = function(data, index, length) {
                  var circle;
                  circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
                  circle.setAttribute('cx', 40 + count * gap);
                  circle.setAttribute('cy', height / 2 + (childCount > 2 && isChild ? childCount - 2 : 0) * 90);
                  circle.setAttribute('r', 30);
                  circle.setAttribute('stroke-width', 6);
                  if (data.type === 'ok') {
                    if (count === 0) {
                      circle.setAttribute('stroke', '#92c570');
                    } else {
                      circle.setAttribute('stroke', '#669e41');
                    }
                  } else if (data.type === 'wait') {
                    circle.setAttribute('stroke', '#5b9bd5');
                  } else {
                    if (isChild || index + 1 !== length) {
                      circle.setAttribute('stroke', '#7b7b7b');
                    } else {
                      circle.setAttribute('stroke', '#515151');
                    }
                  }
                  circle.setAttribute('fill', getFillColor(data.type));
                  return circle;
                };
                getArrow = function(type, index, childIndex) {
                  var path, rollback;
                  rollback = 0;
                  path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
                  switch (type) {
                    case 2:
                      path.setAttribute('d', 'm' + (73 + (index - 1) * gap) + ',' + (height / 2 - 3) + 'h' + ((gap - 74) / 2 + 4) + 'v' + childIndex * 90 + 'h' + ((gap - 74) / 2 - 4) + 'v-6l8,10l-8,10v-6h-' + ((gap - 74) / 2 + 4) + 'v-' + childIndex * 90 + 'h-' + ((gap - 74) / 2 - 4) + 'z');
                      break;
                    case 3:
                      path.setAttribute('d', 'm' + (73 + index * gap) + ',' + (height / 2 - 3 + childIndex * 90) + 'h' + ((gap - 74) / 2 - 4) + 'v-' + childIndex * 90 + 'h' + ((gap - 74) / 2 + 4) + 'v-6l8,10l-8,10v-6h-' + ((gap - 74) / 2 - 4) + 'v' + childIndex * 90 + 'h-' + ((gap - 74) / 2 + 4) + 'z');
                      break;
                    case 4:
                      path.setAttribute('d', 'm' + (7 + index * gap) + ',' + (height / 2 - 3 + childIndex * 90) + 'h-' + ((gap - 74) / 2 + 4) + 'v-' + childIndex * 90 + 'h-' + ((gap - 74) / 2 - 4) + 'v-6l-8,10l8,10v-6h' + ((gap - 74) / 2 - 12) + 'v' + childIndex * 90 + 'h' + ((gap - 74) / 2 + 12) + 'z');
                      rollback = 1;
                      break;
                    case 5:
                      path.setAttribute('d', 'm' + (7 + index * gap) + ',' + (height / 2 - 3 + childIndex * 90) + 'h-' + (gap - 74) + 'v-6l-8,10l8,10v-6h' + (gap - 74) + 'z');
                      rollback = 1;
                      break;
                    default:
                      path.setAttribute('d', 'm' + (73 + index * gap) + ',' + (height / 2 - 3 + childIndex * 90) + 'h' + (gap - 60 - 6 - 8) + 'v-6l8,10l-8,10v-6h-' + (gap - 60 - 6 - 8) + 'z');
                  }
                  path.setAttribute('stroke-opacity', 'null');
                  path.setAttribute('stroke-width', 0);
                  path.setAttribute('fill', getFillColor(type, rollback));
                  return path;
                };
                getLine = function(type) {
                  var childIndex;
                  childIndex = 0;
                  switch (type) {
                    case 2:
                    case 3:
                    case 4:
                      childIndex = childCount - 2;
                      break;
                    default:
                      childIndex = childCount > 2 && isChild ? childCount - 2 : 0;
                  }
                  return getArrow(type, count, childIndex);
                };
                addLine = function(type, index) {
                  var info;
                  info = {};
                  info.type = type;
                  info.count = count;
                  info.childCount = childCount;
                  info.index = index;
                  info.isChild = isChild;
                  lines.push(info);
                  return info;
                };
                changeLine = function(rollback, index) {
                  if (rollback < -1) {
                    return angular.forEach(lines, function(info, loopIndex) {
                      var ipos;
                      if ((isChild && (index + rollback < -1)) || (!isChild && (count + rollback < -1))) {
                        if (count + rollback <= 0) {
                          rollback = -count + 1;
                        }
                        if (rollback < -1 && info.count - count === rollback) {
                          if (info.count > 0) {
                            info.type = 5;
                            info.count += 1;
                          }
                          return rollback++;
                        }
                      } else if (isChild && (index + rollback >= -1)) {
                        if (childCount === info.childCount) {
                          ipos = info.index - index;
                          if (ipos <= -1 && (ipos > rollback || (info.index === 0 && ipos === rollback && info.type !== 2))) {
                            if (info.type === 2) {
                              return info.type = 4;
                            } else {
                              info.type = 5;
                              return info.count += 1;
                            }
                          }
                        } else {
                          if (childCount === 2 && info.count - count === rollback) {
                            info.type = 5;
                            return info.count += 1;
                          }
                        }
                      }
                    });
                  }
                };
                loopProcessData = function(newValue) {
                  var value;
                  value = newValue.nodes ? newValue.nodes : newValue;
                  return angular.forEach(value, function(data, index) {
                    var g, text;
                    if (angular.isArray(data)) {
                      isChild = true;
                      childCount++;
                      index += loopProcessData(data);
                      count--;
                      isChild = false;
                    } else {
                      data.rollback = data.rollback || 0;
                      if (childCount > 2 && index === 0) {
                        count -= value.length;
                        changeLine(data.rollback, index);
                        if (data.rollback < 0) {
                          svg.appendChild(getLine(4));
                        } else {
                          addLine(2, index);
                        }
                      }
                      if (line) {
                        if (data.rollback < 0 && !(childCount > 2 && index === 0)) {
                          if (!isChild && (count + data.rollback <= 0)) {
                            data.rollback = -count + 1;
                          }
                          if (data.rollback === -1) {
                            lines.pop();
                          }
                          changeLine(data.rollback, index);
                          if ((!isChild && count > 1) || isChild) {
                            svg.appendChild(getLine(5));
                          }
                        }
                        line = null;
                      }
                      g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
                      if (data.message !== '') {
                        g.setAttribute('data-rel', 'tooltip');
                        g.setAttribute('title', data.message);
                      }
                      svg.appendChild(g);
                      g.appendChild(getCircle(data, index, value.length));
                      text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
                      text.setAttribute('x', 26 + count * gap);
                      text.setAttribute('y', height / 2 + 5 + (childCount > 2 && isChild ? childCount - 2 : 0) * 90);
                      text.setAttribute('style', 'font-family:Verdana;font-size:14;fill:white');
                      text.textContent = data.label;
                      g.appendChild(text);
                      if (isChild || index + 1 !== value.length) {
                        if (childCount > 2 && index + 1 === value.length) {
                          svg.appendChild(getLine(3));
                        } else {
                          line = addLine(1, index);
                        }
                      }
                    }
                    return count++;
                  });
                };
                if (newValue.nodes) {
                  loopProcessData(newValue);
                  angular.forEach(lines, function(info, index) {
                    var childIndex;
                    childIndex = 0;
                    switch (info.type) {
                      case 2:
                      case 3:
                      case 4:
                        childIndex = info.childCount - 2;
                        break;
                      default:
                        childIndex = info.childCount > 2 && info.isChild ? info.childCount - 2 : 0;
                    }
                    return svg.appendChild(getArrow(info.type, info.count, childIndex));
                  });
                  if (childCount > 2 && height < (childCount - 1) * 90) {
                    svg.setAttribute('height', (childCount - 1) * 90);
                  }
                  return svg.setAttribute('width', 40 * 2 + (count - 1) * gap);
                }
              });
            }
          };
        }
      };
      return {
        compile: compilationFunction,
        replace: true
      };
    }
  ]);

}).call(this);