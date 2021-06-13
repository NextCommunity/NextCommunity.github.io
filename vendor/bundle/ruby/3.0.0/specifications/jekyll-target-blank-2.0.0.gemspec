# -*- encoding: utf-8 -*-
# stub: jekyll-target-blank 2.0.0 ruby lib

Gem::Specification.new do |s|
  s.name = "jekyll-target-blank".freeze
  s.version = "2.0.0"

  s.required_rubygems_version = Gem::Requirement.new(">= 0".freeze) if s.respond_to? :required_rubygems_version=
  s.require_paths = ["lib".freeze]
  s.authors = ["Keith Mifsud".freeze]
  s.date = "2019-10-14"
  s.description = "Target Blank automatically changes the external links to open in a new browser for Jekyll sites.".freeze
  s.email = ["mifsud.k@gmail.com".freeze]
  s.homepage = "https://github.com/keithmifsud/jekyll-target-blank".freeze
  s.licenses = ["MIT".freeze]
  s.required_ruby_version = Gem::Requirement.new(">= 2.3.0".freeze)
  s.rubygems_version = "3.2.15".freeze
  s.summary = "Target Blank automatically changes the external links to open in a new browser.".freeze

  s.installed_by_version = "3.2.15" if s.respond_to? :installed_by_version

  if s.respond_to? :specification_version then
    s.specification_version = 4
  end

  if s.respond_to? :add_runtime_dependency then
    s.add_runtime_dependency(%q<jekyll>.freeze, [">= 3.0", "< 5.0"])
    s.add_runtime_dependency(%q<nokogiri>.freeze, ["~> 1.10"])
    s.add_development_dependency(%q<bundler>.freeze, ["~> 2.0"])
    s.add_development_dependency(%q<rake>.freeze, ["~> 12.0"])
    s.add_development_dependency(%q<rspec>.freeze, ["~> 3.0"])
    s.add_development_dependency(%q<rubocop>.freeze, [">= 0.68.0", "<= 0.72.0"])
    s.add_development_dependency(%q<rubocop-jekyll>.freeze, ["~> 0.10.0"])
  else
    s.add_dependency(%q<jekyll>.freeze, [">= 3.0", "< 5.0"])
    s.add_dependency(%q<nokogiri>.freeze, ["~> 1.10"])
    s.add_dependency(%q<bundler>.freeze, ["~> 2.0"])
    s.add_dependency(%q<rake>.freeze, ["~> 12.0"])
    s.add_dependency(%q<rspec>.freeze, ["~> 3.0"])
    s.add_dependency(%q<rubocop>.freeze, [">= 0.68.0", "<= 0.72.0"])
    s.add_dependency(%q<rubocop-jekyll>.freeze, ["~> 0.10.0"])
  end
end
