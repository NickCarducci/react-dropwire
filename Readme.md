# Dropwire, like Mission Impossible, but for html attributed that download src for turnkey loading-as-needed (in React)!

### 

LICENSE AGPL-3
No redistribution but for strategy of parts, unless retributed

how to use

    class App extends React.Component {
      constructor(props) {
        super(props);
        this.state = {
          scrollTop: 0
        };
        for (let i = 0; i < 220; i++) {
          this["scrollImg" + i] = React.createRef();
        }
      }
      componentDidMount = () => {
        window.addEventListener("scroll", this.handleScroll);
      };
      componentWillUnmount = () => {
        window.removeEventListener("scroll", this.handleScroll);
      };
      handleScroll = (e) => {
        if (!this.state.offScroll) {
          const scrollTop = window.scrollY;
          this.setState(
            {
              scrolling: true,
              scrollTop
            },
            () => {
              clearTimeout(this.scrollTimeout);
              this.scrollTimeout = setTimeout(() => {
                this.setState({
                  scrolling: false
                });
              }, 900);
            }
          );
        }
      };
      render() {
        const handleScollImgError = (e) => {
          if (e.message) {
            console.log(e.message);
            this.setState({ serviceCancelingImages: true });
          }
        };
        let arrayOfnumbers = [0];
        const scrollnum = () => {
          const num = arrayOfnumbers[arrayOfnumbers.length - 1] + 1;
          arrayOfnumbers.push(num);
          return num;
        };
        return (
          <div>
            <Cable
              style={{
                height: "900px",
                width: "100%"
              }}
              onError={handleScollImgError}
              src={
                this.state.serviceCancelingImages
                  ? ""
                  : `https://fred.stlouisfed.org/graph/graph-landing.php?g=KalW&width=670&height=700`
              }
              timeout={1500}
              girth={1000}
              float="right"
              title="https://fred.stlouisfed.org/graph/?g=KalW"
              scrolling={this.state.scrolling}
              fwd={this["scrollImg" + scrollnum()]}
              scrollTopAndHeight={this.state.scrollTop + window.innerHeight}
              scrollTop={this.state.scrollTop}
            />
          </div>
        )
      }
    }
  

SEE LICENSE IN LICENSE.lz.txt

(please help with bundler for classes, not using a bundler (peerDeps required, spa))
copying the src code? https://github.com/npm/cli/issues/3514
npm install --force && npm uninstall @babel/polyfill --save ...