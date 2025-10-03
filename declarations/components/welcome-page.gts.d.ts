import Component from '@glimmer/component';
import './welcome-page.css';
interface WelcomePageComponentSignature {
    Args: {
        extension?: 'hbs' | 'gjs' | 'gts';
    };
}
export default class WelcomePageComponent extends Component<WelcomePageComponentSignature> {
    get rootURL(): string;
    get urlForEmberGuides(): string;
    get extension(): 'hbs' | 'gjs' | 'gts';
}
export {};
//# sourceMappingURL=welcome-page.gts.d.ts.map