import * as cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import * as React from 'react';
import { defineMessages, FormattedMessage, injectIntl, intlShape } from 'react-intl';
import { Link } from 'react-router-dom';
import * as s from './LandingPage.css';

const messages = defineMessages({});

class LandingPage extends React.Component<void, void> {
  public render() {
    return (
      <div className="pushable">
        <div className="ui large top fixed menu transition hidden"
          style={{display: 'undefined !important'}}>
          <div className="ui container">
            <a className="active item">Home</a>
            <a className="item">Work</a>
            <a className="item">Company</a>
            <a className="item">Careers</a>
            <div className="right menu">
              <div className="item">
                <a className="ui button">Log in</a>
              </div>
              <div className="item">
                <a className="ui primary button">Sign Up</a>
              </div>
            </div>
          </div>
        </div>

        <div className="ui vertical inverted sidebar menu left">
          <a className="active item">Home</a>
          <a className="item">Work</a>
          <a className="item">Company</a>
          <a className="item">Careers</a>
          <a className="item">Login</a>
          <a className="item">Signup</a>
        </div>

        <div className="pusher">
          <div className="ui inverted vertical masthead center aligned segment">

            <div className="ui container">
              <div className="ui large secondary inverted pointing menu">
                <a className="toc item">
                  <i className="sidebar icon"></i>
                </a>
                <a className="active item">Home</a>
                <a className="item">Work</a>
                <a className="item">Company</a>
                <a className="item">Careers</a>
                <div className="right item">
                  <a className="ui inverted button">Log in</a>
                  <a className="ui inverted button">Sign Up</a>
                </div>
              </div>
            </div>

            <div className="ui text container">
              <h1 className="ui inverted header">
                Imagine-a-Company
              </h1>
              <h2>Do whatever you want when you want to.</h2>
              <div className="ui huge primary button">Get Started <i className="right arrow icon"></i></div>
            </div>

          </div>

          <div className="ui vertical stripe segment">
            <div className="ui middle aligned stackable grid container">
              <div className="row">
                <div className="eight wide column">
                  <h3 className="ui header">We Help Companies and Companions</h3>
                  <p>
                    We can give your company superpowers to do things that they never thought possible.
                    Let us delight your customers and empower your needs...through pure data analytics.
                  </p>
                  <h3 className="ui header">We Make Bananas That Can Dance</h3>
                  <p>
                    Yes that's right, you thought it was the stuff of dreams,
                    but even bananas can be bioengineered.
                  </p>
                </div>
                <div className="six wide right floated column">
                  <img src="assets/images/wireframe/white-image.png" className="ui large bordered rounded image" />
                </div>
              </div>
              <div className="row">
                <div className="center aligned column">
                  <a className="ui huge button">Check Them Out</a>
                </div>
              </div>
            </div>
          </div>

          <div className="ui vertical stripe quote segment">
            <div className="ui equal width stackable internally celled grid">
              <div className="center aligned row">
                <div className="column">
                  <h3>"What a Company"</h3>
                  <p>That is what they all say about us</p>
                </div>
                <div className="column">
                  <h3>"I shouldn't have gone with their competitor."</h3>
                  <p>
                    <img src="assets/images/avatar/nan.jpg" className="ui avatar image" />
                    <b>Nan</b> Chief Fun Officer Acme Toys
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="ui vertical stripe segment">
            <div className="ui text container">
              <h3 className="ui header">Breaking The Grid, Grabs Your Attention</h3>
              <p>
                Instead of focusing on content creation and hard work, we have learned how to master
                the art of doing nothing by providing massive amounts
                of whitespace and generic content that can seem massive, monolithic and worth your attention.
              </p>
              <a className="ui large button">Read More</a>
              <h4 className="ui horizontal header divider">
                <a href="#">Case Studies</a>
              </h4>
              <h3 className="ui header">Did We Tell You About Our Bananas?</h3>
              <p>
                Yes I know you probably disregarded the earlier boasts
                as non-sequitur filler content, but its really true.
                It took years of gene splicing and combinatory DNA research,
                but our bananas can really dance.
              </p>
              <a className="ui large button">I'm Still Quite Interested</a>
            </div>
          </div>

          <div className="ui inverted vertical footer segment">
            <div className="ui container">
              <div className="ui stackable inverted divided equal height stackable grid">
                <div className="three wide column">
                  <h4 className="ui inverted header">About</h4>
                  <div className="ui inverted link list">
                    <a href="#" className="item">Sitemap</a>
                    <a href="#" className="item">Contact Us</a>
                    <a href="#" className="item">Religious Ceremonies</a>
                    <a href="#" className="item">Gazebo Plans</a>
                  </div>
                </div>
                <div className="three wide column">
                  <h4 className="ui inverted header">Services</h4>
                  <div className="ui inverted link list">
                    <a href="#" className="item">Banana Pre-Order</a>
                    <a href="#" className="item">DNA FAQ</a>
                    <a href="#" className="item">How To Access</a>
                    <a href="#" className="item">Favorite X-Men</a>
                  </div>
                </div>
                <div className="seven wide column">
                  <h4 className="ui inverted header">Footer Header</h4>
                  <p>Extra space for a call to action inside the footer that could help re-engage users.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(s)(LandingPage);
