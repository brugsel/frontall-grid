import {storiesOf} from '@storybook/polymer';
import { action } from '@storybook/addon-actions';
import {document} from 'global';

storiesOf('Frontall', module)
  .add('Grid', () => {

      return `
        <h1>Grid test</h1>
        <frl-root-grid>
          <div style="background-color: green;" class="atomic-x-10 atomic-y-5">
            <button class="atomic-x-4 atomic-y-2" onClick="{action('button-click');}">Test actions!</button>
          </div>
        </frl-root-grid>

      `;

    }
  );
