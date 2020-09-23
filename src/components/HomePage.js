import React from "react";
import ReactDOM from "react-dom";
import styles from "../styles/Styles.module.css";

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isToggleOn: true, isLoading: true, users: [], error: null };

    // This binding is necessary to make `this` work in the callback
    this.handleClick = this.handleClick.bind(this);
  }
  // getting data from url
  fetchUsers() {
    let ListUrl = "https://api.github.com/repositories?since=376";
    fetch(ListUrl)
      .then((res) => res.json())
      .then((data) =>
        this.setState({
          users: data,
          isLoading: false,
        })
      )

      .catch((error) => this.setState({ error, isLoading: false }));
  }

  componentDidMount() {
    this.fetchUsers();
  }
  // handling fav's
  handleClick = () => {
    this.setState((state) => ({
      isToggleOn: !state.isToggleOn,
    }));
  };
  //rendering elements=============>
  render() {
    const { isLoading, users, error } = this.state;
    return (
      <div className={styles["heading"]} style={{ backgroundColor: "white" }}>
        <h1 className={styles["h1"]}>
          Available Public Repositories from Github
        </h1>
        {error ? <p>{error.message}</p> : null}
        {!isLoading ? (
          users.map((user) => {
            const { owner } = user;
            return (
              <div>
                <div
                  style={{
                    display: "inline-block",
                    width: "70%",
                  }}
                >
                  <span>
                    <img
                      src={owner.avatar_url}
                      style={{
                        height: "50px",
                        borderRadius: "50px",
                        float: "left",
                      }}
                      alt="Logo"
                    />

                    <text
                      style={{
                        paddingTop: "13px",
                        paddingLeft: "20px",
                        float: "left",
                        fontFamily: "revert",
                        fontWeight: "bold",
                        color: "ThreeDDarkShadow",
                      }}
                    >
                      {owner.login}
                    </text>
                    <a href={owner.html_url}>
                      <button
                        style={{
                          fontFamily: "monospace",
                          color: "#0000EE",
                          backgroundColor: "white",
                          border: "none",
                          outline: "none",
                          fontSize: "15px",
                          fontStyle: "italic",
                        }}
                      >
                        {owner.html_url}
                      </button>
                    </a>
                  </span>

                  <span style={{ float: "right" }}>
                    <button
                      onClick={this.handleClick}
                      style={{
                        height: "45px",
                        color: "white",
                        backgroundColor: "dodgerblue",
                        borderRadius: "25px",
                        border: "none",
                        outline: "none",
                        width: "200px",
                      }}
                    >
                      {this.state.isToggleOn ? "Add to  Favorites" : "Added"}
                    </button>
                  </span>
                </div>
                <hr />
              </div>
            );
          })
        ) : (
          <h3>Please Wait While Loading...</h3>
        )}
      </div>
    );
  }
}

ReactDOM.render(<HomePage />, document.getElementById("root"));
export default HomePage;
