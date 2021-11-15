const $ = document.querySelector.bind(document);

function isHtmlElement(obj) {
  var d = document.createElement("div");
  try {
    d.appendChild(obj.cloneNode(true));
    return obj.nodeType == 1 ? true : false;
  } catch (e) {
    return obj == window || obj == document;
  }
}

function setStyle(el, style) {
  for (const key in style) {
    el.style[key] = style[key];
  }
}

function createEl({ type = "div", classList = [] } = {}) {
  const el = document.createElement(type);
  el.classList = classList;
  return el;
}
class srnd {
  constructor({
    el,
    boundary = document.documentElement,
    onlyDrag = false,
    onDragStart,
    onDrag,
    onDragStop,
    onResizeStart,
    onResize,
    onResizeStop,
  }) {
    if (!isHtmlElement(el)) {
      throw new Error("el should a html element");
    }
    const { width, height } = el.getBoundingClientRect();
    this.el = el;
    this.boundary = boundary;
    this.onlyDrag = onlyDrag;
    this.onDragStart = onDragStart;
    this.onDrag = onDrag;
    this.onDragStop = onDragStop;
    this.onResizeStart = onResizeStart;
    this.onResize = onResize;
    this.onResizeStop = onResizeStop;
    this.scaleWidth = width;
    this.scaleHeight = height;
    this.init();
  }

  showLine = true;
  showDot = true;

  init = () => {
    this.el.addEventListener("click", () => {
      let id = this.el.getAttribute("data-srnd-id") || null;
      if (id === null) {
        const pos = getComputedStyle(this.el).position;
        id = this.genID();
        this.el.setAttribute("data-srnd-id", id);
        this.el.style.cursor = "move";
        this.el.style.position = pos === "fixed" ? pos : "absolute";

        this.setBoundary();
        this.addMove({
          callback: this.update,
        });

        if (!this.onlyDrag) {
          this.initLineAndDot();
          this.addScale({
            controllers: [
              { el: this.topCenterDot, dir: "n" },
              { el: this.bottomCenterDot, dir: "s" },
              { el: this.leftCenterDot, dir: "w" },
              { el: this.rightCenterDot, dir: "e" },
              { el: this.bottomRightDot, dir: "se" },
              { el: this.bottomLeftDot, dir: "sw" },
              { el: this.topLeftDot, dir: "nw" },
              { el: this.topRightDot, dir: "ne" },
            ],
            callback: this.update,
          });
        }
      }
    });
  };

  setBoundary() {
    const { x, y, width, height } = this.boundary.getBoundingClientRect();
    this.minX = x;
    this.minY = y;
    this.maxX = x + width - this.el.clientWidth;
    this.maxY = y + height - this.el.clientHeight;
    this.minWidth = 30;
    this.minHeight = 30;
    this.bwidth = width;
    this.bheight = height;
  }

  initLineAndDot = () => {
    this.topLine = createEl({ classList: ["srnd_line top"] });
    this.bottomLine = createEl({ classList: ["srnd_line bottom"] });
    this.leftLine = createEl({ classList: ["srnd_line left"] });
    this.rightLine = createEl({ classList: ["srnd_line right"] });
    this.topLeftDot = createEl({ classList: ["srnd_dot topLeft"] });
    this.topCenterDot = createEl({ classList: ["srnd_dot topCenter"] });
    this.topRightDot = createEl({ classList: ["srnd_dot topRight"] });
    this.bottomLeftDot = createEl({ classList: ["srnd_dot bottomLeft"] });
    this.bottomCenterDot = createEl({ classList: ["srnd_dot bottomCenter"] });
    this.bottomRightDot = createEl({ classList: ["srnd_dot bottomRight"] });
    this.leftCenterDot = createEl({ classList: ["srnd_dot leftCenter"] });
    this.rightCenterDot = createEl({ classList: ["srnd_dot rightCenter"] });

    document.body.append(
      this.topLine,
      this.bottomLine,
      this.leftLine,
      this.rightLine,
      this.topLeftDot,
      this.topCenterDot,
      this.topRightDot,
      this.bottomLeftDot,
      this.bottomCenterDot,
      this.bottomRightDot,
      this.leftCenterDot,
      this.rightCenterDot
    );
    this.update();
  };

