import { getOwner } from '@ember/application';
import { VERSION } from '@ember/version';
import Component from '@glimmer/component';
import './welcome-page.css';

const constructionUrl = new URL('./construction.png', import.meta.url).href

function isLatestVersion(): boolean {
  const stableRegex = /^\d+\.\d+\.\d+$/;

  return !stableRegex.test(VERSION);
}

interface WelcomePageComponentSignature {
  Args: {
    extension?: 'hbs' | 'gjs' | 'gts';
  };
}

export default class WelcomePageComponent extends Component<WelcomePageComponentSignature> {
  <template>
    <main id="ember-welcome-page-id-selector">
      <div class="columns">
        <div class="tomster">
          <img src={{constructionUrl}} alt="Under construction" />
        </div>
        <div class="welcome">
          <h1 id="title">Congratulations, you made it!</h1>

          <p>You&rsquo;ve officially spun up your Ember app. You&rsquo;ve got
            one more decision to make: what do you want to do next? We&rsquo;d
            suggest one of the following to help you get going:</p>
          <ul>
            <li><a
                href="{{this.urlForEmberGuides}}/getting-started/quick-start/"
              >Quick Start</a>
              - a quick introduction to how Ember works. Learn about defining
              your first route, writing a UI component and deploying your
              application.</li>
            <li><a href="{{this.urlForEmberGuides}}/tutorial/">Tutorial</a>
              - this is our more thorough, hands-on intro to Ember. Your crash
              course in Ember philosophy, background and some in-depth
              discussion of how things work (and why they work the way they do).</li>
          </ul>
          <p>If you run into problems, please join
            <a href="https://discord.gg/emberjs">our community's Discord server</a>
            or visit
            <a href="http://discuss.emberjs.com/">our forums</a>
            for ideas and answers— our community is filled with friendly folks
            who are willing to help! We enjoy helping new Ember developers get
            started, and our
            <a href="https://emberjs.com/community/">Ember Community</a>
            is incredibly supportive.</p>
        </div>
      </div>
      <p class="postscript">To remove this welcome message, remove the
        {{#if @extension}}
          <code>
            &lt;WelcomePage @extension="{{@extension}}" /&gt;
          </code>
        {{else}}
          <code>
            &lt;WelcomePage /&gt;
          </code>
        {{/if}}
        component from your
        <code>
          app/templates/application.{{this.extension}}
        </code>
        file and save it...you'll see this page update soon after!
      </p>
    </main>
  </template>

  get rootURL(): string {
    const config = getOwner(this)?.factoryFor('config:environment');

    if (config) {
      return (config.class as unknown as { rootURL: string }).rootURL;
    }

    return '/';
  }

  get urlForEmberGuides(): string {
    if (isLatestVersion()) {
      return `https://guides.emberjs.com/release`;
    }

    const [majorVersion, minorVersion] = VERSION.split('.');
    const emberVersion = `${majorVersion}.${minorVersion}.0`;

    return `https://guides.emberjs.com/v${emberVersion}`;
  }

  get extension(): 'hbs' | 'gjs' | 'gts' {
    return this.args.extension ?? 'hbs';
  }
}
