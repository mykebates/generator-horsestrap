'use strict';
var util = require('util');
var path = require('path');
var git = require('simple-git')();
var yeoman = require('yeoman-generator');
var rimraf = require('rimraf');
var yosay = require('yosay');
var ncp = require('ncp').ncp;


var HorsestrapGenerator = module.exports = function HorsestrapGenerator(args, options, config) {
  yeoman.generators.Base.apply(this, arguments);

  //console.log(this.yeoman);
  this.on('end', function () {
    //this.installDependencies({ skipInstall: options['skip-install'] });
  });

  this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
};

util.inherits(HorsestrapGenerator, yeoman.generators.Base);

HorsestrapGenerator.prototype.askFor = function askFor() {
  var cb = this.async();

  // have Yeoman greet the user.
  this.log(yosay("Quit horsin' around!"));

  var prompts = [{
    type: 'confirm',
    name: 'angular',
    message: 'Would you like the trankin angular flavored Horsestrap?',
    default: false
  }];

  this.prompt(prompts, function (props) {
    this.angular = props.angular;

    cb();
  }.bind(this));
};

HorsestrapGenerator.prototype.app = function app() {
  //this.mkdir('app');
  //this.mkdir('app/templates');

  //this.copy('_package.json', 'package.json');
  //this.copy('_bower.json', 'bower.json');
};

HorsestrapGenerator.prototype.projectfiles = function projectfiles() {
  //this.copy('editorconfig', '.editorconfig');
  //this.copy('jshintrc', '.jshintrc');
};


// Install HorseStrap
HorsestrapGenerator.prototype.horseStrap = function() {

  var done = this.async(),
  me = this;

  var repo = 'git@github.com:mykebates/HorseStrap.git';

  if(this.angular) {
    repo = 'git@github.com:trankin/HorseStrap-Angular'
  }

  git.clone(repo, './horseStrap', function(err){
    rimraf('./horseStrap/.git', function(err){
      ncp('./horseStrap', './', function(err){
        rimraf('./horseStrap', function(err){
          done();
          console.log('Success. Quit horsing around, and get to work.')
        });
      });
    });
  });

};