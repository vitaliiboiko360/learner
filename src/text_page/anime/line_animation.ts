
// attributes needs to be in format {'attr':'val','attr2':'val2',...}
function addSVGElemenReturnAnime(elementType: string, target: HTMLElement | SVGElement, attributes: Record<string, unknown> = {}, duration, to) {
  const schema = 'http://www.w3.org/2000/svg';
  const element: SVGElement = document.createElementNS(schema, elementType);
  Object.entries(attributes).map(a => element.setAttribute(a[0], a[1] as string));
  let dur = '3s'
  if (duration) {
    dur = duration
  }

  const animation = document.createElementNS(schema, "animate");
  animation.setAttribute('attributeName', 'width');
  animation.setAttribute('from', 0);
  animation.setAttribute('to', to);
  animation.setAttribute('begin', 'indefinite');
  animation.setAttribute('dur', dur);
  animation.setAttribute('repeatCount', '1');
  animation.setAttribute('fill', 'freeze');

  element.appendChild(animation);
  target.appendChild(element);

  return animation;
}

export function cleanupSvgChildren(svgRef) {
  if (svgRef.current == null)
    return;
  while (svgRef.current.firstChild) {
    svgRef.current.removeChild(svgRef.current.lastChild);
  }
}

export function setupAnimation(length, spanRef, svgRef) {
  const parentRect = spanRef.current.getBoundingClientRect();
  const children = [].slice.call(spanRef.current.childNodes);
  // console.log(`\n${JSON.stringify(parentRect)}`);

  const coordinates = children.reduce((collectedArray, child) => {

    const childRect = child.getBoundingClientRect();
    const coordinateValues = { 'x': (childRect.x - parentRect.x), 'y': childRect.height * (collectedArray.length + 1), 'deltaX': childRect.width, 'lineBottomY': childRect.bottom };
    // console.log(`word=${child.innerText}\t${JSON.stringify(childRect)}`);

    const foundIndex = collectedArray.findIndex((element) => {
      return element.lineBottomY === coordinateValues.lineBottomY;
    });

    if (foundIndex == -1) {
      collectedArray.push(coordinateValues);
    }
    else {
      collectedArray[foundIndex].deltaX = collectedArray[foundIndex].deltaX + childRect.width;
    }

    return collectedArray;
  }, []);


  const lineLength = coordinates.reduce((width, values) => {
    width += values.deltaX;
    return width;
  }, 0);

  const animationElements = coordinates.map((values) => {
    let portionOfLength = lineLength / values.deltaX;
    let durationOfAnimation = Math.ceil(length / portionOfLength);
    return addSVGElemenReturnAnime('rect', svgRef.current, {
      'x': values.x, 'y': values.y, 'stroke-width': '1', 'stroke': 'var(--blue)', 'width': '0', 'height': '1px', 'rx': '1px', 'ry': '1px'
    }, `${durationOfAnimation}s`, values.deltaX);
  });

  const runAnimation = function (index) {
    animationElements[index].addEventListener("endEvent", () => {
      if (animationElements.length > (index + 1)) {
        animationElements[index].parentNode.setAttribute('width', animationElements[index].getAttribute('to'));
        runAnimation(index + 1);
      }
      else {
        animationElements.forEach((element) => { element.parentNode.remove() });
      }
    });
    animationElements[index].beginElement();
  }
  runAnimation(0);
}


export function setupAnimation2(length, totalDurationOfAnimation, spanRef) {
  let children = spanRef.current.children;

  let animationElements = [];
  for (let i = 0; i < children.length; i++) {
    let spanElement = children[i].children[0];
    let svgElement = children[i].children[1];

    const width = spanElement.getBoundingClientRect().width;
    svgElement.setAttribute('width', width);

    let charLength = spanElement.innerText.length;
    let portionOfLength = (charLength * 100) / length;
    let portionOfDuration = (totalDurationOfAnimation * portionOfLength) / 100;

    let path = svgElement.getElementsByTagName('path')[0];

    let animation = path ? path.children[0] : addSVGElemenReturnAnime('rect', svgElement, {
      'x': 0, 'y': 1, 'stroke-width': '0.2em', 'stroke': 'var(--blue)', 'width': '0', 'height': '0.2em', 'rx': '0.05em', 'ry': '0.05em'
    }, `${portionOfDuration}s`, width);

    animationElements.push(animation);
  }

  const runAnimation = function (index) {
    animationElements[index].addEventListener("endEvent", () => {
      if ((index + 1) < animationElements.length) {
        // animationElements[index].parentNode.setAttribute('width', animationElements[index].getAttribute('to'));
        runAnimation(index + 1);
      }
      else {
        animationElements.forEach((element) => {
          element.parentNode.remove();
        });
      }
    });
    animationElements[index].beginElement();
  }
  runAnimation(0);
}

export function cleanupSvgChildren2(spanRef) {
  if (spanRef.current == null)
    return;

  let children = spanRef.current.children;
  for (let i = 0; i < children.length; i++) {
    let svgElement = children[i].children[1];
    let pathElement = svgElement.children[0];
    if (pathElement) {
      pathElement.remove();
    }
  }
}