  update = () => {
    const { x, y, width, height } = this.el.getBoundingClientRect();
    const dotSize = parseFloat(
      getComputedStyle(document.body).getPropertyValue("--dot-size")
    );

    this.scaleHeight = height;
    this.scaleWidth = width;

    this.setBoundary();

    if (!this.onlyDrag) {
      setStyle(this.topLine, {
        left: x + "px",
        top: y + "px",
        width: width + "px",
      });

      setStyle(this.bottomLine, {
        left: x + "px",
        top: y + height + "px",
        width: width + "px",
      });

      setStyle(this.leftLine, {
        left: x + "px",
        top: y + "px",
        height: height + "px",
      });

      setStyle(this.rightLine, {
        left: x + width + "px",
        top: y + "px",
        height: height + "px",
      });

      setStyle(this.topLeftDot, {
        left: x - dotSize / 2 + "px",
        top: y - dotSize / 2 + "px",
      });

      setStyle(this.topCenterDot, {
        left: x + width / 2 - dotSize / 2 + "px",
        top: y - dotSize / 2 + "px",
      });

      setStyle(this.topRightDot, {
        left: x + width - dotSize / 2 + "px",
        top: y - dotSize / 2 + "px",
      });

      setStyle(this.bottomLeftDot, {
        left: x - dotSize / 2 + "px",
        top: y + height - dotSize / 2 + "px",
      });

      setStyle(this.bottomCenterDot, {
        left: x + width / 2 - dotSize / 2 + "px",
        top: y + height - dotSize / 2 + "px",
      });

      setStyle(this.bottomRightDot, {
        left: x + width - dotSize / 2 + "px",
        top: y + height - dotSize / 2 + "px",
      });

      setStyle(this.leftCenterDot, {
        left: x - dotSize / 2 + "px",
        top: y + height / 2 - dotSize / 2 + "px",
      });

      setStyle(this.rightCenterDot, {
        left: x + width - dotSize / 2 + "px", 
        top: y + height / 2 - dotSize / 2 + "px",
      });
    }
  };

  addMove = ({ callback }) => {
    let startX, startY, left, top;

    const mouseMove = ({ clientX, clientY }) => {
      let x = clientX - startX + left;
      let y = clientY - startY + top;
      x = x < this.minX ? this.minX : x > this.maxX ? this.maxX : x;
      y = y < this.minY ? this.minY : y > this.maxY ? this.maxY : y;
      this.el.style.left = x + "px";
      this.el.style.top = y + "px";

      callback();

      if (typeof this.onDrag === "function") {
        this.onDrag({
          el: this.el,
          x,
          y,
        });
      }
    };

    this.el.addEventListener("mousedown", ({ clientX, clientY }) => {
      startX = clientX;
      startY = clientY;
      left = this.el.offsetLeft;
      top = this.el.offsetTop;

      this.el.addEventListener("mousemove", mouseMove);

      if (typeof this.onDragStart === "function") {
        this.onDragStart({
          el: this.el,
          x: clientX,
          y: clientY,
        });
      }
    });
    this.el.addEventListener("mouseout", () => {
      this.el.removeEventListener("mousemove", mouseMove);
    });
    this.el.addEventListener("mouseup", ({ clientX, clientY }) => {
      this.el.removeEventListener("mousemove", mouseMove);
      if (typeof this.onDragStop === "function") {
        this.onDragStop({
          el: this.el,
          x: clientX,
          y: clientY,
        });
      }
    });
  };

