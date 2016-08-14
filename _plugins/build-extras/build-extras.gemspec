# coding: utf-8
lib = File.expand_path('../lib', __FILE__)
$LOAD_PATH.unshift(lib) unless $LOAD_PATH.include?(lib)

Gem::Specification.new do |spec|
  spec.name          = "build-extras"
  spec.version       = "1.0"
  spec.license       = "MIT"
  spec.authors       = ["Simon J Knibbs"]
  spec.email         = ["simon.knibbs@gmail.com"]
  spec.summary       = "Handle extra build steps, JS/CSS minification & search-index rebuild."
  spec.homepage      = "https://github.com/s-knibbs/s-knibbs.github.io"

  if spec.respond_to?(:metadata)
    spec.metadata['allowed_push_host'] = ""
  else
    raise "RubyGems 2.0 or newer is required to protect against public gem pushes."
  end

  spec.files = ["lib/build-extras.rb"]

  spec.add_development_dependency "bundler", "~> 1.11"
  spec.add_runtime_dependency "uglifier", "~> 3.0"
  spec.add_runtime_dependency "cssminify", "~> 1.0"
end
