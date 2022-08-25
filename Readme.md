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
        const selectMemberType = (e) => {
          //console.log(e.target.id);currentTarget.parentNode
          this.setState({ viewMemberType: e.currentTarget.id });
        };
        const styleIconMember = (e) => {
          return {
            borderRadius: "15px",
            border: `${
              (!this.state.viewMemberType && e === "author") ||
              e === this.state.viewMemberType
                ? 1
                : 0
            }px solid white`,
            width: "30px",
            height: "30px",
            position: "relative",
            margin: "4px"
          };
        };
        return (
          <div>
            <div
              onClick={() => {
                window.scroll(0, 1);
                this.setState({ trigger: true });
              }}
              style={{
                display: this.state.trigger ? "none" : "block",
                position: "absolute",
                height: "101%",
                width: "100%",
                backgroundColor: "rgba(20,20,20,.5)"
              }}
            />
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div>
                <span id="author" onClick={selectMemberType}>
                  <Cable
                    style={{ ...styleIconMember("author") }}
                    onError={handleScollImgError}
                    img={true}
                    src={
                      this.state.noyoutube
                        ? ""
                        : "https://www.dropbox.com/s/mi3ksr5dde174qa/author%20icon.png?raw=1"
                    }
                    float="left"
                    title="author"
                    scrolling={this.state.scrolling}
                    fwd={this["scrollImg" + scrollnum()]}
                    scrollTopAndHeight={this.state.scrollTop + window.innerHeight}
                    scrollTop={!this.state.oldecon ? 0 : this.state.scrollTop}
                  />
                </span>
                <span id="admin" onClick={selectMemberType}>
                  <Cable
                    style={{ ...styleIconMember("admin") }}
                    onError={handleScollImgError}
                    img={true}
                    src={
                      this.state.noyoutube
                        ? ""
                        : "https://www.dropbox.com/s/pjelt1l07rvfwl4/admin%20icon.png?raw=1"
                    }
                    float="left"
                    title="admin"
                    scrolling={this.state.scrolling}
                    fwd={this["scrollImg" + scrollnum()]}
                    scrollTopAndHeight={this.state.scrollTop + window.innerHeight}
                    scrollTop={!this.state.oldecon ? 0 : this.state.scrollTop}
                  />
                </span>
                <span id="employee" onClick={selectMemberType}>
                  <Cable
                    style={{ ...styleIconMember("employee") }}
                    onError={handleScollImgError}
                    img={true}
                    src={
                      this.state.noyoutube
                        ? ""
                        : "https://www.dropbox.com/s/lcjzwa1opxczkrw/employee%20icon.png?raw=1"
                    }
                    float="left"
                    title="employee"
                    scrolling={this.state.scrolling}
                    fwd={this["scrollImg" + scrollnum()]}
                    scrollTopAndHeight={this.state.scrollTop + window.innerHeight}
                    scrollTop={!this.state.oldecon ? 0 : this.state.scrollTop}
                  />
                </span>
              </div>
              {this.state.viewMemberType || "author"}
              <br />
              {this.state.viewMemberType === "admin"
                ? this.state.admin.length < 1
                  ? "-"
                  : //this.props.company.admin.map((e) => {
                    //return <div>{this.state.admin[e].map((e) => {})}</div>;<div>{
                    this.state.admin.map((e) => {
                      return <div>{e.username}</div>;
                    }) //}</div>})
                : this.state.viewMemberType === "employee"
                ? this.state.employees.length < 1
                  ? "-"
                  : this.state.employees.map((e) => {
                      return <div>{e.username}</div>;
                    })
                : this.state.author.username}
              {/*jammin in the name of the lord err where til thru anyhow */}
            </div>
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