require 'rubygems'
begin
  require 'rake'
rescue LoadError
  puts 'This script should only be accessed via the "rake" command.'
  puts 'Installation: gem install rake -y'
  exit
end
require 'rake'
require 'rake/clean'
require 'rake/packagetask'
require 'rake_remote_task'


$:.unshift File.dirname(__FILE__) + "/lib"

APP_VERSION  = '0.2.4'
APP_NAME     = 'jsUtils'
APP_HOMEPAGE = "http://projects.gandrew.com/jsUtils/"
APP_FILE_NAME= "jsUtils.js"

APP_ROOT     = File.expand_path(File.dirname(__FILE__))
APP_SRC_DIR  = File.join(APP_ROOT, 'src')
APP_DIST_DIR = File.join(APP_ROOT, 'dist')
APP_PKG_DIR  = File.join(APP_ROOT, 'pkg')

RUBYFORGE_PROJECT = APP_NAME

DEPLOY_ROOT = "/var/web/projects/#{APP_NAME}"
ON_DEPLOY_RESTART = []
APP_SERVER = "gandrew.com"

role :app, APP_SERVER

task :default => [:dist, :package, :clean_package_source]

Dir['tasks/**/*.rake'].each { |rake| load rake }




