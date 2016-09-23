require 'uglifier'
require 'digest'

module Jekyll
    class BuildExtras < Generator
        safe true

        def generate(site)
            # Minify JS
            _compress_files(site, '.js', Uglifier.new)
            _create_tag_index(site)

            # Completely regenerate the search index in the background:
            pid = spawn("npm run build-index && cp -r data %s" % site.dest,
                        :out => "/dev/null", :err =>  "%s/index-build.log" % site.dest)
            Process.detach(pid)
        end

        def _create_tag_index(site)
            tag_map = site.post_attr_hash('tags')
            tag_map = tag_map.map do |tag, posts|
                [tag.downcase, posts.map {|p| _hash_str(p.url)}]
            end
            tag_map = tag_map.to_h
            File.open('data/tag-index.json', 'w') do |f|
                f.write(tag_map.to_json)
            end
        end

        def _hash_str(str)
            md5 = Digest::MD5.new
            md5.update str
            Integer(md5.hexdigest[0, 8], 16)
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
