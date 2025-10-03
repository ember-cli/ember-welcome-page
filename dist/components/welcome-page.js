import "./welcome-page.css"
import { getOwner } from '@ember/application';
import { VERSION } from '@ember/version';
import Component from '@glimmer/component';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

;

const constructionUrl = new URL('./construction.png', import.meta.url).href;
function isLatestVersion() {
  const stableRegex = /^\d+\.\d+\.\d+$/;
  return !stableRegex.test(VERSION);
}
class WelcomePageComponent extends Component {
  static {
    setComponentTemplate(precompileTemplate("\n    <main id=\"ember-welcome-page-id-selector\">\n      <div class=\"columns\">\n        <div class=\"tomster\">\n          <img src={{constructionUrl}} alt=\"Under construction\" />\n        </div>\n        <div class=\"welcome\">\n          <h1 id=\"title\">Congratulations, you made it!</h1>\n\n          <p>You&rsquo;ve officially spun up your Ember app. You&rsquo;ve got\n            one more decision to make: what do you want to do next? We&rsquo;d\n            suggest one of the following to help you get going:</p>\n          <ul>\n            <li><a href=\"{{this.urlForEmberGuides}}/getting-started/quick-start/\">Quick Start</a>\n              - a quick introduction to how Ember works. Learn about defining\n              your first route, writing a UI component and deploying your\n              application.</li>\n            <li><a href=\"{{this.urlForEmberGuides}}/tutorial/\">Tutorial</a>\n              - this is our more thorough, hands-on intro to Ember. Your crash\n              course in Ember philosophy, background and some in-depth\n              discussion of how things work (and why they work the way they do).</li>\n          </ul>\n          <p>If you run into problems, please join\n            <a href=\"https://discord.gg/emberjs\">our community's Discord server</a>\n            or visit\n            <a href=\"http://discuss.emberjs.com/\">our forums</a>\n            for ideas and answers\u2014 our community is filled with friendly folks\n            who are willing to help! We enjoy helping new Ember developers get\n            started, and our\n            <a href=\"https://emberjs.com/community/\">Ember Community</a>\n            is incredibly supportive.</p>\n        </div>\n      </div>\n      <p class=\"postscript\">To remove this welcome message, remove the\n        {{#if @extension}}\n          <code>\n            &lt;WelcomePage @extension=\"{{@extension}}\" /&gt;\n          </code>\n        {{else}}\n          <code>\n            &lt;WelcomePage /&gt;\n          </code>\n        {{/if}}\n        component from your\n        <code>\n          app/templates/application.{{this.extension}}\n        </code>\n        file and save it...you'll see this page update soon after!\n      </p>\n    </main>\n  ", {
      strictMode: true,
      scope: () => ({
        constructionUrl
      })
    }), this);
  }
  get rootURL() {
    const config = getOwner(this)?.factoryFor('config:environment');
    if (config) {
      return config.class.rootURL;
    }
    return '/';
  }
  get urlForEmberGuides() {
    if (isLatestVersion()) {
      return `https://guides.emberjs.com/release`;
    }
    const [majorVersion, minorVersion] = VERSION.split('.');
    const emberVersion = `${majorVersion}.${minorVersion}.0`;
    return `https://guides.emberjs.com/v${emberVersion}`;
  }
  get extension() {
    return this.args.extension ?? 'hbs';
  }
}

export { WelcomePageComponent as default };
//# sourceMappingURL=welcome-page.js.map
