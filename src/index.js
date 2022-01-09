import React from "react";
//import ReactDOM from "react-dom";
//import ReactHtmlParser from "react-html-parser";
//import reactElementToJSXString from "react-element-to-jsx-string";
//import ReactDOMServer from "react-dom/server";
//import ExecutionEnvironment from "exenv";

/*class Forward extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return <div ref={this.props.fwdtwe} />;
  }
}*/

class Cable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      limit: [],
      cache: null,
      mountsCount: 0,
      cacheStyle: "",
      framewidth: 200
    };
    this.page = React.createRef();
    this.fwdtwe = React.createRef();
  }
  /*componentDidMount() {
    if (ExecutionEnvironment.canUseDOM) {
      this.setState({ go: true }, () => this.checkIfBetween());
    }
  }*/
  componentDidUpdate = (prevProps) => {
    if (this.state.go && this.props.scrolling !== prevProps.scrolling) {
      this.checkIfBetween();
    }
    if (this.state.loaded !== this.state.lastLoaded) {
      this.setState(
        {
          lastLoaded: this.state.loaded
        },
        this.checkIfBetween
      );
    }
  };
  componentWillUnmount = () => {
    clearTimeout(this.setset);
  };
  checkIfBetween = () => {
    const { cache } = this.state;
    const { scrollTopAndHeight, scrollTop, girth, timeout } = this.props;
    var girt = girth ? girth : 500;
    var timeou = timeout ? timeout : 1500;
    clearTimeout(this.setset);
    this.setset = setTimeout(() => {
      var page = this.page.current;
      var between =
        page.offsetTop - scrollTop > Number(`-${girt}`) &&
        scrollTopAndHeight - page.offsetTop > Number(`-${girt}`);

      if (!this.state.mount) {
        //console.log(between, page.offsetTop, scrollTop);
        this.setState({ mount: between }, () => {});
      } else {
        var continuee = this.props.fwd.current;
        //between && console.log(between, continuee.outerHTML);
        //if (!continuee && !cache) return;
        /*const cacheStyle = JSON.parse(
          (cache ? cache : continuee.outerHTML)
            .split(`style="`)[1]
            .split(`"`)[0]
            .replaceAll(";", `",`)
            .replaceAll(": ", `: "`)
        );*/
        //console.log(cacheStyle);
        //console.log(cache, continuee.offsetHeight, continuee.offsetWidth);
        if (!cache && this.state.loaded) {
          this.setState({
            cache: continuee.outerHTML,
            //cacheStyle,
            frameheight: continuee.offsetHeight,
            framewidth: continuee.offsetWidth
          });
        } else if (!between) {
          /* if (continuee) {
                
                const children = [...continuee.children];
                console.log(children);
                if (children.length > 0) {
                  var gl = null;

                  const foun = children.find(
                    (x) => (gl = x.getContext("webgl"))
                  );

                  foun.addEventListener(
                    "webglcontextlost",
                    (e) => console.log(e),
                    false
                  );

                  gl.getExtension("WEBGL_lose_context").loseContext();
                }
              }*/
          continuee.remove();
          return (page.innerHTML = "");
          // this.setState({ mount: false });
        } else if (page.innerHTML === "") {
          const children = [...page.children];
          if (
            cache &&
            (children.length === 0 || !children.find((x) => x === cache))
          ) {
            //console.log("replenishing, new scroll", cache);
            return (page.innerHTML = this.state.cache);
          }
        }
      }
    }, timeou);
  };
  render() {
    const { mount /*, cacheStyle */ } = this.state;
    const { src, float, title, img } = this.props;
    //const limited = limit.find((x) => x === Object.keys(this.props.fwd));
    const onError = (e) => {
      //this.props.fwd.current.remove();
      this.props.onError(e);
    }; //ternaries remove the node and element; display removes the element, but not the node
    //const parsedStyle = JSON.parse(`{ ${cacheStyle} }`);
    const onLoad = (e) => {
      console.log("loaded");
      this.setState({
        loaded: true
      });
    };
    return (
      <div
        ref={this.page}
        style={{
          shapeOutside: "rect()",
          float,
          height: this.state.frameheight,
          width: this.state.framewidth,
          ...this.props.style
        }}
      >
        {!mount || src === "" ? (
          <span style={{ border: "1px gray solid" }}>{title}</span>
        ) : img ? (
          <img
            onLoad={onLoad}
            onError={onError}
            alt={title}
            style={{
              shapeOutside: "rect()",
              float,
              width: "200px",
              border: 0,
              ...this.props.style
            }}
            ref={this.props.fwd}
            src={src}
          />
        ) : (
          <iframe
            onLoad={onLoad}
            onError={onError}
            title={title}
            style={{
              shapeOutside: "rect()",
              float,
              width: "200px",
              border: 0,
              ...this.props.style
            }}
            ref={this.props.fwd}
            src={src}
          />
        )}
      </div>
    );
  }
}
export default React.forwardRef((props, ref) => <Cable fwd={ref} {...props} />);
