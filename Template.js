/*
 * grunt-init-jquery
 * https://gruntjs.com/
 *
 * Copyright (c) 2013 "Cowboy" Ben Alman, contributors
 * Licensed under the MIT license.
 */

'use strict';

// Basic template description.
exports.description = 'Template for CakePHP 3 project .';

// Template-specific notes to be displayed before question prompts.
exports.notes = 'Notes';

// Template-specific notes to be displayed after question prompts.
exports.after = 'You should now install project dependencies with _npm ' +
  'install_. After that, you may execute project tasks with _grunt_. For ' +
  'more information about installing and configuring Grunt, please see ' +
  'the Getting Started guide:' +
  '\n\n' +
  'http://gruntjs.com/getting-started';

// Any existing file or directory matching this wildcard will cause a warning.
exports.warnOn = '*';

// The actual init template.
exports.template = function(grunt, init, done) {

  init.process({type: 'cakephp3'}, [
    init.prompt('version'),
    init.prompt('repository'),
    init.prompt('homepage'),
    init.prompt('bugs'),
    init.prompt('licenses', 'MIT'),
    init.prompt('author_name'),
    init.prompt('author_email'),
    init.prompt('author_url'),
  ], function(err, props) {

    props.keywords = [];

    // Files to copy (and process).
    var files = init.filesToCopy(props);

    // Add properly-named license files.
    init.addLicenseFiles(files, props.licenses);

    // Actually copy (and process) files.
    init.copyAndProcess(files, props, {noProcess: 'libs/**'});

    // Generate package.json file, used by npm and grunt.
    init.writePackageJSON('package.json', {
      name: 'cakephp3-application',
      version: '0.0.0-ignored',
      // TODO: pull from grunt's package.json
      node_version: '>= 0.8.0',
      devDependencies: {
        'grunt-contrib-jshint': '~0.10.0',
        'grunt-contrib-concat': '~0.3.0',
        "grunt-contrib-less": "^1.0.0",
        "grunt-contrib-uglify": "^0.8.0",
        "grunt-contrib-watch": "^0.6.1",
        'grunt-contrib-clean': '~0.4.0'
      },
    });

    // Generate jquery.json file.
    init.writePackageJSON(props.jqueryjson, props, function(pkg, props) {
      return pkg;
    });

    // All done!
    done();
  });

};
