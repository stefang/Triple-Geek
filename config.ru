require 'rubygems'
require 'bundler/setup'

Bundler.require(:default)

require 'nesta/env'
Nesta::Env.root = ::File.expand_path('.', ::File.dirname(__FILE__))

require 'nesta/app'

use Rack::Rewrite do
  r301 %r{.*}, 'http://triplegeek.com$&', :if => Proc.new {|rack_env|
    rack_env['SERVER_NAME'] != 'triplegeek.com'
  }
end

run Nesta::App