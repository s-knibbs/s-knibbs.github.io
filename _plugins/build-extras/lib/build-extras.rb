require 'uglifier'

module Jekyll
    class BuildExtras < Generator
        safe true

        def generate(site)
            # Minify JS
            _compress_files(site, '.js', Uglifier.new)

            # Completely regenerate the search index in the background:
            pid = spawn("npm run build-index && cp -r data %s" % site.dest,
                        :out => "/dev/null", :err =>  "%s/index-build.log" % site.dest)
            Process.detach(pid)
        end

        def _compress_files(site, extname, compressor)
            scripts = site.static_files.select {|file| file.extname == extname}
            scripts.each do |script|
                # Skip already minified files.
                if script.path =~ /.min#{extname}$/
                    next
                else
                    dest_path = script.path.sub! "#{extname}", ".min#{extname}"
                    script_mtime = File.mtime(script.path)
                    # Only minify changed files
                    unless File.exist?(dest_path) and File.mtime(dest_path) > script_mtime
                        Jekyll.logger.debug "Minifying: %s" % script.path
                        output = compressor.compress(File.read(script.path))
                        File.open(dest_path, 'w') do |f|
                            f.write(output)
                        end
                    end
                end
            end
        end
    end
end
