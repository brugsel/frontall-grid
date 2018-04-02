import {configure} from '@storybook/polymer';
import {setOptions} from '@storybook/addon-options';

import '../dist/frontall-grid.css';

setOptions({
  hierarchyRootSeparator: /\|/,
});

function loadStories() {
  require('../src/stories/index.stories');

  const req = require.context('../src/stories', true, /\.stories\.js$/);
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
//
// addonAPI.register('my-organisation/my-addon', storybookAPI => {
//   // Also need to set a unique name to the panel.
//     addonAPI.addPanel('my-organisation/my-addon/panel', `<h1>panel notes</h1>`)
// });
