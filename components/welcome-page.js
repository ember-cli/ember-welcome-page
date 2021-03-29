import { getOwner } from "@ember/application";
import { VERSION } from "@ember/version";
import Component from "@glimmer/component";
import { hbs } from "ember-cli-htmlbars";
import { setComponentTemplate } from '@ember/component';
import "./welcome-page.css";

const template = hbs`
  <main id="ember-welcome-page-id-selector" data-ember-version="{{this.emberVersion}}">
    <div class="columns">
      <div class="tomster">
        <img src="{{this.rootURL}}ember-welcome-page/images/construction.png" alt="Under construction">
      </div>
      <div class="welcome">
        <h1 id="title">Congratulations, you made it!</h1>

        <p>You&rsquo;ve officially spun up your Ember app. You&rsquo;ve got one more decision to make: what do you want to do next? We&rsquo;d suggest one of the following to help you get going:</p>
        <ul>
          <li><a href="https://guides.emberjs.com/{{if this.isCurrent '' 'v'}}{{this.emberVersion}}/getting-started/quick-start/">Quick Start</a> - a quick introduction to how Ember works. Learn about defining your first route, writing a UI component and deploying your application.</li>
          <li><a href="https://guides.emberjs.com/{{if this.isCurrent '' 'v'}}{{this.emberVersion}}/tutorial/ember-cli/">Ember Guides</a> - this is our more thorough, hands-on intro to Ember. Your crash course in Ember philosophy, background and some in-depth discussion of how things work (and why they work the way they do).</li>
        </ul>
        <p>If you run into problems, please join <a href="https://discord.gg/emberjs">our community's Discord server</a> or visit <a href="http://discuss.emberjs.com/">our forums</a> for ideas and answers— our community is filled with friendly folks who are willing to help! We enjoy helping new Ember developers get started, and our <a href="https://emberjs.com/community/">Ember Community</a> is incredibly supportive.</p>
      </div>
    </div>
    <p class="postscript">To remove this welcome message, remove the
      <code>
        &lt;WelcomePage /&gt;
      </code>
      component from your
      <code>
        app/templates/application.hbs
      </code>
      file and save it...you'll see this page update soon after!
    </p>
  </main>
`;

export default setComponentTemplate(
  template,
  class extends Component {
    get isCurrent() {
      let displayCurrent = false;
      let version = VERSION;
      let patch = version.split(".")[2];

      if (version === "master") {
        displayCurrent = true;
      } else if (patch.match("alpha")) {
        displayCurrent = true;
      } else if (patch.match("beta")) {
        displayCurrent = true;
      }

      return displayCurrent;
    }

    get rootURL() {
      let config = getOwner(this).factoryFor("config:environment");

      if (config) {
        return config.class.rootURL;
      } else {
        return "/";
      }
    }

    get emberVersion() {
      let isCurrent = this.isCurrent;

      if (isCurrent) {
        return "current";
      } else {
        let [major, minor] = VERSION.split(".");
        return `${major}.${minor}.0`;
      }
    }
  }
)
