import type Owner from '@ember/owner';
import Component from '@glimmer/component';
import './welcome-page.css';
interface WelcomePageComponentSignature {
    Args: {
        extension?: 'hbs' | 'gjs' | 'gts';
    };
}
export default class WelcomePageComponent extends Component<WelcomePageComponentSignature> {
    constructor(owner: Owner, args: WelcomePageComponentSignature['Args']);
    get rootURL(): string;
    get urlForEmberGuides(): string;
    get extension(): 'hbs' | 'gjs' | 'gts';
}
export {};
//# sourceMappingURL=welcome-page.d.ts.map