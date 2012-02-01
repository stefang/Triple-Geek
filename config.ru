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

  r301 %r{/portfolio/tutorhub}, '/portfolio/web/tutorhub'
  r301 %r{/portfolio/perspectives}, '/portfolio/web/perspectives'
  r301 %r{/portfolio/rusic}, '/portfolio/web/rusic'
  r301 %r{/portfolio/eventstreams}, '/portfolio/web/eventstreams'
  r301 %r{/portfolio/infocow}, '/portfolio/web/infocow'
  r301 %r{/portfolio/futurelab}, '/portfolio/web/futurelab'
  r301 %r{/portfolio/realworld-and-peter-gabriel}, '/portfolio/web/realworld-and-peter-gabriel'

  r301 %r{/portfolio/pulp-2011}, '/portfolio/visuals/pulp-2011'
  r301 %r{/portfolio/peter-gabriel-new-blood-2011}, '/portfolio/visuals/peter-gabriel-new-blood-2011'
  r301 %r{/portfolio/peter-gabriel-new-blood-2010}, '/portfolio/visuals/peter-gabriel-new-blood-2010'

end

run Nesta::App