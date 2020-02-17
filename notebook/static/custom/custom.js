// leave at least 2 line with only a star on it below, or doc generation fails
/**
 *
 *
 * Placeholder for custom user javascript
 * mainly to be overridden in profile/static/custom/custom.js
 * This will always be an empty file in IPython
 *
 * User could add any javascript in the `profile/static/custom/custom.js` file.
 * It will be executed by the ipython notebook at load time.
 *
 * Same thing with `profile/static/custom/custom.css` to inject custom css into the notebook.
 *
 *
 * The object available at load time depend on the version of IPython in use.
 * there is no guaranties of API stability.
 *
 * The example below explain the principle, and might not be valid.
 *
 * Instances are created after the loading of this file and might need to be accessed using events:
 *     define([
 *        'base/js/namespace',
 *        'base/js/promises'
 *     ], function(IPython, promises) {
 *         promises.app_initialized.then(function (appName) {
 *             if (appName !== 'NotebookApp') return;
 *             IPython.keyboard_manager....
 *         });
 *     });
 *
 * __Example 1:__
 *
 * Create a custom button in toolbar that execute `%qtconsole` in kernel
 * and hence open a qtconsole attached to the same kernel as the current notebook
 *
 *    define([
 *        'base/js/namespace',
 *        'base/js/promises'
 *    ], function(IPython, promises) {
 *        promises.app_initialized.then(function (appName) {
 *            if (appName !== 'NotebookApp') return;
 *            IPython.toolbar.add_buttons_group([
 *                {
 *                    'label'   : 'run qtconsole',
 *                    'icon'    : 'icon-terminal', // select your icon from http://fortawesome.github.io/Font-Awesome/icons
 *                    'callback': function () {
 *                        IPython.notebook.kernel.execute('%qtconsole')
 *                    }
 *                }
 *                // add more button here if needed.
 *                ]);
 *        });
 *    });
 *
 * __Example 2:__
 *
 * At the completion of the dashboard loading, load an unofficial javascript extension
 * that is installed in profile/static/custom/
 *
 *    define([
 *        'base/js/events'
 *    ], function(events) {
 *        events.on('app_initialized.DashboardApp', function(){
 *            requirejs(['custom/unofficial_extension.js'])
 *        });
 *    });
 *
 *
 *
 * @module IPython
 * @namespace IPython
 * @class customjs
 * @static
 */

define([
  'base/js/namespace',
  'base/js/events',
  'components/mixpanel/dist/mixpanel.amd',
  'custom/salix',
  'custom/salix-charts',
  'custom/salix-dagre',
  'components/bootstrap-treeview/dist/bootstrap-treeview.min',
  'custom/salix-treeview',
  'custom/bacata/bacata',
  'custom/charts'
], function(Jupyter, events, mixpanel, salix, salixCharts, salixDagre, boots, salixTree, bacata, googleChart) {


    // alert("Custom js loaded");

  //alert($(document).ready(new Salix().start));
  //var tmp = new Salix().tmp.start;

  //alert(tmp.subscriptions);
  // tmp.start();
  // tmp.subscriptions();

  // Jupyter.toolbar.add_buttons_group([{
  //     'label': 'Search',
  //     'icon': 'fa-search', // select your icon from http://fortawesome.github.io/Font-Awesome/icons
  //     'callback': function() {
  //       Jupyter.toolbar.search_ras();
  //     }
  //   }],'custom');



  // Jupyter.toolbar.add_buttons_group([{
  //   'label': 'Rascal',
  //   'icon': 'fa-hand-o-up', // select your icon from http://fortawesome.github.io/Font-Awesome/icons
  //   'callback': function() {
  //     console.log('code mirror: '+ Jupyter.notebook.codemirror_mode);
  //     Jupyter.notebook.set_codemirror_mode("rascal");
  //     console.log('code mirror: '+ Jupyter.notebook.codemirror_mode);
  //     // Jupyter.notebook.kernel.execute('%qtconsole');
  //
  //     mixpanel.track('Code mirror mode changed to: Rascal');
  //   }
  // },
  //   {
  //     'label': 'Amalga',
  //     'icon': 'fa-thumbs-up', // select your icon from http://fortawesome.github.io/Font-Awesome/icons
  //     'callback': function() {
  //       console.log('code mirror: '+ Jupyter.notebook.codemirror_mode);
  //       Jupyter.notebook.set_codemirror_mode("amalga");
  //       mixpanel.track('Code mirror mode changed to: Amalga');
  //     }
  //   }
  // ], 'Custom');


  // Jupyter.toolbar.add_selector_group({
  //   'label': 'Code mirror: ',
  //   'icon': 'fa-hand-o-up', // select your icon from http://fortawesome.github.io/Font-Awesome/icons
  //   'options': [
  //     'Rascal', // {name: 'Rascal mirror' value: 'rascal'}
  //     'Amalga',
  //     'Amalgatest',
  //     'Java',
  //     'C',
  //     'Pico',
  //     'Halide'
  //   ],
  //   'callback': function(mode) {
  //     Jupyter.notebook.set_codemirror_mode(mode);
  //     mixpanel.track('Code mirror mode changed to:' + mode);
  //   }
  // });

  //  events.on('app_initialized.NotebookApp', function() {
  //      console.warn("entro aqui");
  //  });

});