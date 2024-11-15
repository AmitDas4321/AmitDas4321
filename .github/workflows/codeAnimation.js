(function() {
  const codeLines = [
    "(function",
    "repeat() {",
    "  eat();",
    "  sleep();",
    "  code();",
    "  repeat();",
    "})();"
  ];

  const svgWidth = 498;
  const svgHeight = 498;
  const charWidth = 12; 
  const lineHeight = 28; 
  const textStartX = svgWidth / 2; 
  const textStartY = (svgHeight - codeLines.length * lineHeight) / 2 + 10;
  const textElement = document.getElementById("codeText");
  const cursor = document.getElementById("cursor");
  let lineIndex = 0;
  let charIndex = 0;
  let currentLine = '';
  let cursorVisible = true;

  function type() {
    if (lineIndex < codeLines.length) {
      if (charIndex < codeLines[lineIndex].length) {
        currentLine += codeLines[lineIndex][charIndex];
        updateText();
        charIndex++;
      } else {
        lineIndex++;
        charIndex = 0;
        currentLine = '';
        setTimeout(type, 700);
        return;
      }
    } else {
      setTimeout(() => {
        resetAnimation();
        type();
      }, 2000);
      return;
    }
    setTimeout(type, Math.random() * 100 + 50);
  }

  function updateText() {
    textElement.innerHTML = '';
    for (let i = 0; i <= lineIndex; i++) {
      const tspan = document.createElementNS("http://www.w3.org/2000/svg", "tspan");
      tspan.setAttribute("x", textStartX);
      tspan.setAttribute("dy", i === 0 ? textStartY : lineHeight);
      tspan.textContent = i === lineIndex ? currentLine : codeLines[i];
      textElement.appendChild(tspan);
    }
    const cursorX = textStartX + currentLine.length * charWidth - 6;
    const cursorY = textStartY + lineIndex * lineHeight - 22;
    cursor.setAttribute("x", cursorX);
    cursor.setAttribute("y", cursorY);
  }

  function resetAnimation() {
    textElement.innerHTML = '';
    currentLine = '';
    lineIndex = 0;
    charIndex = 0;
  }

  function blinkCursor() {
    cursorVisible = !cursorVisible;
    cursor.style.opacity = cursorVisible ? "1" : "0";
    setTimeout(blinkCursor, 500);
  }

  blinkCursor();
  type();
})();
