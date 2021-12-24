import React from "react";
class Cable extends React.Component {
  constructor(props) {
    super(props);
    this.state = { limit: [], cache: null };
    this.page = React.createRef();
  }
  componentDidUpdate = (prevProps) => {
    if (this.props.scrolling !== prevProps.scrolling) {
      const { cache } = this.state;
      const { scrollTopAndHeight, scrollTop, girth, timeout } = this.props;
      var girt = girth ? girth : 1000;
      var timeou = timeout ? timeout : 1500;
      var continuee = this.props.fwd.current;
      if (!continuee && !cache) return;
      clearTimeout(this.setset);
      this.setset = setTimeout(() => {
        var page = this.page.current;
        var between =
          page.offsetTop - scrollTop > Number(`-${girt}`) &&
          scrollTopAndHeight - page.offsetTop > Number(`-${girt}`);
        if (!continuee) continuee = cache;
        this.setState({ cache: continuee, between }, () => {
          if (!between && continuee) {
            //while (page.firstChild) {
            //page.removeChild(page.firstChild);
            let onClick =
              "ontouchstart" in continuee ? "touchstart" : "onclick";
            if (continuee[onClick]) continuee.remove(); //touchevent
            //continuee.click();
            //}
            return;
          }
          //if (!between && continuee) return continuee.remove();
          if (page.children[0] !== this.state.cache)
            page.appendChild(this.state.cache);
        });
      }, timeou);
    }
  };
  componentWillUnmount = () => {
    clearTimeout(this.setset);
  };
  render() {
    const { between, continuee } = this.state;
    const { src, float, title, img } = this.props;
    //const limited = limit.find((x) => x === Object.keys(this.props.fwd));
    return (
      <div ref={this.page}>
        {!continuee || between ? (
          src === "" ? (
            <span ref={this.props.fwd} style={{ border: "1px gray solid" }}>
              {title}
            </span>
          ) : img ? (
            <img
              onError={this.props.onError}
              alt={title}
              style={{
                shapeOutside: "rect()",
                float,
                width: "200px",
                border: 0,
                ...this.props.style,
                display: src === "" ? "none" : ""
              }}
              ref={this.props.fwd}
              src={src}
            />
          ) : (
            <iframe
              onError={this.props.onError}
              title={title}
              style={{
                shapeOutside: "rect()",
                float,
                width: "200px",
                border: 0,
                ...this.props.style,
                display: src === "" ? "none" : ""
              }}
              ref={this.props.fwd}
              src={src}
            />
          )
        ) : null}
      </div>
    );
  }
}
export default React.forwardRef((props, ref) => <Cable fwd={ref} {...props} />);