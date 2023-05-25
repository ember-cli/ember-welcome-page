import type { TOC } from '@ember/component/template-only';
import { WelcomePage } from 'ember-welcome-page';

interface WelcomePageInTemplateTagSignature {
  Args: Record<string, never>;
}

const WelcomePageInTemplateTagComponent: TOC<WelcomePageInTemplateTagSignature> =
  <template>
    <WelcomePage />
  </template>

export default WelcomePageInTemplateTagComponent;

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    WelcomePageInTemplateTag: typeof WelcomePageInTemplateTagComponent;
  }
}
