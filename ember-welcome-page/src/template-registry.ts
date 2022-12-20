import type WelcomePageComponent from './components/welcome-page';

export default interface EmberWelcomePageRegistry {
  WelcomePage: typeof WelcomePageComponent;
  'welcome-page': typeof WelcomePageComponent;
}