  addScale = ({ controllers, callback }) => {
    let startX, startY, endX, endY;
    controllers.map((item) => {
      const dir = item.dir;
      const controller = item.el;
      const scale = (moveEvent) => {
        moveEvent.stopPropagation();
        moveEvent.preventDefault();

        let width, height, maxWidth, maxHeight, top, left;

        switch (dir) {
          case "n":
            width = this.scaleWidth;
            height = endY - moveEvent.clientY;
            maxHeight = endY;
            maxWidth = this.scaleWidth;
            top = this.scaleHeight === 30 ? endY - 30 : moveEvent.clientY;
            left = startX;

            break;
          case "s":
            width = this.scaleWidth;
            height = moveEvent.clientY - startY;
            maxHeight = this.bheight - startY;
            maxWidth = this.scaleWidth;
            top = startY;
            left = startX;
            break;
          case "w":
            width = endX - moveEvent.clientX;
            height = this.scaleHeight;
            maxHeight = this.bheight - startY;
            maxWidth = endX - this.minX;
            top = startY;
            left = this.scaleWidth === 30 ? endX - 30 : moveEvent.clientX;
            break;
          case "e":
            width = moveEvent.clientX - startX;
            height = this.scaleHeight;
            maxHeight = this.bheight - startY;
            maxWidth = this.bwidth - startX + this.minX;
            top = startY;
            left = startX;
            break;
          case "se":
            width = moveEvent.clientX - startX;
            height = moveEvent.clientY - startY;
            maxWidth = this.bwidth - startX + this.minX;
            maxHeight = this.bheight - startY;
            top = startY;
            left = startX;
            break;
          case "sw":
            width = endX - moveEvent.clientX;
            height = moveEvent.clientY - startY;
            maxWidth = endX - this.minX;
            maxHeight = this.bheight - startY;
            top = startY;
            left = this.scaleWidth === 30 ? endX - 30 : moveEvent.clientX;
            break;
          case "ne":
            width = moveEvent.clientX - startX;
            height = endY - moveEvent.clientY;
            maxWidth = this.bwidth - startX + this.minX;
            maxHeight = endY;
            top = this.scaleHeight === 30 ? endY - 30 : moveEvent.clientY;
            left = startX;
            break;
          case "nw":
            width = endX - moveEvent.clientX;
            height = endY - moveEvent.clientY;
            maxWidth = endX - this.minX;
            maxHeight = endY;
            top = this.scaleHeight === 30 ? endY - 30 : moveEvent.clientY;
            left = this.scaleWidth === 30 ? endX - 30 : moveEvent.clientX;
            break;
        }

        width =
          width < this.minWidth
            ? this.minWidth
            : width > maxWidth
            ? maxWidth
            : width;
        height =
          height < this.minHeight
            ? this.minHeight
            : height > maxHeight
            ? maxHeight
            : height;
        top = top < this.minY ? this.minY : top > this.maxY ? this.maxY : top;
        left =
          left < this.minX ? this.minX : left > this.maxX ? this.maxX : left;

        setStyle(this.el, {
          width: width + "px",
          height: height + "px",
          left: left + "px",
          top: top + "px",
        });

        if (typeof this.onResize === "function") {
          this.onResize({ el: this.el, x: left, y: top, width, height });
        }

        callback();
      };
      const mouseup = () => {
        window.removeEventListener("mousemove", scale);
        controller.removeEventListener("mousemove", scale);
        controller.removeEventListener("mouseout", mouseout);
      };
      const mouseout = () => {
        window.addEventListener("mousemove", scale);
      };

      controller.addEventListener("mousedown", (downEvent) => {
        downEvent.stopPropagation();
        downEvent.preventDefault();

        const { x, y, width, height } = this.el.getBoundingClientRect();
        startX = x;
        startY = y;
        endX = x + width;
        endY = y + height;

        if (typeof this.onResizeStart === "function") {
          this.onResizeStart({ el: this.el, x, y, width, height });
        }

        controller.addEventListener("mousemove", scale);
        controller.addEventListener("mouseout", mouseout);
        controller.addEventListener("mouseup", () => {
          mouseup();
          if (typeof this.onResizeStop === "function") {
            const { x, y, width, height } = this.el.getBoundingClientRect();
            this.onResizeStop({
              el: this.el,
              x,
              y,
              width,
              height,
            });
          }
        });

        window.addEventListener("mouseup", mouseup);
      });
    });
  };

  genID = (length = 10) =>
    Number(Math.random().toString().substr(3, length) + Date.now()).toString(
      36
    );
}